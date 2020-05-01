/*
  action creator函数，用来创建action对象的函数模块
*/
export const addTodo = value => ({
  type: 'ADD_TODO',
  value: value
})

export const toggleTodo = index => ({
  type: 'TOGGLE_TODO',
  index: index
})

export const cleanAllTodos = () => ({
  type: 'CLEAN_ALL_TODOS'
})

export const getAllTodos = (todos) => ({
  type: 'GET_ALL_TODOS',
  todos: todos
})