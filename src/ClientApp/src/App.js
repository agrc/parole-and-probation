import isEqual from 'lodash.isequal';
import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import './App.css';
import { AuthenticatorContext } from './components/api-authorization/AuthorizeRoute';
import MapView from './components/esrijs/MapView';
import { Filters } from './components/Filters';
import Header from './components/Header';
import { IdentifyContainer, IdentifyInformation } from './components/Identify';
import MapLens from './components/MapLens';
import Sidebar from './components/Sidebar';
import { mappingConfig } from './config';

const reducer = (draft, action) => {
  console.log(`App:reducing state for ${action.type}`, action);

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
      let filter = action.payload.filter;
      let definitionExpression = action.payload.definitionExpression;

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
      }

      return draft;
    }
    default:
      throw new Error();
  }
};

export default function App() {
  const user = React.useContext(AuthenticatorContext);
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
    appliedFilter: `agent_id in (${user?.profile['public:WorkforceID']})`,
    definitionExpression: [`agent_id in (${user?.profile['public:WorkforceID']})`],
  });

  const mapOptions = {
    discoverKey: process.env.REACT_APP_DISCOVER,
    mapDispatcher: dispatcher,
    zoomToGraphic: app.zoomToGraphic,
    definitionExpression: app.definitionExpression,
    filter: app.filter,
  };

  const sidebarOptions = {
    showSidebar: app.showSidebar,
    toggleSidebar: () => dispatcher({ type: 'TOGGLE_SIDEBAR' }),
  };

  const identifyOptions = {
    apiKey: process.env.REACT_APP_WEB_API,
    features: app.identify.features,
    offender: app.identify.offender,
    index: app.identify.index,
    update: dispatcher,
    show: (state) => dispatcher({ type: 'TOGGLE_IDENTIFY', payload: state }),
  };

  return (
    <div className="app">
      <Header title="AP&P Field Map" version={process.env.REACT_APP_VERSION} />
      {app.identify.show ? (
        <IdentifyContainer show={(value) => dispatcher({ type: 'TOGGLE_IDENTIFY', payload: value })}>
          <IdentifyInformation {...identifyOptions} />
        </IdentifyContainer>
      ) : null}
      <Sidebar {...sidebarOptions}>
        <Filters
          mapDispatcher={dispatcher}
          loggedInUser={{
            value: user?.profile?.name,
            id: user?.profile?.auth_time ? user?.profile['public:WorkforceID'] : null,
          }}
          appliedFilter={app.appliedFilter}
        />
      </Sidebar>
      <MapLens {...sidebarOptions}>
        <MapView {...mapOptions} />
      </MapLens>
    </div>
  );
}
