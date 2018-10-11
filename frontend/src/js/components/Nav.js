import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import { Today } from './today';
import { Questions } from './questions';
import { Answers } from './answers';

class StyledLink extends React.Component {
  render() {
    return (
      <li className={this.props.pathname === this.props.to ? 'is-active': undefined}><Link to={this.props.to}>{this.props.text}</Link></li>
    );
  }
}

export const Content = withRouter(props => 
  <div>
    <nav>
      <div className="tabs is-centered">
        <ul>
          <StyledLink to="/today" text="Today" pathname={props.location.pathname}/>
          <StyledLink to="/questions" text="Questions" pathname={props.location.pathname}/>
          <StyledLink to="/answers" text="Answers" pathname={props.location.pathname}/>
        </ul>
      </div>
    </nav>
    <div>
      <Route path="/today" component={Today}/>
      <Route path="/questions" component={Questions}/>
      <Route path="/answers" component={Answers}/>
    </div>
  </div>
);
