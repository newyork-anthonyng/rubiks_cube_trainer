import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  decrement = () => {
    this.setState(prevState => ({
      count: Math.max(prevState.count - 1, 0)
    }));
  }

  render() {
    return (
      <div>
         <h1>Count: {this.state.count}</h1>
         <button onClick={this.increment}>Add 1</button>
         <button onClick={this.decrement}>Subtract 1</button>
      </div>
    );
  }
}

export default App;
