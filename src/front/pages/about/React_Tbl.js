import React from 'react';
import { Table } from 'reactstrap';
const fetch = require('node-fetch');

class React_Tbl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarios: [],
      seconds: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.loadScenariosFromServer());
    //this.loadScenariosFromServer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadScenariosFromServer() {
    fetch('http://localhost:8096/scenario',
      {
        headers: {
          'Content-Type': ' application/json',
          'Access-Control-Allow-Origin':'*',
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          scenarios: responseData,
        });
        console.log(responseData);
      });
  }

  render() {
    return (
      <Table>
        <div>
        </div>
        <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>property</th>
          <th>value</th>
        </tr>
        </thead>
        <tbody>
        {this.state.scenarios.map(function(p,index) {
          return (
            <tr>
              <td>{index}</td>
              <td>{p.name}</td>
              <td>{p.property}</td>
              <td>{p.value}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    );
  }
}
export default React_Tbl;
