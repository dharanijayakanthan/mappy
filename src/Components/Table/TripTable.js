import React, { Component } from "react";
import "./Table.css";

class TripTable extends Component {
  render() {
    var tripArray = JSON.parse(localStorage.getItem("location"));

    return (
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left">Start</th>
            <th className="text-left">Destination</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {tripArray == undefined ? (
            <tr>No Trips yet</tr>
          ) : (
            tripArray.map(i => {
              return (
                <tr>
                  <td className="text-left">{i.startPos}</td>
                  <td className="text-left">{i.endPos}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    );
  }
}

export default TripTable;
