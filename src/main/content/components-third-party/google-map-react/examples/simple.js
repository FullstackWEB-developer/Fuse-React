import React, {Component} from 'react';
import {Icon, Tooltip, Typography} from 'material-ui';
import GoogleMap from 'google-map-react';

const Marker = ({text}) => (
    <Tooltip title={text} placement="top">
        <Icon className="text-red">place</Icon>
    </Tooltip>
);


class SimpleExample extends Component {

    render()
    {
        return (
            <div>
                <Typography className="h2 mb-16">Simple Map Example</Typography>
                <div className="w-full h-512">
                    <GoogleMap
                        bootstrapURLKeys={{
                            key: process.env.REACT_APP_MAP_KEY
                        }}
                        defaultZoom={12}
                        defaultCenter={[-34.397, 150.64]}
                    >
                        <Marker
                            text="Marker Text"
                            lat="-34.397"
                            lng="150.644"
                        />
                    </GoogleMap>
                </div>
            </div>
        );
    }
}

export default SimpleExample;
