import React from 'react';
import { connect } from 'react-redux';

function ComB(props){
  const {count} = props;
  return (<div>{count}</div>)
}

const mapStateToProps = (state)=>({
  count: state.count
})

export default connect(mapStateToProps)(ComB);