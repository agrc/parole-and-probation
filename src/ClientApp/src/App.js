import produce from 'immer';
import * as React from 'react';
import { UserData } from 'react-oidc';
import './App.css';
import MapView from './components/esrijs/MapView';
import { Filters } from './components/Filters';
import Header from './components/Header';
import { IdentifyContainer, IdentifyInformation } from './components/Identify';
import MapLens from './components/MapLens';
import Sidebar from './components/Sidebar';
import { mappingConfig } from './config';

const reducer = produce((draft, action) => {
  console.log(`App:reducing state for ${action.type}`, action);

  switch (action.type) {
    case 'ZOOM_TO_GRAPHIC':
      {
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
      if (filter && filter.length > 0) {
        tempFilter = filter;
      }

      if (definitionExpression && definitionExpression.length > 0) {
        tempFilter = tempFilter.concat(definitionExpression);
      }

      const newFilters = tempFilter.join(' AND ');

      if (draft.appliedFilter !== newFilters) {
        draft.appliedFilter = newFilters;
        draft.filter = filter;
        draft.definitionExpression = definitionExpression;
      }

      return draft;
    }
    default:
      throw new Error();
  }
});

export default function App() {
  const oidc = React.useContext(UserData);
  const [app, dispatcher] = React.useReducer(reducer, {
    zoomToGraphic: {
      graphic: {},
      level: 0
    },
    mapPoint: {},
    identify: {
      show: false,
      status: null,
      features: [],
      offender: {},
      index: 0
    },
    showSidebar: window.innerWidth >= mappingConfig.MIN_DESKTOP_WIDTH,
    filter: [],
    appliedFilter: `agent_id in (${oidc.user.profile['public:WorkforceID']})`,
    definitionExpression: [`agent_id in (${oidc.user.profile['public:WorkforceID']})`]
  });

  const mapOptions = {
    discoverKey: process.env.REACT_APP_DISCOVER,
    mapDispatcher: dispatcher,
    zoomToGraphic: app.zoomToGraphic,
    definitionExpression: app.definitionExpression,
    filter: app.filter
  };

  const sidebarOptions = {
    showSidebar: app.showSidebar,
    toggleSidebar: () => dispatcher({ type: 'TOGGLE_SIDEBAR' })
  };

  const identifyOptions = {
    apiKey: process.env.REACT_APP_WEB_API,
    features: app.identify.features,
    offender: app.identify.offender,
    index: app.identify.index,
    update: dispatcher,
    show: state => dispatcher({ type: 'TOGGLE_IDENTIFY', payload: state })
  };

  return (
    <div className="app">
      <Header title="AP&P Field Map" version={process.env.REACT_APP_VERSION} />
      {app.identify.show ?
        <IdentifyContainer show={value => dispatcher({ type: 'TOGGLE_IDENTIFY', payload: value })}>
          <IdentifyInformation {...identifyOptions} />
        </IdentifyContainer>
        : null}
      <Sidebar {...sidebarOptions}>
        <Filters
          mapDispatcher={dispatcher}
          loggedInUser={{
            value: oidc.user.profile.name,
            id: oidc.user.profile['public:WorkforceID']
          }}
          appliedFilter={app.appliedFilter}
        />
      </Sidebar>
      <MapLens {...sidebarOptions}>
        <MapView {...mapOptions} />
      </MapLens>
    </div>
  );
};
