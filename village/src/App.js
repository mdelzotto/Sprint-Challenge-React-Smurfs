import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route, withRouter } from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf: {
        name: '',
        age: '',
        height: '',
        id: ''
      }
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

componentDidMount() {
  axios.get('http://localhost:3333/smurfs')
  .then(res => this.setState({smurfs: res.data}))
  .catch(err=> console.log(err))
}

postSmurf = (newSmurf) => {
  axios.post('http://localhost:3333/smurfs', newSmurf)
  .then(res => this.setState({smurfs: res.data}, this.props.history.push("/")))
}

goToUpdateForm = (id) => {
  const smurfToUpdate = this.state.smurfs.find(smurf => smurf.id === id);
  this.setState({ isUpdating: true, smurf: smurfToUpdate }, () => this.props.history.push('/smurf-form'));
}

render() {
    return (
      <div className="App">
      <Smurfs smurfs={this.state.smurfs} goTuUpdateForm={this.goToUpdateForm}/>
      <SmurfForm postSmurf={this.postSmurf} smurf = {this.state.smurf}/>
      </div>
    );
  }
}

export default withRouter(App);
