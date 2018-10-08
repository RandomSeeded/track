import { BrowserRouter, NavLink, Route, Link } from 'react-router-dom';
import { RegeneratorRuntime } from '@babel/polyfill';
import { Nav, Content } from './components/Nav';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Content/>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
