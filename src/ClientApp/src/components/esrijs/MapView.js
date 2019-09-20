import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { loadModules } from 'esri-loader';
import { UserData } from 'react-oidc';
import { saveAs } from 'file-saver';
import { LayerSelectorContainer, LayerSelector } from '../../components/LayerSelector/LayerSelector';
import HomeButton from '../DefaultExtent';
import Geolocation from '../Geolocation';
import CsvDownload from '../CsvDownload';
import MapToolPanel from '../MapToolPanel';
import DartBoard from '../DartBoard';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { fields } from '../../config';

const controller = new AbortController();
let signal = controller.signal

export default class ReactMapView extends Component {
  zoomLevel = 5;
  displayedZoomGraphic = null;
  static contextType = UserData;
  download = this.download.bind(this);

  state = {
    appliedFilter: ''
  }

  render() {
    return (
      <div
        style={{ height: '100%', width: '100%' }}
        ref={mapViewDiv => {
          this.mapViewDiv = mapViewDiv;
        }}
      />
    );
  }

  async componentDidMount() {
    const mapRequires = [
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/FeatureLayer'
    ];
    const selectorRequires = [
      'esri/layers/support/LOD',
      'esri/layers/support/TileInfo',
      'esri/layers/WebTileLayer',
      'esri/Basemap'
    ];

    // FeatureLayer is required even-though unused
    // eslint-disable-next-line
    const [esriConfig, Map, MapView, FeatureLayer, LOD, TileInfo, WebTileLayer, Basemap] = await loadModules(mapRequires.concat(selectorRequires), { css: true });

    const defaultExtent = {
      xmax: -11762120.612131765,
      xmin: -13074391.513731329,
      ymax: 5225035.106177688,
      ymin: 4373832.359194187,
      spatialReference: 3857
    };

    esriConfig.request.interceptors.push({
      urls: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${process.env.REACT_APP_BASENAME}/mapserver`,
      headers: {
        Authorization: `Bearer ${this.context.user.access_token}`
      }
    });

    this.map = new Map();

    this.view = new MapView({
      container: this.mapViewDiv,
      map: this.map,
      extent: defaultExtent,
      ui: {
        components: ['zoom']
      }
    });

    const selectorNode = document.createElement('div');
    const homeNode = document.createElement('div');
    const geolocateNode = document.createElement('div');
    const geocodeNode = document.createElement('div');
    const downloadNode = document.createElement('div');

    this.view.ui.add(selectorNode, 'top-right');
    this.view.ui.add(homeNode, 'top-left');
    this.view.ui.add(geolocateNode, 'top-left');
    this.view.ui.add(geocodeNode, 'top-left');
    this.view.ui.add(downloadNode, 'top-left');

    this.view.on('click', event => this.identify(event));

    const layerSelectorOptions = {
      view: this.view,
      quadWord: this.props.discoverKey,
      baseLayers: ['Lite', 'Hybrid', 'Terrain', 'Topo', 'Color IR'],
      modules: [LOD, TileInfo, WebTileLayer, Basemap]
    };

    ReactDOM.render(
      <LayerSelectorContainer>
        <LayerSelector {...layerSelectorOptions}></LayerSelector>
      </LayerSelectorContainer>, selectorNode
    );

    this.offenders = new FeatureLayer({
      url: `${process.env.REACT_APP_BASENAME}/mapserver`,
      outFields: Object.keys(fields).filter(key => fields[key].filter === true),
      definitionExpression: this.props.definitionExpression
    });

    this.map.add(this.offenders);

    ReactDOM.render(<HomeButton view={this.view} extent={this.view.extent} />, homeNode);
    ReactDOM.render(<Geolocation dispatcher={this.props.mapDispatcher} />, geolocateNode);
    ReactDOM.render(<MapToolPanel icon={faMapMarkedAlt}>
      <DartBoard
        className="pt-2 px-3"
        apiKey={process.env.REACT_APP_WEB_API}
        onFindAddress={result => this.props.mapDispatcher({ type: 'ZOOM_TO_GRAPHIC', payload: result })}
        pointSymbol={{
          type: 'simple-marker',
          outline: { width: 1.5, color: [255, 255, 255, 1] },
          size: 11,
          color: [0, 116, 217, .75]
        }}
      />
    </MapToolPanel>, geocodeNode);
    ReactDOM.render(<CsvDownload download={this.download} />, downloadNode);

    await this.offenders.when();
    const result = await this.offenders.queryExtent();
    if (result.count === 0) {
      return;
    }

    return this.view.goTo(result.extent);
  }

  arraysEqual(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
      return false;
    }

    const arr1 = a.concat().sort();
    const arr2 = b.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    const currentGraphic = (((this.props || false).zoomToGraphic || false).graphic || false);
    const previousGraphic = (((prevProps || false).zoomToGraphic || false).graphic || false);

    if (currentGraphic !== previousGraphic && currentGraphic !== false) {
      const { graphic, level, preserve } = this.props.zoomToGraphic;

      this.zoomTo({
        target: graphic,
        zoom: level,
        preserve: preserve
      });
    }

    if (Array.isArray(this.props.definitionExpression) && !this.arraysEqual(this.props.definitionExpression, prevProps.definitionExpression)) {
      this.applyFilter(this.props.definitionExpression, false);
    }

    if (Array.isArray(this.props.filter) && !this.arraysEqual(this.props.filter, prevProps.filter)) {
      this.applyFilter(this.props.filter, true);
    }
  }

  async zoomTo(zoomObj) {
    console.log('app.zoomTo', arguments);

    if (!Array.isArray(zoomObj.target)) {
      zoomObj.target = [zoomObj.target];
    }

    if (!zoomObj.zoom) {
      if (zoomObj.target.every(graphic => graphic.geometry.type === 'point')) {
        zoomObj = {
          target: zoomObj.target,
          zoom: this.view.map.basemap.baseLayers.items[0].tileInfo.lods.length - this.zoomLevel
        };
      } else {
        zoomObj = {
          target: zoomObj.target
        };
      }
    }

    await this.view.goTo(zoomObj);

    if (this.displayedZoomGraphic) {
      this.view.graphics.removeMany(this.displayedZoomGraphic);
    }

    this.displayedZoomGraphic = zoomObj.target;

    this.view.graphics.addMany(zoomObj.target);

    const [watchUtils] = await loadModules(['esri/core/watchUtils']);

    if (!zoomObj.preserve) {
      watchUtils.once(this.view, 'extent', () => {
        this.view.graphics.removeAll();
      });
    }
  }

  async applyFilter(where, isFilter) {
    const filter = where.join(' AND ');

    if (isFilter) {
      const layerView = await this.view.whenLayerView(this.offenders);

      console.log(`applying filter ${filter}`);

      layerView.filter = {
        where: filter
      };

      this.setState({
        appliedFilter: filter
      });

      const [watchUtils] = await loadModules(['esri/core/watchUtils']);

      await watchUtils.whenFalseOnce(layerView, 'updating', async () => {
        const result = await layerView.queryExtent();

        console.log('setting map extent');
        console.dir(JSON.stringify(result));

        if (result.count === 0) {
          return;
        }

        let extent = result.extent;
        if (result.count === 1) {
          extent = {
            target: result.extent,
            scale: 16000
          };
        }

        return this.view.goTo(extent);
      });
    } else {
      this.offenders.definitionExpression = filter;

      console.log('setting map extent');
      this.view.goTo(this.offenders.fullExtent);
    }
  }

  async identify(where) {
    const queryFeatures = async opts => {
      const query = {
        where: this.state.appliedFilter,
        geometry: opts.mapPoint,
        distance: this.view.resolution * 7,
        spatialRelationship: 'intersects',
        outFields: layerView.availableFields,
        orderByFields: 'offender ASC',
        returnGeometry: false
      };

      const featureSet = await layerView.queryFeatures(query);
      this.props.mapDispatcher({
        type: 'MAP_CLICK', payload: {
          point: opts.mapPoint,
          features: featureSet.features
        }
      });
    };

    const layerView = await this.view.whenLayerView(this.offenders);
    if (layerView.updating) {
      const handle = layerView.watch('updating', stillUpdating => {
        if (stillUpdating) {
          return;
        }

        queryFeatures(where);
        handle.remove();
      });
    } else {
      queryFeatures(where);
    }
  }

  async download() {
    const layerView = await this.view.whenLayerView(this.offenders);

    const ids = await layerView
      .queryObjectIds({
        where: this.state.appliedFilter,
        geometry: this.view.extent,
        returnGeometry: false
      });

    console.log(`there are ${ids.length} features to download`);

    if (ids.length === 0) {
      return;
    }

    const base = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
    const url = new URL(`${process.env.REACT_APP_BASENAME}/api/download`, base);

    const response = await fetch(url, {
      signal: signal,
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        offenders: ids,
        agent: this.context.user.profile['public:Email']
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.context.user.access_token}`
      }
    });

    const data = await response.text();

    if (data.length === 0) {
      return false;
    }

    try {
      var blob = new Blob([data], {
        type: 'application/csv'
      });

      saveAs(blob, 'export.csv');
    }
    catch (e) {
      console.error('unable to create local download');
    }
  }
}
