import DartBoard from '@agrc/dart-board';
import LayerSelector from '@agrc/layer-selector';
import Basemap from '@arcgis/core/Basemap';
import esriConfig from '@arcgis/core/config';
import { once, whenFalseOnce } from '@arcgis/core/core/watchUtils';
import Extent from '@arcgis/core/geometry/Extent';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LabelClass from '@arcgis/core/layers/support/LabelClass';
import LOD from '@arcgis/core/layers/support/LOD';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import EsriMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import * as React from 'react';
import { UserData } from 'react-oidc';
import { fields } from '../../config';
import CsvDownload from '../CsvDownload';
import HomeButton from '../DefaultExtent';
import Geolocation from '../Geolocation';
import MapToolPanel from '../MapToolPanel';

const regionLabels = new LabelClass({
  labelExpressionInfo: { expression: '$feature.REGION' },
  symbol: {
    type: 'text',
    color: 'black',
    haloSize: 1,
    haloColor: 'white',
  },
});

const regions = {
  Factory: FeatureLayer,
  opacity: 0.25,
  labelingInfo: [regionLabels],
  url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/Corrections_Regions/FeatureServer/0',
  id: 'Regions',
};

const defaultExtent = new Extent({
  xmax: -12612006,
  xmin: -12246370,
  ymax: 5125456,
  ymin: 4473357,
  spatialReference: 3857,
});

const controller = new AbortController();
let signal = controller.signal;

const ReactMapView = ({ filter, mapDispatcher, zoomToGraphic, onClick, definitionExpression }) => {
  const mapDiv = React.useRef(null);
  const displayedZoomGraphic = React.useRef(null);
  const [selectorOptions, setSelectorOptions] = React.useState(null);
  const [view, localSetView] = React.useState(null);
  const [appliedFilter, setAppliedFilter] = React.useState('');
  const [offenders, setOffenders] = React.useState(null);
  const clickEvent = React.useRef(null);
  const auth = React.useContext(UserData);

  const setFilters = React.useCallback(
    async (where, isFilter) => {
      if (!offenders || !view.ready) {
        return;
      }

      const filter = where.join(' AND ');

      if (isFilter) {
        const layerView = await view.whenLayerView(offenders);
        console.log(`MapView:setFilters ${filter}`);

        layerView.filter = {
          where: filter,
        };

        setAppliedFilter(filter);

        await whenFalseOnce(layerView, 'updating', async () => {
          const result = await layerView.queryExtent();

          console.log('MapView:setFilters setting map extent', result);

          if (result.count === 0) {
            return;
          }

          let extent = result.extent;
          if (result.count === 1) {
            extent = {
              target: result.extent,
              scale: 16000,
            };
          }

          return view.goTo(extent);
        });
      } else {
        offenders.definitionExpression = filter;

        console.log('MapView:setFilters setting map extent');
        view.goTo(defaultExtent);
      }
    },
    [offenders, view]
  );

  const identify = React.useCallback(
    async (where) => {
      if (!where) {
        return;
      }

      console.log(`MapView::identify callback`);

      const test = await view.hitTest(where);

      if (test.results.length) {
        const graphic = test.results[0].graphic;

        if (!graphic.layer.id || !graphic.layer.title) {
          return;
        }
      }

      const queryFeatures = async (opts) => {
        console.log(`MapView::queryFeatures:query ${appliedFilter}`);

        const query = {
          where: appliedFilter,
          geometry: opts.mapPoint,
          distance: view.resolution * 7,
          spatialRelationship: 'intersects',
          outFields: layerView.availableFields,
          orderByFields: 'offender ASC',
          returnGeometry: false,
        };

        const featureSet = await layerView.queryFeatures(query);
        mapDispatcher({
          type: 'MAP_CLICK',
          payload: {
            point: opts.mapPoint,
            features: featureSet.features,
          },
        });
      };

      const layerView = await view.whenLayerView(offenders);
      if (layerView.updating) {
        const handle = layerView.watch('updating', (stillUpdating) => {
          if (stillUpdating) {
            return;
          }

          queryFeatures(where);
          handle.remove();
        });
      } else {
        queryFeatures(where);
      }
    },
    [offenders, view, appliedFilter, mapDispatcher]
  );

  // set up map effect
  React.useEffect(() => {
    if (!mapDiv.current) {
      return;
    }

    console.log('MapView::set up map effect');

    esriConfig.request.interceptors.push({
      urls: `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }${process.env.REACT_APP_BASENAME}/mapserver`,
      headers: {
        Authorization: `Bearer ${auth.user.access_token}`,
      },
    });

    const offenderLayer = new FeatureLayer({
      url: `${process.env.REACT_APP_BASENAME}/mapserver`,
      outFields: Object.keys(fields).filter((key) => fields[key].filter === true),
      definitionExpression: '1=2',
    });

    const map = new EsriMap();
    const mapView = new MapView({
      map,
      container: mapDiv.current,
      extent: defaultExtent,
      ui: {
        components: ['zoom'],
      },
      popup: {
        actions: null,
        spinnerEnabled: false,
        collapseEnabled: false,
        highlightEnabled: false,
        dockOptions: {
          breakpoint: false,
          buttonEnabled: false,
          position: 'top-right',
        },
      },
    });

    setSelectorOptions({
      view: mapView,
      quadWord: process.env.REACT_APP_DISCOVER,
      baseLayers: ['Lite', 'Hybrid', 'Terrain', 'Topo', 'Color IR'],
      overlays: [regions],
      modules: { LOD, TileInfo, Basemap, WebTileLayer, FeatureLayer },
      position: 'top-right',
    });

    map.add(offenderLayer);

    setOffenders(offenderLayer);

    localSetView(mapView);
  }, [auth, mapDispatcher]);

  // apply filters to map view effect
  React.useEffect(() => {
    if (Array.isArray(filter)) {
      console.log('MapView::apply filter effect', filter);
      setFilters(filter, true);
    }
  }, [filter, setFilters]);

  // update definition expression effect
  React.useEffect(() => {
    if (Array.isArray(definitionExpression)) {
      console.log('MapView::apply definition expression effect', definitionExpression);
      setFilters(definitionExpression, false);
    }
  }, [definitionExpression, setFilters]);

  // zooming effect
  React.useEffect(() => {
    if (!zoomToGraphic?.graphic) {
      return;
    }

    console.log('MapView::zoom to graphic effect');

    let zoomMeta = zoomToGraphic;

    if (!Array.isArray(zoomMeta?.graphic)) {
      zoomMeta = {
        ...zoomToGraphic,
        graphic: [zoomToGraphic.graphic],
      };
    }

    let zoom;
    if (!zoomMeta.zoom) {
      if (zoomMeta.graphic.every((graphic) => graphic?.geometry?.type === 'point')) {
        zoom = {
          target: zoomMeta.graphic,
          zoom: view.map.basemap.baseLayers.items[0].tileInfo.lods.length - 5,
        };
      } else {
        zoom = {
          target: zoomMeta.graphic,
        };
      }
    }

    if (displayedZoomGraphic.current) {
      view.graphics.removeMany(displayedZoomGraphic.current);
    }

    displayedZoomGraphic.current = zoom.target;

    view?.graphics.addMany(zoom.target);
    let timeout;
    view?.goTo(zoom).then(() => {
      once(view, 'extent', () => {
        timeout = setTimeout(() => view.graphics.removeAll(), 500);
      });
    });

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [zoomToGraphic, view]);

  React.useEffect(() => {
    if (view) {
      console.log('MapView::identify click effect');
      clickEvent.current?.remove();
      clickEvent.current = view.on('click', (event) => identify(event));
    }
  }, [clickEvent, view, identify]);

  const download = async () => {
    const layerView = await view.whenLayerView(offenders);

    const ids = await layerView.queryObjectIds({
      where: appliedFilter,
      geometry: view.extent,
      returnGeometry: false,
    });

    console.log(`there are ${ids.length} features to download`);

    if (ids.length === 0) {
      return;
    }

    const base = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }`;
    const url = new URL(`${process.env.REACT_APP_BASENAME}/api/download`, base);

    const response = await fetch(url, {
      signal: signal,
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        offenders: ids,
        agent: auth.user.profile['public:Email'],
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.user.access_token}`,
      },
    });

    if (response.status !== 201) {
      //TODO: toast an error
      return;
    }

    const data = await response.text();

    if (data.length === 0) {
      return;
    }

    try {
      var blob = new Blob([data], {
        type: 'application/csv',
      });

      saveAs(blob, 'export.csv');
    } catch (e) {
      console.error('unable to create local download');
    }
  };

  return (
    <div ref={mapDiv} style={{ height: '100%', width: '100%' }}>
      <HomeButton view={view} position="top-left" extent={defaultExtent} />
      <Geolocation dispatcher={mapDispatcher} view={view} position="top-left" />
      <MapToolPanel icon={faMapMarkedAlt} view={view} position="top-left">
        <DartBoard
          className="pt-2 px-3"
          apiKey={process.env.REACT_APP_WEB_API}
          events={{
            success: (result) => mapDispatcher({ type: 'ZOOM_TO_GRAPHIC', payload: result }),
            error: console.error,
          }}
          pointSymbol={{
            type: 'simple-marker',
            outline: { width: 1.5, color: [255, 255, 255, 1] },
            size: 11,
            color: [0, 116, 217, 0.75],
          }}
        />
      </MapToolPanel>
      <CsvDownload download={download} view={view} position="top-left" />
      {selectorOptions ? <LayerSelector {...selectorOptions}></LayerSelector> : null}
    </div>
  );
};

export default ReactMapView;
