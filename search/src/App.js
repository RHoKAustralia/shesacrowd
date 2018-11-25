import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    InstantSearch, Hits, SearchBox, Configure, RefinementList, RangeInput, MenuSelect
} from 'react-instantsearch-dom';

import ReactMapGL, {Popup, Marker} from 'react-map-gl';

import './App.css';

const mapboxApiAccessToken = 'pk.eyJ1IjoidGhvYWlvbmxpbmUiLCJhIjoiY2pvdjB3ZHVrMWZtejNwbnZxbm55ajFlNCJ9.d6smYka4raCk1wnLeFA8MQ'

class IncidentPin extends Component {
    constructor(props) {
        super(props);
        this.state = {showPopup: false}
    }

    render() {
        let {hit} = this.props;
        if (!hit._geoloc.lat || !hit._geoloc.lng) {
            return null;
        }

        let popup = this.state.showPopup ? (
            <Popup
                latitude={hit._geoloc.lat}
                longitude={hit._geoloc.lng}
                onClose={() => this.setState({showPopup: false})}
                closeOnClick={true}
            >
                <p className="is-size-7">{hit.description}</p>
                <label className="label">{hit.gender}</label>
                <span className="tags">
                    {
                        hit.categories.map(c => <span
                            className="tag is-info">{c}</span>)
                    }
                    </span>
            </Popup>
        ) : null;

        return (
            <div>
                <Marker latitude={hit._geoloc.lat} longitude={hit._geoloc.lng} offsetLeft={-20} offsetTop={-10}>
                    <img src="/pin.png" className="incident-pin" onClick={() => {
                        let {showPopup} = this.state
                        this.setState({showPopup: !showPopup});
                    }}/>
                </Marker>
                {popup}
            </div>
        )
    }
}

function _IncidentPin({hit}) {
    if (!hit._geoloc.lat || !hit._geoloc.lng) {
        return null;
    }

    return (
        <Marker latitude={hit._geoloc.lat} longitude={hit._geoloc.lng} offsetLeft={-20} offsetTop={-10}>
            <img src="/pin.png" className="incident-pin"/>
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
