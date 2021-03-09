import DartBoard from '@agrc/dart-board';
import LayerSelector from '@agrc/layer-selector';
import Basemap from '@arcgis/core/Basemap';
import config from '@arcgis/core/config';
import { pausable, whenFalseOnce, whenTrueOnce } from '@arcgis/core/core/watchUtils';
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
import { fields } from '../../config';
import CsvDownload from '../CsvDownload/CsvDownload';
import HomeButton from '../DefaultExtent/DefaultExtent';
import Geolocation from '../Geolocation/Geolocation';
import MapToolPanel from '../MapToolPanel/MapToolPanel';

config.assetsPath = `${process.env.PUBLIC_URL}/assets`;

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

const ReactMapView = ({ filter, mapDispatcher, zoomToGraphic, definitionExpression, filterCriteria }) => {
  const mapDiv = React.useRef(null);
  const view = React.useRef(null);
  const clickEvent = React.useRef(null);
  const offenders = React.useRef(null);
  const displayedZoomGraphic = React.useRef(null);
  const [selectorOptions, setSelectorOptions] = React.useState(null);
  const [appliedFilter, setAppliedFilter] = React.useState('');

  const setFilters = React.useCallback(async (where, isFilter) => {
    if (!offenders.current || !view.current.ready) {
      return;
    }

    const filter = where.join(' AND ');

    const layerView = await view.current.whenLayerView(offenders.current);
    if (isFilter) {
      console.log(`MapView:setFilters ${filter}`);

      layerView.filter = {
        where: filter,
      };

      setAppliedFilter(filter);
    } else {
      offenders.current.definitionExpression = filter;

      console.log('MapView:setFilters setting map extent');
    }

    // give the layerView a chance to start updating...
    whenTrueOnce(layerView, 'updating', () => {
      whenFalseOnce(layerView, 'updating', async () => {
        const result = await layerView.queryExtent();

        console.log('MapView:setFilters setting map extent', result);

        // this is in case there is a point way outside of the state...
        if (result.count === 0 || result.extent.contains(defaultExtent)) {
          return view.current.goTo(defaultExtent);
        }

        let extent = result.extent;
        if (result.count === 1) {
          extent = {
            target: result.extent,
            scale: 16000,
          };
        }

        return view.current.goTo(extent);
      });
    });
  }, []);

  const identify = React.useCallback(
    async (where) => {
      if (!where) {
        return;
      }

      console.log(`MapView::identify callback`);

      // don't continue if this is a stand-alone graphic
      // e.g. from dart-board
      const test = await view.current.hitTest(where);

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
          distance: view.current.resolution * 7,
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

      const layerView = await view.current.whenLayerView(offenders.current);
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
    [appliedFilter]
  );

  const download = React.useCallback(async () => {
    const base = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }`;
    const url = new URL(`${process.env.PUBLIC_URL}/api/download`, base);

    const response = await fetch(url, {
      signal: signal,
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        ...filterCriteria,
      }),
      headers: {
        'Content-Type': 'application/json',
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
  }, [filterCriteria]);

  // set up map effect
  React.useEffect(() => {
    if (!mapDiv.current) {
      return;
    }

    console.log('MapView::set up map effect');

    offenders.current = new FeatureLayer({
      url: `${process.env.PUBLIC_URL}/mapserver`,
      outFields: Object.keys(fields).filter((key) => fields[key].filter === true),
      definitionExpression: '1=2',
    });

    const map = new EsriMap();
    view.current = new MapView({
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

    mapDispatcher({
      type: 'SET_MAPVIEW',
      payload: view.current,
    });

    setSelectorOptions({
      view: view.current,
      quadWord: process.env.REACT_APP_DISCOVER,
      baseLayers: ['Lite', 'Hybrid', 'Terrain', 'Topo', 'Color IR'],
      overlays: [regions],
      modules: { LOD, TileInfo, Basemap, WebTileLayer, FeatureLayer },
      position: 'top-right',
    });

    map.add(offenders.current);

    const loadingEvent = pausable(view.current, 'updating', () => {
      whenFalseOnce(view.current, 'updating', () => {
        loadingEvent.pause();

        whenTrueOnce(view.current, 'stationary', async () => {
          const layerView = await view.current.whenLayerView(offenders.current);
          const featureSet = await layerView.queryFeatures();

          mapDispatcher({
            type: 'SET_FEATURE_SET',
            payload: featureSet,
          });

          loadingEvent.resume();
        });
      });
    });

    return () => {
      loadingEvent?.remove();
    };
  }, []);

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
          zoom: view.current.map.basemap.baseLayers.items[0].tileInfo.lods.length - 5,
        };
      } else {
        zoom = {
          target: zoomMeta.graphic,
        };
      }
    }

    if (displayedZoomGraphic.current) {
      view.current.graphics.removeMany(displayedZoomGraphic.current);
    }

    displayedZoomGraphic.current = zoom.target;

    view.current?.graphics.addMany(zoom.target);
    let timeout;
    view.current?.goTo(zoom).then(() => {
      whenTrueOnce(view.current, 'stationary', () => {
        timeout = setTimeout(() => view.current.graphics.removeAll(), 1500);
      });
    });

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [zoomToGraphic]);

  // set up view click events
  React.useEffect(() => {
    clickEvent.current?.remove();
    clickEvent.current = view.current?.on('click', (event) => identify(event));
  }, [identify]);

  return (
    <div ref={mapDiv} style={{ height: '100%', width: '100%' }}>
      <HomeButton view={view.current} position="top-left" extent={defaultExtent} />
      <Geolocation dispatcher={mapDispatcher} view={view.current} position="top-left" />
      <MapToolPanel icon={faMapMarkedAlt} view={view.current} position="top-left">
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
      <CsvDownload download={download} view={view.current} position="top-left" />
      {selectorOptions ? <LayerSelector {...selectorOptions}></LayerSelector> : null}
    </div>
  );
};

export default ReactMapView;
