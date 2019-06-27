import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { loadModules, loadCss } from 'esri-loader';
import { LayerSelectorContainer, LayerSelector } from '../../components/LayerSelector/LayerSelector';


export default class ReactMapView extends Component {
  zoomLevel = 5;
  displayedZoomGraphic = null;

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
    loadCss('https://js.arcgis.com/4.11/esri/css/main.css');
    const mapRequires = [
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
    const [Map, MapView, FeatureLayer, LOD, TileInfo, WebTileLayer, Basemap] = await loadModules(mapRequires.concat(selectorRequires));

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
      outFields: ['offender_id', 'agent_name', 'active_warrant', 'date_of_birth', 'gender', 'legal_status',
        'standard_of_supervision', 'last_field_contact', 'field_contact_result', 'last_office_contact',
        'offender_phone', 'address', 'city', 'state', 'zip', 'unit', 'address_type', 'address_start_date', 'employer',
        'gang_name', 'supervision_start_date', 'earned_compliance_credit'],
      definitionExpression: `agent_name='RICHARD CAMPBELL'`
    });

    this.map.add(this.offenders);

    await this.offenders.when();
    const extent = await this.offenders.queryExtent();
    this.view.goTo(extent);

    this.view.on('click', event => this.props.mapDispatcher({ type: 'MAP_CLICK', payload: event.mapPoint }));
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

    if (!this.arraysEqual(this.props.filter, prevProps.filter)) {
      this.applyFilter(this.props.filter);
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

  async applyFilter(where) {
    const layerView = await this.view.whenLayerView(this.offenders);
    layerView.filter = {
      where: where.join(' AND ')
    };

    const [watchUtils] = await loadModules(['esri/core/watchUtils']);

    await watchUtils.whenFalseOnce(layerView, 'updating', async () => {
      const extent = await layerView.queryExtent();
      this.view.goTo(extent);
    });
  }

  getView() {
    return this.view;
  }
}
