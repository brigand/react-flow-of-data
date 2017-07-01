import React from 'react';
import {connect} from 'react-redux';
import {barAction} from '../actions/barActions';

export class BarContainer extends React.Component {
  render() {
    return <div />
  }
}


const mapState = (state) => ({
  x: state.foo,
});

const mapDispatch = (dispatch) => ({
  onFoo: () => dispatch({type: 'FOO'}),
  onBar: () => dispatch(barAction(null)),
});

export default connect(mapState, mapDispatch)(BarContainer);

