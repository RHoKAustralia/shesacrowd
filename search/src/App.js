import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    InstantSearch, Hits, SearchBox, Configure, RefinementList, RangeInput
} from 'react-instantsearch-dom';
import ReactMapGL, {BaseControl, Marker} from 'react-map-gl';

import './App.css';

function IncidentPin({hit}) {
    const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

    const pinStyle = {
        fill: '#d00',
        stroke: 'none'
    };

    const size = 20;

    if (!hit.lat || !hit.lng) {
        return null;
    }

    return (
        <Marker latitude={hit.lat} longitude={hit.lng} offsetLeft={-20} offsetTop={-10}>
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

function Search() {
    return (
        <div className="container">
            <SearchBox/>
            <Hits hitComponent={IncidentPin}/>
        </div>
    );
}

const ResultView = ({viewport, onViewportChange}) => {
    return <ReactMapGL
        {...viewport}
        onViewportChange={onViewportChange}
    >
        <Hits hitComponent={IncidentPin}/>
    </ReactMapGL>

};

class App extends Component {
    state = {
        viewport: {
            width: 600,
            height: 600,
            latitude: -37.86056104964807, longitude: 144.93810500843276, zoom: 8.682758083187197
        }
    };

    render() {
        const onViewportChange = (viewport) => {
            console.log(viewport);
            //this.setState({viewport});
            if (viewport.zoom > 8.68) this.setState({viewport});
        };

        return <div>
            <InstantSearch
                appId="664666TT3X"
                apiKey="e16aa90f340ca104cb32b7d8c7e98e8c"
                indexName="dev_incidents"
            >
                <Configure hitsPerPage={1000}/>

                <SearchBox/>
                <RefinementList attribute="categories"/>
                Age: <RangeInput attribute="age"/>
                Gender: <RefinementList attribute="gender"/>


                <ResultView viewport={this.state.viewport} onViewportChange={onViewportChange}/>
            </InstantSearch>

        </div>
    }
}


export default App;
