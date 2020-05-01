import React from 'react';
import './App.css';
import Todo from './views/Todo';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Todo></Todo>
      </div>
    </Provider>
  );
}

export default App;
