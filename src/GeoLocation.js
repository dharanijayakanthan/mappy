/*global google*/
import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import "./GeoLocation.css";

const {
  MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startlat: " ",
      startlng: " "
    };
  }
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div class="g-location">
        <MarkerWithLabel
          position={{
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude
          }}
          labelAnchor={new google.maps.Point(0, 0)}
          labelStyle={{
            width: "50px",
            height: "50px",
            fontSize: "12px"
          }}
        >
          <div>
            <img
              src={require("./truck.png")}
              alt="truck"
              width="50"
              height="50"
            />
          </div>
        </MarkerWithLabel>
        <button
          id="start-trip"
          onClick={() => this.props.locationCall(this.props.coords)}
        >
          Start trip from my current location
        </button>
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    watchPosition: true
  },
  userDecisionTimeout: 5000
})(Demo);
