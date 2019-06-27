import React, { useReducer } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapLens from './components/MapLens';
import MapView from './components/esrijs/MapView';
import Filters from './components/Filters';
import { IdentifyInformation, IdentifyContainer } from './components/Identify';
import config from './config';
import produce from 'immer';
import './App.css';

const reducer = produce((draft, action) => {
  console.log(`reducing state for ${action.type}`);
  console.dir(action);

  switch (action.type) {
    case 'ZOOM_TO_GRAPHIC':
      {
        draft.zoomToGraphic.graphic = action.payload;
        draft.zoomToGraphic.level = 18;

        return draft;
      }
    case 'MAP_CLICK': {
      draft.showIdentify = true;
      draft.showSidebar = true;
      draft.mapPoint = action.payload;

      return draft;
    }
    case 'TOGGLE_SIDEBAR': {
      if (action.payload === undefined) {
        action.payload = draft.showSidebar;
      }

      draft.showSidebar = !action.payload;

      return draft;
    }
    case 'TOGGLE_IDENTIFY': {
      draft.showSidebar = action.payload ? true : draft.showSidebar;
      draft.showIdentify = action.payload;

      return draft;
    }
    default:
      throw new Error();
  }
});

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
          <IdentifyInformation
            apiKey={process.env.REACT_APP_WEB_API}
            location={app.mapPoint}
            show={state => dispatcher({ type: 'TOGGLE_IDENTIFY', payload: state })} />
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
