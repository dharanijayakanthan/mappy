/*global google*/

import React, { Component } from "react";
import Starter from "./Components/AutoComplete/AutoComplete";
import Geolocated from "./Components/GeoLocation/GeoLocation";
import TripTable from "./Components/Table/TripTable";
import "./App.css";
const { compose, withProps, lifecycle } = require("recompose");
// const {
//   MarkerWithLabel
// } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Circle
} = require("react-google-maps");

const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

class MyMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startlat: "",
      startlng: "",
      endlat: "",
      endlng: "",
      checkpoint: " "
    };
  }

  render() {
    var cthis = this;
    function letsCall(s) {
      cthis.setState({
        startlat: s.startlat,
        startlng: s.startlng,
        endlat: s.endlat,
        endlng: s.endlng,
        checkpoint: s.checkpoint
      });

      // console.log(cthis.state);
    }
    function locationInnerCall(s) {
      cthis.setState({
        startlat: s.latitude,
        startlng: s.longitude
      });
    }

    function updateTable(s) {
      console.table(s);
      if (localStorage.getItem("location") == undefined) {
        var locationArray = [];
        locationArray.push(s);
        localStorage.setItem("location", JSON.stringify(locationArray));
      } else {
        var newArray = JSON.parse(localStorage.getItem("location"));
        newArray.push(s);
        localStorage.setItem("location", JSON.stringify(newArray));
      }
    }
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-NE31Z7xIugyPm9B-Q7QYrRNigqf34XM&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentWillMount() {
          console.log(cthis.state);
          const DirectionsService = new google.maps.DirectionsService();
          // var waypts = [
          //   { locationList: "bangalore" },
          //   { locationList: "maharastra" },
          //   { locationList: "pune" }
          // ];
          // var ms = waypts.map(i => {
          //   return { location: i.locationList };
          // });
          // console.log(ms);

          DirectionsService.route(
            {
              origin: new google.maps.LatLng(
                cthis.state.startlat,
                cthis.state.startlng
              ),
              destination: new google.maps.LatLng(
                cthis.state.endlat,
                cthis.state.endlng
              ),
              // waypoints: ms,
              waypoints: [{ location: cthis.state.checkpoint }],
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        }
      })
    )(props => (
      <div className="mappyContainer">
        <GoogleMap
          defaultZoom={17}
          defaultCenter={new google.maps.LatLng(12.9795, 77.763)}
        >
          <Circle
            defaultOptions={{
              circleOptions: {
                fillColor: `black`,
                fillOpacity: 0.2,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1,
                center: new google.maps.LatLng(12.9795, 77.763),
                radius: 500,
                visible: true
              }
            }}
          />
          <DrawingManager
            defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
            defaultOptions={{
              drawingControl: true,
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  google.maps.drawing.OverlayType.CIRCLE,
                  google.maps.drawing.OverlayType.POLYGON,
                  google.maps.drawing.OverlayType.POLYLINE,
                  google.maps.drawing.OverlayType.RECTANGLE
                ]
              },
              circleOptions: {
                fillColor: "black",
                fillOpacity: 0.1,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                zIndex: 1,
                radius: 500
              },
              polygonOptions: {
                fillColor: "black",
                fillOpacity: 0.1,
                strokeWeight: 1,
                clickable: false,
                editable: true,
                zIndex: 1
              },
              polylineOptions: {
                fillColor: "black",
                fillOpacity: 0.1,
                strokeWeight: 1,
                clickable: false,
                editable: true,
                zIndex: 1
              },
              rectangleOptions: {
                fillColor: "black",
                fillOpacity: 0.1,
                strokeWeight: 1,
                clickable: false,
                editable: true,
                zIndex: 1
              }
            }}
          />

          {props.directions && (
            <DirectionsRenderer directions={props.directions} />
          )}
          <Starter
            childCall={function(st) {
              letsCall(st.state);
              updateTable(st.state);
            }}
          />
          <Geolocated
            locationCall={function(loc) {
              locationInnerCall(loc);
            }}
          />
        </GoogleMap>
        <TripTable />
      </div>
    ));
    return <MapWithADirectionsRenderer />;
  }
}

export default MyMapComponent;
