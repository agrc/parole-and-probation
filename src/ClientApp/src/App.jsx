import '@arcgis/core/assets/esri/themes/light/main.css';
import { useQuery } from '@tanstack/react-query';
import { BusyBar, Drawer, Header } from '@ugrc/utah-design-system';
import { useViewLoading } from '@ugrc/utilities/hooks';
import ky from 'ky';
import isEqual from 'lodash.isequal';
import { useEffect, useState } from 'react';
import { useOverlayTrigger } from 'react-aria';
import { ErrorBoundary } from 'react-error-boundary';
import 'react-loading-skeleton/dist/skeleton.css';
import { useImmerReducer } from 'use-immer';
import Console from './Console';
import UserContext from './UserContext';
import logo from './assets/udc-logo.webp';
import { FallbackComponent } from './components/ErrorBoundary';
import MapView from './components/MapView';
import { SideBarStatus } from './components/SidebarStatus';
import StaticLegend from './components/StaticLegend';
import { mappingConfig } from './config';

const version = import.meta.env.PACKAGE_VERSION;

const links = [
  {
    key: 'Corrections Homepage',
    action: { url: 'https://corrections.utah.gov/' },
  },
  {
    key: 'GitHub Repository',
    action: { url: 'https://github.com/agrc/parole-and-probation' },
  },
  {
    key: `Version ${version} changelog`,
    action: { url: `https://github.com/agrc/parole-and-probation/releases/v${version}` },
  },
];

const reducer = (draft, action) => {
  Console(`App:reducing state ${action.type}`, action);

  switch (action.type) {
    case 'ZOOM_TO_GRAPHIC': {
      draft.zoomToGraphic.graphic = action.payload;
      draft.zoomToGraphic.level = 15;

      return draft;
    }
    case 'MAP_CLICK': {
      draft.identify.show = true;
      draft.identify.status = 'visible';
      draft.sideBarState.isOpen = true;

      draft.mapPoint = action.payload.point;

      draft.identify.features = action.payload.features;

      if (!Array.isArray(draft.identify.features) || draft.identify.features.length < 1) {
        draft.identify.offender = {};
      } else {
        draft.identify.index = 0;
        draft.identify.offender = draft.identify.features[0].attributes;
      }

      return draft;
    }
    case 'IDENTIFY_PAGINATE': {
      draft.identify.index = action.payload;
      draft.identify.offender = draft.identify.features[action.payload].attributes;

      return draft;
    }
    case 'TOGGLE_SIDEBAR': {
      if (action.payload === undefined) {
        action.payload = !draft.sideBarState.isOpen;
      }

      console.log('debug');

      draft.sideBarState.isOpen = action.payload;

      if (!draft.sideBarState.isOpen && draft.identify.show) {
        draft.identify.show = false;
      }

      if (draft.sideBarState.isOpen && draft.identify.status === 'visible') {
        draft.identify.show = true;
      }

      return draft;
    }
    case 'TOGGLE_IDENTIFY': {
      draft.sideBarState.isOpen = action.payload ? true : draft.sideBarState.isOpen;
      draft.identify.show = action.payload;

      if (!action.payload) {
        draft.identify.status = 'dismissed';
      }

      return draft;
    }
    case 'SET_FILTERS': {
      let filter = action.payload.filters.filter;
      let definitionExpression = action.payload.filters.definitionExpression;

      let tempFilter = [];
      if (filter?.length > 0) {
        tempFilter = filter;
      }

      if (definitionExpression?.length > 0) {
        tempFilter = tempFilter.concat(definitionExpression);
      }

      const newFilters = tempFilter.join(' AND ');
      let updated = false;
      // these are the raw filters as an array for change detection
      if (!isEqual(draft.filter, filter)) {
        draft.filter = filter;
        updated = true;
      }

      if (!isEqual(draft.definitionExpression, definitionExpression)) {
        draft.definitionExpression = definitionExpression;
        updated = true;
      }

      if (updated) {
        // this is a combination of the definition expression and filters
        // applied to the map as sql
        // useful for queries/identifying outside of the feature layer
        // where the queries need to match
        draft.appliedFilter = newFilters;
        draft.filterCriteria = action.payload.criteria;
      }

      return draft;
    }
    case 'SET_FEATURE_SET': {
      draft.featureSet = action.payload;

      break;
    }
    case 'SET_MAPVIEW': {
      draft.mapView = action.payload;

      break;
    }
    default:
      throw new Error();
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState('empty');
  const { status, error, data } = useQuery({
    queryKey: ['auth'],
    queryFn: () =>
      ky
        .get('/api/configuration', {
          timeout: 5000,
          redirect: 'error',
          throwHttpErrors: false,
          retry: {
            limit: 0,
          },
        })
        .json(),
  });
  const [app, dispatcher] = useImmerReducer(reducer, {
    zoomToGraphic: {
      graphic: null,
      level: 0,
    },
    mapPoint: {},
    identify: {
      show: false,
      status: null,
      features: [],
      offender: {},
      index: 0,
    },
    sideBarState: {
      isOpen: window.innerWidth >= mappingConfig.MIN_DESKTOP_WIDTH,
    },
    filter: [],
    filterCriteria: {},
    appliedFilter: `agent_id in (${user?.id})`,
    definitionExpression: [`agent_id in (${user?.id})`],
    featureSet: null,
  });
  const busy = useViewLoading(app.mapView);

  const sidebarState = {
    ...app.sideBarState,
    setOpen: (isOpen) => dispatcher({ type: 'TOGGLE_SIDEBAR', payload: isOpen }),
    open: () => dispatcher({ type: 'TOGGLE_SIDEBAR', payload: true }),
    close: () => dispatcher({ type: 'TOGGLE_SIDEBAR', payload: false }),
    toggle: () => dispatcher({ type: 'TOGGLE_SIDEBAR', payload: undefined }),
  };
  const sideBarTriggerProps = useOverlayTrigger(
    {
      type: 'dialog',
    },
    sidebarState,
  );

  useEffect(() => {
    setUserState(status);

    if (status === 'error') {
      throw new Error('Could not load settings');
    }

    if (status === 'success') {
      setUser(data);
    }
  }, [data, status, error, setUserState, setUser]);

  const mapOptions = {
    discoverKey: import.meta.env.VITE_DISCOVER,
    mapDispatcher: dispatcher,
    zoomToGraphic: app.zoomToGraphic,
    definitionExpression: app.definitionExpression,
    filter: app.filter,
    filterCriteria: app.filterCriteria,
  };

  const identifyOptions = {
    apiKey: import.meta.env.VITE_WEB_API,
    features: app.identify.features,
    offender: app.identify.offender,
    index: app.identify.index,
    update: dispatcher,
    show: (state) => dispatcher({ type: 'TOGGLE_IDENTIFY', payload: state }),
  };

  return (
    <UserContext.Provider value={user}>
      <main className="flex h-screen flex-col md:gap-2">
        <div className="hidden md:block">
          <Header links={links}>
            <div className="flex h-14 grow items-center gap-3">
              <img src={logo} className="h-full w-auto" alt="corrections logo" />
              <h2 className="font-heading text-xl md:text-2xl font-light text-primary-900 lg:text-4xl dark:text-zinc-100">
                AP&P field map
              </h2>
            </div>
          </Header>
        </div>
        <section className="relative flex min-h-0 flex-1 overflow-x-hidden md:mr-2 pt-2 md:pt-0">
          <Drawer main state={sidebarState} {...sideBarTriggerProps}>
            <div className="mx-2 mb-2 grid grid-cols-1 gap-2">
              <SideBarStatus
                status={userState}
                app={app}
                user={user}
                identifyOptions={identifyOptions}
                dispatcher={dispatcher}
              />
            </div>
          </Drawer>
          <div className="relative flex flex-1 flex-col rounded border border-b-0 border-zinc-200 dark:border-0 dark:border-zinc-700">
            <div className="relative flex-1 overflow-hidden dark:rounded">
              <ErrorBoundary FallbackComponent={FallbackComponent}>
                <StaticLegend
                  legend={[
                    {
                      label: 'probation',
                      color: '#53C3F9',
                      invert: true,
                    },
                    {
                      label: 'parole',
                      color: '#DAFC86',
                      invert: true,
                    },
                    {
                      label: 'fugitive',
                      color: '#F08683',
                      invert: true,
                    },
                  ]}
                />
                <BusyBar busy={busy} />
                <MapView {...mapOptions} />
              </ErrorBoundary>
            </div>
          </div>
        </section>
      </main>
    </UserContext.Provider>
  );
}
