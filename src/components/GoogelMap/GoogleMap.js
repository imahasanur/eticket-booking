import React from 'react';
import './GoogleMap.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const GoogleMap = (props) => {
  const mapStyles = {
    border:'1px solid green',
    minHeight:'500px'
  }
  return (
    <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176}}
    />
  );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBvdfamLkD6_fOB1monIXp8VmNmNInYhTs'
  })(GoogleMap);;