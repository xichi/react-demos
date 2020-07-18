import React, { Component } from 'react'
import Gun from 'gun/gun'
import Todos from './Todos'
import Chat from './Chat'
import Json from './Json'
import Poll from './Poll'

class App extends Component {
  constructor() {
    super();
    this.gun = Gun('http://api.xichi.xyz:8765/gun')
    window.gun = this.gun
  }
  
  render() {
    return (
      <div>
        <h1>React Examples</h1>
        <h2>Todo</h2>
        <Todos gun={this.gun} />
        <br />
        <hr />
        <h2>Chat</h2>
        <Chat gun={this.gun} />
        <br />
        <hr />
        <h2>Json</h2>
        <Json gun={this.gun} />
        <br />
        <hr />
        <h2>Poll</h2>
        <Poll gun={this.gun} />
      </div>
    );
  }
}

export default App;
