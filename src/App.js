import React, { useReducer } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapLens from './components/MapLens';
import MapView from './components/esrijs/MapView';
import Filters from './components/Filters';
import { IdentifyInformation, IdentifyContainer } from './components/Identify';
import config from './config';
import './App.css';

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'ZOOM_TO_GRAPHIC':
      {
        return {
          ...state,
          zoomToGraphic: {
            graphic: action.payload,
            level: 18
          }
        };
      }
    case 'MAP_CLICK': {
      return {
        ...state,
        showIdentify: true,
        showSidebar: true,
        mapPoint: action.payload
      };
    }
    case 'TOGGLE_SIDEBAR': {
      if (action.payload === undefined) {
        action.payload = state.showSidebar;
      }

      return {
        ...state,
        showSidebar: !action.payload
      };
    }
    case 'TOGGLE_IDENTIFY': {
      return {
        ...state,
        showIdentify: action.payload,
        showSidebar: action.payload ? true : state.showSidebar,
      };
    }
    default:
      throw new Error();
  }
};

export default function App() {
  const [app, dispatcher] = useReducer(reducer, {
    zoomToGraphic: {
      graphic: {},
      level: 0
    },
    mapPoint: {},
    showIdentify: false,
    showSidebar: window.innerWidth >= config.MIN_DESKTOP_WIDTH
  });

  const mapOptions = {
    discoverKey: process.env.REACT_APP_DISCOVER,
    mapDispatcher: dispatcher,
    zoomToGraphic: app.zoomToGraphic
  };

  const sidebarOptions = {
    showSidebar: app.showSidebar,
    toggleSidebar: () => dispatcher({ type: 'TOGGLE_SIDEBAR' })
  };

  return (
    <div className="app">
      <Header title="AP&P Field Map" version={process.env.REACT_APP_VERSION} />
      {app.showIdentify ?
        <IdentifyContainer show={state => dispatcher({ type: 'TOGGLE_IDENTIFY', payload: state })}>
          <IdentifyInformation apiKey={process.env.REACT_APP_WEB_API} location={app.mapPoint} />
        </IdentifyContainer>
        : null}
      <Sidebar>
        <Filters mapDispatcher={dispatcher} />
      </Sidebar>
      <MapLens {...sidebarOptions}>
        <MapView {...mapOptions} />
      </MapLens>
    </div>
  );
};
