import React, { useState, useRef, useEffect } from "react";
import { ReactSVG } from "react-svg";
import "./TodoWrap.css";
import "./TodoList.css";

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    resetValue: () => setValue(""),
  };
};

function TodoWrap() {
  const [tabs, setTabs] = useState(["Today", "All", "Done"]);
  const [currentTab, setCurrentTab] = useState(0);
  const [allTodos, setAllTodos] = useState([[], [], []]);
  const [todos, setTodos] = useState([]);
  const [tabModal, setTabModal] = useState(false);
  const [tabBoxShown, setTabBoxShown] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const { resetValue, ...textObj } = useInputValue("");
  const { resetValue: resetTabValue, ...textTabObj } = useInputValue("");
  const editValueRef = useRef();

  useEffect(() => {
    document.addEventListener("click", () => {
      setMenuShown(false);
      setTabBoxShown(false);
      setTabModal(false);
    });
  });

  //存入获取localStorage
  useEffect(() => {
    const loadTodos = async () => {
      const initTodos = await JSON.parse(localStorage.getItem("TodoList"));
      if (initTodos) {
        setAllTodos(initTodos);
      }
    }

    loadTodos();
    const initTabIndex = localStorage.getItem("CurrentTab");
    const initTabs = JSON.parse(localStorage.getItem("Tabs"));
    //const initTodos = JSON.parse(localStorage.getItem("TodoList"));
    if(initTabs){
      setTabs(initTabs);
    }
    if(initTabIndex){
      setCurrentTab(initTabIndex);
      setTodos(allTodos[currentTab]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(allTodos));
    localStorage.setItem("Tabs", JSON.stringify(tabs));
    localStorage.setItem("CurrentTab", currentTab);
    return () => {
      localStorage.removeItem("TodoList");
      localStorage.removeItem("Tabs");
      localStorage.removeItem("CurrentTab");
    };
  }, [allTodos, tabs, currentTab]);

  useEffect(() => {
    setAllTodos(allTodos.map((item, i) => (i === currentTab ? todos : item)));
  }, [todos]);

  //tab-menu
  const clearTab = (i) => {
    setTabs(tabs.slice(0, i).concat(tabs.slice(i + 1)));
    setAllTodos(allTodos.slice(0, i).concat(allTodos.slice(i + 1)));
  };

  const addTab = (value) => {
    setTabs(tabs.concat(value));
    setAllTodos(allTodos.concat([[]]));
  };

  const changeTabs = (i) => {
    setCurrentTab(i);
    setTodos(allTodos[i]);
  };

  //list-menu
  const clearAllTodos = () => {
    setTodos([]);
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => todo.complete === false));
  };

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
    <div>
      <ul className="todo-tab-wrap">
        <li className="todo-current-tab">
          <span>{tabs[currentTab]}</span>
          <span
            className="todo-tab-btn"
            style={{
              cursor: "pointer",
              backgroundColor: tabBoxShown ? "#666" : "",
            }}
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation();
              setTabBoxShown(!tabBoxShown);
            }}
          >
            ∨
          </span>
        </li>
        {tabBoxShown ? (
          <ul className="todo-tab-box">
            {tabs.map((tab, i) => (
              <li
                key={i}
                className="todo-tab-item"
                onClick={() => changeTabs(i)}
              >
                {tab}
              </li>
            ))}

            <li
              className="todo-tab-item"
              style={{
                color: "#999",
              }}
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                setTabBoxShown(false);
                setTabModal(true);
              }}
            >
              + New List
            </li>
          </ul>
        ) : null}
      </ul>
      <div className="todo_section">
        <form
          className="todo_form"
          onSubmit={(e) => {
            e.preventDefault();
            setTodos([
              {
                value: textObj.value,
                complete: false,
                editMode: false,
                category: [],
              },
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
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                setMenuShown(!menuShown);
              }}
              src="http://cloud.xichi.xyz/icon/setting.svg"
            ></ReactSVG>
            {menuShown ? (
              <div className="todo_menu">
                <ul>
                  <li className="todo_menu_list" onClick={clearCompletedTodos}>
                    清除今日已完成
                  </li>
                  <li className="todo_menu_list" onClick={clearAllTodos}>
                    清除所有
                  </li>
                </ul>
              </div>
            ) : null}
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
                      fontSize: "20px",
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
                    fontSize: "20px",
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
      {tabModal ? (
        <div className="tab-Modal-wrap">
          <div
            className="tab-Modal"
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation();
              setTabModal(true);
            }}
          >
            <ul>
              {tabs.map((tab, i) => (
                <li key={i}>
                  <span>{tab}</span>
                  <span onClick={() => clearTab(i)}>x</span>
                </li>
              ))}
              <li>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTab(textTabObj.value);
                    resetTabValue();
                  }}
                >
                  <input
                    className="input-box"
                    placeholder="+ New List"
                    autoFocus
                    {...textTabObj}
                  ></input>
                </form>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TodoWrap;
