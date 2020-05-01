import React, { useContext } from "react";
import { TimeContext } from "../../App";
import './formatDate';

function Time() {
  const initDate = useContext(TimeContext);
  const Date = initDate.format("yyyy-MM-dd");
  const time = initDate.format("hh : mm");

  return (
    <div style={{ margin: "50px 0" }}>
      <div style={{ fontSize: "80px", color: "#bbb" }}>{time}</div>
      <div style={{ fontSize: "15px", color: "#999" }}>{Date}</div>
    </div>
  );
}

export default Time;
