import React from 'react';

export default class FooComponent extends React.Component {
  render() {
    return (
      <div>
        Hello, {this.props.name}
      </div>
    );
  }
}

