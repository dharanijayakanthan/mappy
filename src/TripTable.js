import React, { Component } from "react";
import "./Table.css";

class TripTable extends Component {
  render() {
    return (
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left">Strt</th>
            <th className="text-left">Destination</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          <tr>
            <td className="text-left">{localStorage.getItem("Location")}</td>
            <td className="text-left">$ 50,000.00</td>
          </tr>
          <tr>
            <td className="text-left">February</td>
            <td className="text-left">$ 10,000.00</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default TripTable;
