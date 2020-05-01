const defaultState = {
  todos: []
};

const todos = (state = defaultState, action) => {
  const todos = state.todos;
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...todos, {
          value: action.value,
          complete: false,
        }]
      }
    case 'TOGGLE_TODO':
      return {
        todos: todos.map((todo, i) =>
          (i === action.index)
            ? { ...todo, complete: !todo.complete }
            : todo
        )
      }
    case 'CLEAN_ALL_TODOS':
      return {
        todos: []
      };
    case 'GET_ALL_TODOS':
      return {
        todos: action.todos
      };
    default:
      return state;
  }
}

export default todos;