import * as _ from 'lodash';
import * as axios from 'axios';
import * as uuid from 'uuid';

import { QuestionForm } from './QuestionForm';

class NewQuestionButton extends React.Component {
  render() {
    return (
      <a className="button is-primary is-large" onClick={this.props.addQuestion}>
        <span className="icon">
          <i className="fas fa-plus"/>
        </span>
      </a>
    );
  }
}

export class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  render() {
    return (
      <div className="section">
        {_.map(this.state.questions, (question, i) =>
          <QuestionForm question={question} key={uuid.v4()} listId={i} removeQuestion={this.removeQuestion.bind(this)}/>
        )}
        <NewQuestionButton addQuestion={this.addQuestion.bind(this)}/>
      </div>
    );
  }

  async componentDidMount() {
    const res = await fetch('/api/questions');
    const questions = await res.json();
    this.setState({
      questions,
    });
  }

  addQuestion() {
    this.setState({
      questions: [...this.state.questions, { text: 'Whats your question?' }],
    });
  }

  async removeQuestion(listId) {
    const questions = [...this.state.questions];
    questions.splice(listId, 1);
    this.setState({
      questions,
    });
  }
}

