import React, { useState, createContext } from "react";
import TodoWrap from "./components/Todo/TodoWrap";
import "./App.css";
import { connect } from 'react-redux';
import { toggleModalShown } from './store/actions'

export const ModalShownContext = createContext();

function App(props) {
  const { modalShown, toggleModalShown } = props;

  return (
    <div className="App">
      <ModalShownContext.Provider>
        <TodoWrap></TodoWrap>
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