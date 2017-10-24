import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import Landing from './landing';
import Person from './person';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Layout>
              <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/person/:name" component={Person} />
                </Switch>
              </BrowserRouter>
          </Layout>
      </div>
    );
  }
}

export default App;
