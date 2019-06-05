import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapLens from './components/MapLens';
import MapView from './components/esrijs/MapView';
import Filters from './components/Filters';
import { IdentifyInformation, IdentifyContainer } from './components/Identify';
import config from './config';
import './App.css';

export default class App extends Component {
  state = {
    zoomToPoint: {
      zoomToGraphic: {
        graphic: {},
        level: 0
      }
    },
    mapClick: {},
    sideBarOpen: window.innerWidth >= config.MIN_DESKTOP_WIDTH,
    showIdentify: false,
    showPrint: false
  };

  onMapClick = this.onMapClick.bind(this);
  showIdentify = this.showIdentify.bind(this);
  toggleSidebar = this.toggleSidebar.bind(this);
  setView = this.setView.bind(this);

  render() {
    const quadWord = process.env.REACT_APP_DISCOVER;
    const apiKey = process.env.REACT_APP_WEB_API;
    const version = process.env.REACT_APP_VERSION;

    const mapOptions = {
      discoverKey: quadWord,
      zoomToGraphic: this.state.zoomToGraphic,
      onClick: this.onMapClick,
      setView: this.setView
    }

    const sidebarOptions = {
      sideBarOpen: this.state.sideBarOpen,
      toggleSidebar: this.toggleSidebar
    }

    return (
      <div className="app">
        <Header title="AP&P Field Map" version={version} />
        {this.state.showIdentify ?
          <IdentifyContainer show={this.showIdentify}>
            <IdentifyInformation apiKey={apiKey} location={this.state.mapClick} />
          </IdentifyContainer>
          : null}
        <Sidebar>
          <Filters />
        </Sidebar>
        <MapLens {...sidebarOptions}>
          <MapView {...mapOptions} />
        </MapLens>
      </div>
    );
  }

  onMapClick(event) {
    this.setState({
      showIdentify: true,
      sideBarOpen: true,
      mapClick: event.mapPoint
    });
  }

  showIdentify(value) {
    this.setState({ showIdentify: value });
  }

  toggleSidebar() {
    this.setState(state => {
      return { sideBarOpen: !state.sideBarOpen };
    });
  }

  setView(value) {
    this.setState({
      mapView: value
    });
  }
}
