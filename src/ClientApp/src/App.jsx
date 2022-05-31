import '@arcgis/core/assets/esri/themes/light/main.css';
import isEqual from 'lodash.isequal';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useImmerReducer } from 'use-immer';
import './App.css';
import { FallbackComponent } from './components/ErrorBoundary/ErrorBoundary';
import { Filters } from './components/Filters/Filters';
import Header from './components/Header/Header';
import { IdentifyContainer, IdentifyInformation } from './components/Identify/Identify';
import MapLens from './components/MapLens/MapLens';
import MapView from './components/Mapping/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import { mappingConfig } from './config';
import Console from './Console';
import UserContext from './UserContext';

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
      draft.showSidebar = true;

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
        action.payload = draft.showSidebar;
      }

      draft.showSidebar = !action.payload;

      if (!draft.showSidebar && draft.identify.show) {
        draft.identify.show = false;
      }

      if (draft.showSidebar && draft.identify.status === 'visible') {
        draft.identify.show = true;
      }

      return draft;
    }
    case 'TOGGLE_IDENTIFY': {
      draft.showSidebar = action.payload ? true : draft.showSidebar;
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

  useEffect(() => {
    const getUser = async () => {
      setUserState('loading');
      const response = await fetch('api/configuration');
      if (!response.ok) {
        setUserState('error');
        throw new Error('Could not load settings');
      }

      setUser(await response.json());
      setUserState('success');
    };

    if (!user) {
      getUser();
    }
  }, [user]);

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
    showSidebar: window.innerWidth >= mappingConfig.MIN_DESKTOP_WIDTH,
    filter: [],
    filterCriteria: {},
    appliedFilter: `agent_id in (${user?.id})`,
    definitionExpression: [`agent_id in (${user?.id})`],
    featureSet: null,
  });

  const mapOptions = {
    discoverKey: import.meta.env.VITE_DISCOVER,
    mapDispatcher: dispatcher,
    zoomToGraphic: app.zoomToGraphic,
    definitionExpression: app.definitionExpression,
    filter: app.filter,
    filterCriteria: app.filterCriteria,
  };

  const sidebarOptions = {
    showSidebar: app.showSidebar,
    toggleSidebar: () => dispatcher({ type: 'TOGGLE_SIDEBAR' }),
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
      <main className="app">
        <Header title="AP&P Field Map" version={import.meta.env.VITE_APP_VERSION} />
        <Sidebar {...sidebarOptions}>
          <SideBarStatus
            status={userState}
            app={app}
            user={user}
            identifyOptions={identifyOptions}
            dispatcher={dispatcher}
          />
        </Sidebar>
        <MapLens {...sidebarOptions} mapView={app.mapView}>
          <MapView {...mapOptions} />
        </MapLens>
      </main>
    </UserContext.Provider>
  );
}

const SideBarStatus = ({ status, dispatcher, app, user, identifyOptions }) => {
  if (status === 'loading' || status === 'empty') {
    return (
      <Skeleton count={15} containerClassName="container-fluid accordion-pane mb-1 card" style={{ height: '50px' }} />
    );
  }

  if (status === 'error') {
    return <div className="text-center">Error</div>;
  }

  if (status === 'success') {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <IdentifyContainer visible={app.identify.show} show={identifyOptions.show}>
          <IdentifyInformation {...identifyOptions} />
        </IdentifyContainer>
        <Filters
          mapDispatcher={dispatcher}
          loggedInUser={{
            value: user.name,
            id: parseInt(user.id),
          }}
          visible={!app.identify.show}
          appliedFilter={app.appliedFilter}
          featureSet={app.featureSet}
        />
      </ErrorBoundary>
    );
  }

  return null;
};
