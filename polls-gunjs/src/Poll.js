import React, { Component } from 'react'
import Gun from 'gun/gun'

export default class Poll extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun.get('polls');
    this.state = {
      polls: [],
      question: "",
      options: { 0: '', 1: '' },
      results: { 0: 0, 1: 0 },
      sender: ""
    }
  }

  componentWillMount() {
    let polls = [];
    this.gun.map().on((data, key) => {
      let poll = {
        key: key,
        question: data.question,
        sender: data.sender,
        time: data.time
      };
      if (data.options) {
        this.gun.get(key).get('options').on(options => {
          delete options._;
          poll.options = options
        })
      }
      if (data.results) {
        this.gun.get(key).get('results').on(results => {
          delete results._;
          poll.results = results
        })
      }
      polls.push(poll);
    });
    this.setState({
      polls: polls
    })
  }

  send = e => {
    e.preventDefault()
    const sender = this.state.sender
    const when = Gun.time.is()
    const key = `${sender}_${when}_${Gun.text.random(4)}`
    this.gun.get(key).put({
      question: this.state.question,
      time: (new Date()).getTime(),
      sender: this.state.sender,
      options: this.state.options,
      results: this.state.results
    })
  }

  vote = (key, index, oIndex) => {
    const results = this.state.polls[index].results;
    const count = ++Object.values(results)[oIndex];
    this.setState({polls: this.state.polls.map((poll, id) => (id === index ? {
      ...poll,
      results: {
        ...poll.results,
        [oIndex]: count
      }
    } : poll))})
    this.gun.get(key).get('results').put({ ...results, [oIndex]: count })
  }

  render() {
    return (<>
      <form onSubmit={this.send}>
        <label>sender:</label>
        <input value={this.state.sender} onChange={e => this.setState({ sender: e.target.value })} />
        <br />
        <hr />
        <label>question:</label>
        <input value={this.state.question} onChange={e => this.setState({ question: e.target.value })} />
        <br />
        <hr />
        <label>options:</label>
        <input value={this.state.options[0]} onChange={e => this.setState({ options: { ...this.state.options, 0: e.target.value } })} />
        <input value={this.state.options[1]} onChange={e => this.setState({ options: { ...this.state.options, 1: e.target.value } })} />
        <button onClick={this.send}>Send A New Poll</button>
      </form>
      <div style={{ marginTop: '100px' }}>
        {this.state.polls.map((poll, index) => (
          <div key={index}>
            <div>{poll.question}</div>
            <ul>
              {
                poll.options ? Object.values(poll.options).map((option, oIndex) => (
                  <li key={oIndex}>{option}
                    {poll.results ? <span onClick={() => this.vote(poll.key, index, oIndex)}>{Object.values(poll.results)[oIndex]}</span> : null}
                  </li>
                )) : null
              }
            </ul>
            <hr />
          </div>))}
      </div>
    </>)
  }
}