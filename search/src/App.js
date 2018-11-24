import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    InstantSearch, Hits, SearchBox, Configure, RefinementList, RangeInput, MenuSelect
} from 'react-instantsearch-dom';
import ReactMapGL, {BaseControl, Marker} from 'react-map-gl';

import './App.css';

const mapboxApiAccessToken = 'pk.eyJ1IjoidGhvYWlvbmxpbmUiLCJhIjoiY2pvdjB3ZHVrMWZtejNwbnZxbm55ajFlNCJ9.d6smYka4raCk1wnLeFA8MQ'

function IncidentPin({hit}) {
    const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

    const pinStyle = {
        fill: '#d00',
        stroke: 'none'
    };

    const size = 20;

    if (!hit._geoloc.lat || !hit._geoloc.lng) {
        return null;
    }

    return (
        <Marker latitude={hit._geoloc.lat} longitude={hit._geoloc.lng} offsetLeft={-20} offsetTop={-10}>
            <svg
                height={size}
                viewBox="0 0 24 24"
                style={{...pinStyle, transform: `translate(${-size / 2}px,${-size}px)`}}
            >
                <path d={ICON}/>
            </svg>
        </Marker>
    )
};

const ResultView = ({viewport, onViewportChange}) => {
    return <ReactMapGL
        width="100%"
        height="100%"
        {...viewport}
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={mapboxApiAccessToken}
    >
        <Hits hitComponent={IncidentPin}/>
    </ReactMapGL>

};

class App extends Component {
    state = {
        viewport: {
            latitude: -37.86056104964807,
            longitude: 144.93810500843276,
            zoom: 8.682758083187197,
        }
    };

    render() {
        const onViewportChange = (viewport) => {
            console.log(viewport);
            this.setState({viewport});
            //if (viewport.zoom > 8.68) this.setState({viewport});
        };

        return (
            <div className="section">
                <div className="container">
                    <InstantSearch
                        appId="664666TT3X"
                        apiKey="e16aa90f340ca104cb32b7d8c7e98e8c"
                        indexName="dev_melbourne"
                    >
                        <Configure hitsPerPage={1000}/>

                        <div className="columns">
                            <div className="column">
                                <SearchBox/>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-one-quarter">
                                <label className="label">Categories</label>
                                <RefinementList attribute="categories"/>
                                <label className="label">Age</label>
                                <RangeInput attribute="age"/>
                                <label className="label">Gender</label>
                                <RefinementList attribute="gender"/>
                            </div>

                            <div className="column" style={{height: 450}}>
                                <ResultView viewport={this.state.viewport} onViewportChange={onViewportChange}/>
                            </div>

                        </div>
                    </InstantSearch>
                </div>
            </div>
        )
    }
}


export default App;
