import { BrowserRouter, NavLink, Route, Link } from 'react-router-dom';
import { Today } from './Today';
import { Questions } from './Questions';
import { Answers } from './Answers';

export class Nav extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/today">Today</Link>
          <Link to="/questions">Questions</Link>
          <Link to="/answers">Answers</Link>
        </nav>
        <div>
          <Route path="/today" component={Today}/>
          <Route path="/questions" component={Questions}/>
          <Route path="/answers" component={Answers}/>
        </div>
      </div>
    );
  }
}

