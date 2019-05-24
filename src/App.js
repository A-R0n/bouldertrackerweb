import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/general/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

import './assets/scss/general.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authed: false,
      jwt: '',
      id: 0
    }
  }

  checkAuth = () => {
    console.log('CHECKING AUTH');
    let jwt = localStorage.getItem('jwt');
    if(jwt) {
      if(localStorage.getItem('jwt')) {
        console.log('JWT FOUND');
        this.setState({
          authed: true,
          jwt: jwt,
          id: localStorage.getItem('id')
        });
      }
    }
  }

  handleAuthed = (jwt,id) => {
    this.setState({
      jwt: jwt,
      id: id,
      authed: true
    });
  }

  handleLogout = () => {
    localStorage.setItem('jwt', null);
    localStorage.setItem('id', null);

    this.setState({
      authed: false,
      jwt: ''
    });
  }

  render() {
    console.log(this.state.authed);
    if (!this.state.authed) {
      return (
        <Router>
          <div>
            <Header authed={this.state.authed} jwt={this.state.jwt} handleLogout={this.handleLogout} />
  
            <Route exact path="/" component={() => <Home isAuthed={this.state.authed} jwt={this.state.jwt} id={this.state.id} />} />
            <Route exact path="/login" component={() => <Login handleAuthed={this.handleAuthed}/>} />
            <Route exact path="/register" component={() => <Register handleAuthed={this.handleAuthed}/>} />
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <Header authed={this.state.authed} jwt={this.state.jwt} handleLogout={this.handleLogout} />
  
            <Route exact path="/" component={() => <Home isAuthed={this.state.authed} jwt={this.state.jwt} id={this.state.id} />} />
          </div>
        </Router>
      );
    }
    
  }
}

export default App;
