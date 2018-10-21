import React, { Component } from "react";
import Autocomplete from "react-google-autocomplete";
import "./AutoComplete.css";
class Starter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startlat: " ",
      startlng: " ",
      endlat: " ",
      endlng: " ",
      checkpoint: " ",
      startPos: " ",
      endPos: " "
    };
  }
  render() {
    return (
      <div className="start-stop">
        <Autocomplete
          className="start-loc"
          style={{
            width: "300px",
            height: "30px",
            textAlign: "center",
            fontSize: "20px",
            marginTop: "15px",
            borderRadius: "5px"
          }}
          onPlaceSelected={place => {
            this.setState({
              startlat: place.geometry.location.lat(),
              startlng: place.geometry.location.lng(),
              startPos: place.name
            });
          }}
          types={["(regions)"]}
          componentRestrictions={{ country: "in" }}
          placeHolder="start"
        />
        <br />
        <Autocomplete
          style={{
            width: "300px",
            height: "30px",
            textAlign: "center",
            fontSize: "20px",
            marginTop: "15px",
            borderRadius: "5px"
          }}
          onPlaceSelected={place => {
            this.setState({
              endlat: place.geometry.location.lat(),
              endlng: place.geometry.location.lng(),
              endPos: place.name
            });
          }}
          types={["(regions)"]}
          componentRestrictions={{ country: "in" }}
          placeHolder="destination"
        />
        <br />
        <Autocomplete
          style={{
            width: "300px",
            height: "30px",
            textAlign: "center",
            fontSize: "20px",
            marginTop: "15px",
            borderRadius: "5px"
          }}
          onPlaceSelected={place => {
            console.log(place.name);
            this.setState({
              checkpoint: place.name
            });
          }}
          types={["(regions)"]}
          componentRestrictions={{ country: "in" }}
          placeHolder="via"
        />
        <br />
        <button onClick={() => this.props.childCall(this)}>START</button>
      </div>
    );
  }
}

export default Starter;
