import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import { Today } from './today';
import { Questions } from './questions';
import { Answers } from './answers';
import { FrontPage } from './frontPage';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }
  render() {
    return (
      <div>
        <nav className="navbar is-primary" role="navigation" aria-label="main-navigation">
          <div className="navbar-brand">
            <Link to="/today" className="navbar-item" onClick={this.handleLinkClick.bind(this)}>[Logo Goes Here]</Link>
            <a role="button" className={`navbar-burger ${this.state.menuIsOpen && 'is-active'}`} aria-label="menu" aria-expanded="false" onClick={this.handleBurgerClick.bind(this)}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarBasicExample" className={`navbar-menu ${this.state.menuIsOpen && 'is-active'}`}>
            <div className="navbar-start">
              <Link className="navbar-item" to="/questions" onClick={this.handleLinkClick.bind(this)}>Questions</Link>
              <Link className="navbar-item" to="/answers" onClick={this.handleLinkClick.bind(this)}>Answers</Link>
            </div>
          </div>
        </nav>
        <div>
          <Route exact path="/" component={FrontPage}/>
          <Route path="/today" component={Today}/>
          <Route path="/questions" component={Questions}/>
          <Route path="/answers" component={Answers}/>
        </div>
      </div>
    );
  }

  handleLinkClick() {
    const menuIsOpen = false;
    this.setState({
      menuIsOpen,
    });
  }

  handleBurgerClick() {
    const menuIsOpen = !this.state.menuIsOpen;
    this.setState({
      menuIsOpen,
    });
  }
}
