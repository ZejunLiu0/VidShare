import React, { Component } from 'react';

class profile extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      this.props.isAuthenticated && (
        <div>
          <img src={this.props.user.picture} alt={this.props.user.name} />
          <h2>Welcome! {this.props.user.name}</h2>
        </div>
      )
    );
  }
}

export default profile;