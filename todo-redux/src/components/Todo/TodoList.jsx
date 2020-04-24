import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import "./TodoList.css";

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    resetValue: () => setValue(""),
  };
};

function Todo() {
  const { resetValue, ...textObj } = useInputValue("");
  const [todos, setTodos] = useState([]);

  const toggleTodoComplete = (e) => {
    const src = e.target;
    if (src.className === "value") {
      const i = parseInt(src.dataset.index);
      setTodos(
        todos.map((todo, k) =>
          k === i ? { ...todo, complete: !todo.complete } : todo
        )
      );
    }
  };

  return (
    <div className="todo_section">
      <form
        className="todo_form"
        onSubmit={(e) => {
          e.preventDefault();
          setTodos([
            { value: textObj.value, complete: false, tag: [] },
            ...todos,
          ]);
          resetValue();
        }}
      >
        <input
          className="input-box"
          type="text"
          id=""
          placeholder="New Todo +"
          {...textObj}
        />
        <div className="todo_menu_wrap">
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add("svg-setting");
              svg.setAttribute(
                "style",
                "width: 30px;height: 30px;color:#fff;cursor:pointer;"
              );
            }}
            src="http://cloud.xichi.xyz/icon/setting.svg"
          ></ReactSVG>
          <div className="todo_menu">
            <ul>
              <li className="todo_menu_list">清除今日已完成</li>
              <li className="todo_menu_list">清除所有</li>
              <li className="todo_menu_list">选择管理</li>
            </ul>
          </div>
        </div>
      </form>
      <div className="todo_list" onClick={(e) => toggleTodoComplete(e)}>
        {todos.map(({ value, complete }, i) => (
          <div key={i} className="todo_item">
            <div
              className="value"
              data-index={i}
              style={{
                textDecoration: complete ? "line-through" : "",
                color: complete ? "#999" : "#fff",
                cursor: "pointer",
              }}
            >
              {value}
            </div>
            <div className="menu" style={{ position: "relative" }}>
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.classList.add("svg-more");
                  svg.setAttribute(
                    "style",
                    "width: 30px;height: 30px;color:#fff;"
                  );
                }}
                src="http://cloud.xichi.xyz/icon/more.svg"
              ></ReactSVG>
              <div className="todo_menu todo_item_menu">
                <ul>
                  <li className="todo_menu_list">编辑</li>
                  <li className="todo_menu_list">删除</li>
                  <li className="todo_menu_list">分类</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
