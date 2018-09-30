import { BrowserRouter, NavLink, Route, Link } from 'react-router-dom';
import { RegeneratorRuntime } from '@babel/polyfill';
import { Nav } from './components/Nav';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Nav/>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
