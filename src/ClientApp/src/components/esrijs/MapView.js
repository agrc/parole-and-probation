import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { loadModules, loadCss } from 'esri-loader';
import { LayerSelectorContainer, LayerSelector } from '../../components/LayerSelector/LayerSelector';
import { UserData } from 'react-oidc';


export default class ReactMapView extends Component {
  zoomLevel = 5;
  displayedZoomGraphic = null;
  static contextType = UserData;

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
    loadCss('https://js.arcgis.com/4.12/esri/css/main.css');
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
    const [esriConfig, Map, MapView, FeatureLayer, LOD, TileInfo, WebTileLayer, Basemap] = await loadModules(mapRequires.concat(selectorRequires));

    this.map = new Map();

    this.view = new MapView({
      container: this.mapViewDiv,
      map: this.map,
      extent: {
        xmax: -11762120.612131765,
        xmin: -13074391.513731329,
        ymax: 5225035.106177688,
        ymin: 4373832.359194187,
        spatialReference: 3857
      },
      ui: {
        components: ['zoom']
      }
    });

    const selectorNode = document.createElement('div');
    this.view.ui.add(selectorNode, 'top-right');

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
      </LayerSelectorContainer>,
      selectorNode);

    this.offenders = new FeatureLayer({
      url: `${process.env.REACT_APP_BASENAME}/mapserver`,
      outFields: ['offender_id', 'offender', 'agent_name', 'active_warrant', 'gender', 'legal_status',
        'standard_of_supervision', 'last_field_contact', 'last_office_contact',
        'address', 'city', 'zip', 'unit', 'employer',
        'gang_type', 'supervision_start_date'],
      definitionExpression: this.props.definitionExpression
    });

    esriConfig.request.interceptors.push({
      urls: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${process.env.REACT_APP_BASENAME}/mapserver`,
      headers: {
        Authorization: `Bearer ${this.context.user.access_token}`
      }
    });

    this.map.add(this.offenders);

    await this.offenders.when();
    const extent = await this.offenders.queryExtent();
    this.view.goTo(extent);
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

    if (isFilter) {
      const layerView = await this.view.whenLayerView(this.offenders);
      console.log(`applying filter ${where.join(' AND ')}`);

      layerView.filter = {
        where: where.join(' AND ')
      };

      this.setState({
        appliedFilter: where.join(' AND ')
      });

      const [watchUtils] = await loadModules(['esri/core/watchUtils']);

      await watchUtils.whenFalseOnce(layerView, 'updating', async () => {
        const extent = await layerView.queryExtent();
        this.view.goTo(extent);
      });
    } else {
      this.offenders.definitionExpression = where.join(' AND ');

      this.view.goTo(this.offenders.fullExtent);
    }
  }

  async identify(where) {
    const queryFeatures = async opts => {
      const query = {
        where: this.state.appliedFilter,
        geometry: opts.mapPoint,
        distance: this.view.resolution * 3,
        spatialRelationship: 'intersects',
        outFields: ['*'],
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

  getView() {
    return this.view;
  }
}
