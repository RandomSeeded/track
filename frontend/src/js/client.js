import { BrowserRouter, NavLink, Route, Link } from 'react-router-dom';
import { RegeneratorRuntime } from '@babel/polyfill';
import { Nav } from './components/Nav';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Nav/>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
