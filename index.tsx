import * as React from 'react';
import { render } from 'react-dom';
import ExposureWatch from './ExposureWatch';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends React.Component<any, any> {
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
            <ExposureWatch>
              <div id={`id_${index}`} key={index} className={`item`}>
                {item.id}
              </div>
            </ExposureWatch>
          );
        })}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
