import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

console.log('Hello::', Hello);

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<any, any> {
  state = {
    list: []
  };

  componentDidMount() {
    const state = this.state;

    for (let i = 0; i < 20; i++) {
      state.list.push({ id: `id_${i}` });
    }
    this.setState(state);
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.state.list.map((item, index) => {
          return (
            <Hello>
              <div id={`id_${index}`} key={index} className={`item`}>
                {item.id}
              </div>
            </Hello>
          );
        })}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
