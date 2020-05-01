import React, { useState, createContext, useEffect } from "react";
import TodoWrap from "./components/Todo/TodoWrap";
import Time from "./components/Time/Time";
import "./App.css";

export const TimeContext = createContext();

function App() {
  const [time, setTime] = useState(new Date());

  const Timer = () => {
    setTime(new Date());
    setTimeout(Timer, 1000); // 循环定时调用
  };

  useEffect(() => {
    Timer();
  }, []);

  return (
    <div className="App">
      <TimeContext.Provider value={time}>
        <Time></Time>
        <TodoWrap></TodoWrap>
      </TimeContext.Provider>
    </div>
  );
}

/* const mapStateToProps = (state) => {
  return {
    modalShown: state.modalShown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalShown: (boolean)=>dispatch(toggleModalShown(boolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); */
export default App;
