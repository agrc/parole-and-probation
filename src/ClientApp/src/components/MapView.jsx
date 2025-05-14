import EsriMap from '@arcgis/core/Map';
import config from '@arcgis/core/config';
import { when, whenOnce } from '@arcgis/core/core/reactiveUtils';
import Extent from '@arcgis/core/geometry/Extent';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LabelClass from '@arcgis/core/layers/support/LabelClass';
import MapView from '@arcgis/core/views/MapView';
import Locate from '@arcgis/core/widgets/Locate';
import initializeTheme from '@ugrc/esri-theme-toggle';
import { Geocode, LayerSelector } from '@ugrc/utah-design-system';
import { saveAs } from 'file-saver';
import ky from 'ky';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigatorStatus } from 'react-navigator-status';
import Console from '../Console';
import { fields } from '../config';
import CsvDownload from './CsvDownload';
import HomeButton from './DefaultExtent';
import MapToolPanel from './MapToolPanel';

config.assetsPath = `/assets`;
initializeTheme();

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
  const mapDiv = useRef(null);
  const view = useRef(null);
  const layerView = useRef(null);
  const clickEvent = useRef(null);
  const loadingEvent = useRef(null);
  const offenders = useRef(null);
  const mirror = useRef(null);
  const displayedZoomGraphic = useRef(null);
  const [selectorOptions, setSelectorOptions] = useState(null);
  const [appliedFilter, setAppliedFilter] = useState('');
  const withService = useNavigatorStatus();

  const setFilters = useCallback(async (where, isFilter) => {
    if (!offenders.current || !view.current) {
      Console('MapView:offenders or view are not ready');

      return;
    }

    // zoom to filtered data
    if (layerView?.current) {
      whenOnce(() => layerView.current.updating).then(() => {
        whenOnce(() => !layerView.current.updating).then(() => {
          layerView.current.queryExtent().then((result) => {
            Console(`MapView:setting map extent containing ${result.count} graphics`);

            // this is in case there is a point outside of the state...
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

            view.current.goTo(extent);
          });
        });
      });

      const filter = where.join(' AND ');

      if (isFilter) {
        Console(`MapView:updating layerView filter ${filter}`);

        layerView.current.filter = {
          where: filter,
        };

        setAppliedFilter(filter);
      } else {
        layerView.current.filter = null; // does this need to be reset?
        offenders.current.definitionExpression = filter;

        Console(`MapView:updating feature layer definition expression ${filter}`);
      }
    }
  }, []);

  const identify = useCallback(
    async (where) => {
      if (!where) {
        return;
      }

      if (!withService) {
        Console('MapView:offline identify');

        const query = {
          where: appliedFilter,
          geometry: where.mapPoint,
          distance: view.current.resolution * 7,
          spatialRelationship: 'intersects',
          outFields: Object.keys(fields).filter((key) => fields[key].filter === true),
          orderByFields: 'offender ASC',
          returnGeometry: false,
        };

        const featureSet = await mirror.current.queryFeatures(query);

        mapDispatcher({
          type: 'MAP_CLICK',
          payload: {
            point: where.mapPoint,
            features: featureSet.features,
          },
        });

        return;
      }

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
        Console(`MapView:queryFeatures with filter: '${appliedFilter}'`);

        const query = {
          where: appliedFilter,
          geometry: opts.mapPoint,
          distance: view.current.resolution * 10,
          spatialRelationship: 'intersects',
          outFields: layerView.current.availableFields,
          orderByFields: 'offender ASC',
          returnGeometry: false,
        };

        const featureSet = await layerView.current.queryFeatures(query);
        mapDispatcher({
          type: 'MAP_CLICK',
          payload: {
            point: opts.mapPoint,
            features: featureSet.features,
          },
        });
      };

      if (layerView.current.updating) {
        const handle = layerView.current.watch('updating', (stillUpdating) => {
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
    [appliedFilter, mapDispatcher, withService],
  );

  const download = useCallback(async () => {
    const base = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }`;
    const url = new URL(`/api/download`, base);

    try {
      const response = await ky.post(url, {
        signal: signal,
        credentials: 'include',
        json: {
          ...filterCriteria,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        return;
      }

      const data = await response.arrayBuffer();

      if (data.length === 0) {
        return;
      }

      const blob = new Blob([new Uint8Array(data)], {
        type: 'application/csv',
      });

      saveAs(blob, 'export.csv');
    } catch (error) {
      console.error('MapView:unable to create local download', error);
    }
  }, [filterCriteria]);

  // swap feature layer views when offline
  useEffect(() => {
    if (offenders.current && mirror.current) {
      offenders.current.visible = withService;
      mirror.current.visible = !withService;

      if (!withService) {
        view.current.whenLayerView(mirror.current).then((lv) => {
          Console('MapView:showing view with static data');

          lv.filter = layerView.current.filter;
          layerView.current = lv;
        });
      } else {
        view.current.whenLayerView(offenders.current).then((lv) => {
          Console('MapView:showing view with live data');

          lv.filter = layerView.current.filter;
          layerView.current = lv;
        });
      }
    }
  }, [withService]);

  // set up map effect
  useEffect(() => {
    if (!mapDiv.current) {
      return;
    }

    offenders.current = new FeatureLayer({
      url: `/secure/0`,
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
      popup: null,
    });

    mapDispatcher({
      type: 'SET_MAPVIEW',
      payload: view.current,
    });

    setSelectorOptions({
      options: {
        view: view.current,
        quadWord: import.meta.env.VITE_DISCOVER,
        baseLayers: ['Lite', 'Hybrid', 'Terrain', 'Topo', 'Color IR'],
        operationalLayers: [
          {
            label: 'Correction Regions',
            function: () =>
              new FeatureLayer({
                opacity: 0.25,
                labelingInfo: [
                  new LabelClass({
                    labelExpressionInfo: { expression: '$feature.REGION' },
                    symbol: {
                      type: 'text',
                      color: 'black',
                      haloSize: 1,
                      haloColor: 'white',
                    },
                  }),
                ],
                url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/Corrections_Regions/FeatureServer/0',
                id: 'Regions',
              }),
          },
        ],
      },
    });

    map.add(offenders.current);

    const locate = new Locate({
      view: view.current,
    });
    view.current.ui.add(locate, 'top-left');

    view.current.whenLayerView(offenders.current).then((lv) => {
      layerView.current = lv;

      mirror.current = new FeatureLayer({
        source: [],
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-marker',
            size: 6,
            color: 'black',
            outline: {
              width: 0.5,
              color: 'white',
            },
          },
        },
        title: 'mirror',
        fields: offenders.current.fields.map((field) => field.clone()),
        outFields: lv.availableFields,
        geometryType: offenders.current.geometryType,
        spatialReference: offenders.current.spatialReference.clone(),
        visible: false,
      });

      map.add(mirror.current);
    });
  }, [mapDispatcher]);

  // synchronize feature layers
  useEffect(() => {
    offenders.current.when(() => {
      view.current.whenLayerView(offenders.current).then((lv) => {
        loadingEvent.current?.remove();
        loadingEvent.current = when(
          () => !lv.dataUpdating,
          async () => {
            const featureSet = await lv.queryFeatures();

            mapDispatcher({
              type: 'SET_FEATURE_SET',
              payload: featureSet,
            });

            if (withService) {
              const edits = {};
              if (featureSet.features?.length > 0) {
                edits.addFeatures = featureSet.features;
              }

              const currentData = await mirror.current.queryObjectIds();
              if (currentData?.length > 0) {
                edits.deleteFeatures = currentData.map((id) => ({ objectId: id }));
              }

              if (Object.keys(edits).length > 0) {
                mirror.current.applyEdits(edits);
              }
            }
          },
        );
      });
    });
  }, [view, mapDispatcher, withService]);

  // apply filters to map view effect
  useEffect(() => {
    if (Array.isArray(filter)) {
      setFilters(filter, true);
    }
  }, [filter, setFilters]);

  // update definition expression effect
  useEffect(() => {
    if (Array.isArray(definitionExpression)) {
      setFilters(definitionExpression, false);
    }
  }, [definitionExpression, setFilters]);

  // zooming effect
  useEffect(() => {
    if (!zoomToGraphic?.graphic) {
      return;
    }

    Console('MapView:zooming to graphic');

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
      whenOnce(
        () => view.current.stationary,
        () => {
          timeout = setTimeout(() => view.current.graphics.removeAll(), 1500);
        },
      );
    });

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [zoomToGraphic]);

  // set up view click events
  useEffect(() => {
    clickEvent.current?.remove();
    clickEvent.current = view.current?.on('click', (event) => identify(event));
  }, [identify]);

  return (
    <div ref={mapDiv} style={{ height: '100%', width: '100%' }}>
      <HomeButton view={view.current} position="top-left" extent={defaultExtent} />
      <MapToolPanel view={view.current} position="top-left">
        <Geocode
          className="px-3 py-2"
          apiKey={import.meta.env.VITE_WEB_API}
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
      {selectorOptions && <LayerSelector {...selectorOptions}></LayerSelector>}
    </div>
  );
};
ReactMapView.propTypes = {
  filter: PropTypes.array,
  mapDispatcher: PropTypes.func,
  zoomToGraphic: PropTypes.object,
  definitionExpression: PropTypes.array,
  filterCriteria: PropTypes.object,
};
export default ReactMapView;
