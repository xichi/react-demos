import { createStore } from 'redux';

const defaultState = {
  modalShown: false
}

const reducer = (state = defaultState, action) =>{
  console.log(action, state);
  switch (action.type){
    case 'TOGGLE_MODAL_SHOWN':
      return Object.assign({}, state, action)
    default:
      return state  
  }
}

const store = createStore(reducer)

export default store