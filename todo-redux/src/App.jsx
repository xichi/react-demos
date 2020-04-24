import React, { useState, createContext } from "react";
import Todo from "./components/Todo/TodoList";
import "./App.css";
import { connect } from 'react-redux';
import { toggleModalShown } from './store/actions'

export const ModalShownContext = createContext();

function App(props) {
  const { modalShown, toggleModalShown } = props;

  return (
    <div className="App">
      <ModalShownContext.Provider>
        <Todo></Todo>
      </ModalShownContext.Provider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modalShown: state.modalShown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalShown: (boolean)=>dispatch(toggleModalShown(boolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);