import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import TodoForm from "./TodoForm.jsx";
import { toggleTodo, addTodo, cleanAllTodos, getAllTodos } from '../store/actions';

function Todo(props) {
  const {todos, toggleTodo, addTodo, cleanAllTodos, getAllTodos} = props;

  useEffect(() => {
    const initTodos = JSON.parse(localStorage.getItem("Todos"));
    if (initTodos) getAllTodos(initTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
    return () => {
      localStorage.removeItem("Todos");
    };
  }, [todos]);


  const renderCleanBtn = ()=>{
    return (<button onClick={cleanAllTodos}>clean up</button>)
  }

  return (
    <div>
      <TodoForm
        children={renderCleanBtn}
        onSubmit={(value) => addTodo(value)}
      ></TodoForm>
      <div  style={{ marginTop: "30px" }}>
        {todos.map(({ value, complete }, i) => (
          <div
            key={i}
            onClick={() => toggleTodo(i)}
            style={{ textDecoration: complete ? "line-through" : "" }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: index => dispatch(toggleTodo(index)),
  addTodo: value => dispatch(addTodo(value)),
  cleanAllTodos: () => dispatch(cleanAllTodos()),
  getAllTodos: todos => dispatch(getAllTodos(todos))
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
