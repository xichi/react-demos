import React, { useState, useRef, useEffect } from "react";
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
  const editValueRef = useRef();
  const [todos, setTodos] = useState([]);

  /* useEffect(() => {
    const initTodos = localStorage.getItem("TodoList");
    if(initTodos !== null){
      setTodos(initTodos);
    }
  })

  useEffect(() => {
    localStorage.setItem("TodoList", todos)
  },[todos]) */

  //list-menu
  const clearAllTodos = ()=>{
    setTodos([]);
  }
  
  const clearCompletedTodos = ()=>{
    setTodos(todos.filter(todo => todo.complete === false))
  }

  //item-menu
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

  const completeTodo = (i) => {
    setTodos(
      todos.map((todo, k) => (k === i ? { ...todo, complete: true } : todo))
    );
  };

  const editTodo = (i) => {
    setTodos(
      todos.map((todo, k) => (k === i ? { ...todo, editMode: true } : todo))
    );
  };

  const finishEidtTodo = (i, value) => {
    setTodos(
      todos.map((todo, k) =>
        k === i
          ? { ...todo, editMode: false, complete: false, value: value }
          : todo
      )
    );
  };

  const clearTodo = (i) => {
    setTodos(todos.slice(0, i).concat(todos.slice(i + 1)));
  };

  return (
    <div className="todo_section">
      <form
        className="todo_form"
        onSubmit={(e) => {
          e.preventDefault();
          setTodos([
            { value: textObj.value, complete: false, editMode: false, category: [] },
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
              <li className="todo_menu_list" onClick={clearCompletedTodos}>清除今日已完成</li>
              <li className="todo_menu_list" onClick={clearAllTodos}>清除所有</li>
            </ul>
          </div>
        </div>
      </form>
      <div className="todo_list" onClick={(e) => toggleTodoComplete(e)}>
        {todos.map(({ value, complete, editMode }, i) => (
          <div key={i} className="todo_item">
            {editMode ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  finishEidtTodo(i, editValueRef.current.value);
                }}
              >
                <input
                  type="text"
                  defaultValue={value}
                  ref={editValueRef}
                  autoFocus
                  onBlur={() => finishEidtTodo(i, editValueRef.current.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "#999",
                    border: "none",
                    outline: "none",
                    fontSize: "20px"
                  }}
                />
              </form>
            ) : (
              <div
                className="value"
                data-index={i}
                style={{
                  textDecoration: complete ? "line-through" : "",
                  color: complete ? "#999" : "#fff",
                  cursor: "pointer",
                  whiteSpace: "normal",
                  wordBreak: "break-all",
                  fontSize: "20px"
                }}
              >
                {value}
              </div>
            )}
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
                  <li
                    className="todo_menu_list"
                    onClick={() => completeTodo(i)}
                  >
                    已完成
                  </li>
                  <li className="todo_menu_list" onClick={() => editTodo(i)}>
                    编辑
                  </li>
                  <li className="todo_menu_list" onClick={() => clearTodo(i)}>
                    清除
                  </li>
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
