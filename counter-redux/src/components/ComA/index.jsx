import React from 'react';
import { connect } from 'react-redux';
import { addCount } from '../../store/action';

function ComA(props){
  const { sendAction } = props;
  return(
    <button onClick={sendAction}>+</button>
  )
}

const mapDispatchToProps = (dispatch) => ({
  sendAction: ()=>{
    dispatch(addCount())
  }
})

export default connect(null, mapDispatchToProps)(ComA);