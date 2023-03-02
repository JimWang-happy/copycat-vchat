import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../src/routes'


export default class App extends Component {
  render() {
    return (
      <div className='page'>
        <Switch>
          { routes.map((routeObj) => <Route key={routeObj.path} {...routeObj} />)  }
          <Redirect to="/login" />
        </Switch>
      </div>
    )
  }
}
