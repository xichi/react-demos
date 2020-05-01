import { createStore } from 'redux';
import todos from '../reducer/todo';

const store = createStore(todos)

export default store