import React, { useState, useReducer } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapLens from './components/MapLens';
import MapView from './components/esrijs/MapView';
import Filters from './components/Filters';
import { IdentifyInformation, IdentifyContainer } from './components/Identify';
import config from './config';
import './App.css';

export default function App() {
  const reducer = (_, action) => {
    console.log(action);
    switch (action.type) {
      case 'zoom':
        {
          return {
            zoomToGraphic: {
              graphic: action.graphic,
              level: 18
            }
          };
        }
      case 'click': {
        setShowIdentify(true);
        setSidebarStatus(true);

        return { mapPoint: action.mapPoint };
      }
      default:
        throw new Error();
    }
  }

  const [showIdentify, setShowIdentify] = useState(false);
  const [sideBarOpen, setSidebarStatus] = useState(window.innerWidth >= config.MIN_DESKTOP_WIDTH);
  const [mapActions, mapDispatcher] = useReducer(reducer, {
    zoomToGraphic: {
      graphic: {},
      level: 0
    },
    mapPoint: {}
  });

  const mapOptions = {
    discoverKey: process.env.REACT_APP_DISCOVER,
    mapDispatcher,
    zoomToGraphic: mapActions.zoomToGraphic
  };

  const sidebarOptions = {
    sideBarOpen,
    toggleSidebar: () => setSidebarStatus(!sideBarOpen)
  };

  return (
    <div className="app">
      <Header title="AP&P Field Map" version={process.env.REACT_APP_VERSION} />
      {showIdentify ?
        <IdentifyContainer show={state => setShowIdentify(state)}>
          <IdentifyInformation apiKey={process.env.REACT_APP_WEB_API} location={mapActions.mapPoint} />
        </IdentifyContainer>
        : null}
      <Sidebar>
        <Filters mapDispatcher={mapDispatcher} />
      </Sidebar>
      <MapLens {...sidebarOptions}>
        <MapView {...mapOptions} />
      </MapLens>
    </div>
  );
};
