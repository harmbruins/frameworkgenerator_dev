// @flow

// #region imports
import React, { PureComponent } from 'react';
import Table from './React_Tbl';
import TaskBar from './React_TaskBar';


import {
  type Match,
  type Location,
  type RouterHistory,
} from 'react-router-dom';
// #endregion

// #region flow types
type Props = {
  // react-router 4:
  match: Match,
  location: Location,
  history: RouterHistory,

  ...any,
};
type State = any;
// #endregion

class About extends PureComponent<Props, State> {
  // #region lifecycle
  render() {
    return (
      <div>
        <h1>Framework Generator</h1>
        <br/>
        <TaskBar/>
        <br/>
        <Table/>
      </div>
    );
  }
  // #endregion
}

export default About;
