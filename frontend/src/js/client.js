import { BrowserRouter, NavLink, Route, Link } from 'react-router-dom';
import { RegeneratorRuntime } from '@babel/polyfill';
import { NavWithRouter } from './components/Nav';
import { FrontPage } from './components/frontPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  render() {
    return (
      <div>
        {!this.state.isAuthenticated &&
            <FrontPage/>
        }
        {this.state.isAuthenticated &&
            <BrowserRouter>
              <NavWithRouter/>
            </BrowserRouter>
        }
      </div>
    );
  }

  async componentDidMount() {
    const res = await fetch('/api/is-authenticated');
    const isAuthenticated = res.status === 200;
    this.setState({
      isAuthenticated,
    });
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
