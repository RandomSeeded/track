import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import { Today } from './today';
import { Questions } from './questions';
import { Answers } from './answers';

class StyledLink extends React.Component {
  render() {
    return (
      <Link className={`navbar-item is-tab ${this.props.pathname === this.props.to && 'is-active'}`} to={this.props.to} onClick={this.props.handleLinkClick}>{this.props.text}</Link>
    );
  }
}

class Nav extends React.Component {
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
            <Link to="/today" className="navbar-item is-tab" onClick={this.handleLinkClick.bind(this)}>[Logo Goes Here]</Link>
            <a role="button" className={`navbar-burger ${this.state.menuIsOpen && 'is-active'}`} aria-label="menu" aria-expanded="false" onClick={this.handleBurgerClick.bind(this)}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarBasicExample" className={`navbar-menu ${this.state.menuIsOpen && 'is-active'}`}>
            <div className="navbar-start">
              <StyledLink to="/today" text="Today's Questions" pathname={this.props.location.pathname} handleLinkClick={this.handleLinkClick.bind(this)}/>
              <StyledLink to="/questions" text="Edit Questions" pathname={this.props.location.pathname} handleLinkClick={this.handleLinkClick.bind(this)}/>
              <StyledLink to="/answers" text="View Answers" pathname={this.props.location.pathname} handleLinkClick={this.handleLinkClick.bind(this)}/>
            </div>
          </div>
        </nav>
        <div>
          <Route exact path="/" component={Today}/>
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

export const NavWithRouter = withRouter(Nav);
