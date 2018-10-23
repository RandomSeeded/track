import * as _ from 'lodash';
import * as axios from 'axios';

import { IndividualQuestion } from './IndividualQuestion';
import { QUESTION_TYPES } from '../../definitions/QuestionTypes';

class SubmitButton extends React.Component {
  render() {
    const disable = _.isEmpty(this.props.questions) || _.some(this.props.questions, question => !_.has(question, 'answer'));
    return (<button type="submit" disabled={disable} className="button is-success">Answer</button>);
  }
}

class AllDone extends React.Component {
  render() {
    return <p>All Done</p>;
  }
}

export class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
    this.state.done = false;
  }
  render() {
    const form = (
      <div className="section">
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.questions.map((question, i) =>
            <IndividualQuestion question={question} key={i} handleChange={this.handleChange.bind(this, i)}/>
          )}
          <SubmitButton questions={this.state.questions}/>
        </form>
      </div>
    );
    const allDone = (
      <AllDone/>
    );
    const html = this.state.done ? allDone : form;
    return html;
  }

  initializeQuestions(questions) {
    _.each(questions, question => {
      switch (question.type) {
        case QUESTION_TYPES.RATING:
          return question.answer = '0';
        case QUESTION_TYPES.VALUES:
          return question.answer = _.first(question.tags);
        case QUESTION_TYPES.CHECKMARK:
          return question.answer = 'Yes';
        default:
          return; // No default answer set for freeform inputs
      }
    });
    this.setState({
      questions,
    });
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:17792/api/questions');
    const questions = await res.json();

    this.initializeQuestions(questions);
  }

  handleChange(i, event) {
    const questions = this.state.questions;
    questions[i].answer = event.target.value;
    this.setState({
      questions,
    });
  }

  async handleSubmit(event) {
    const answeredAt = Date.now();
    _.each(this.state.questions, async question => {
      const body = {
        questionId: question._id,
        answer: question.answer,
        answeredAt,
      }
      await axios.post('http://localhost:17792/api/answers', body);
    });
    event.preventDefault();
    this.setState({ done: true });
  }
}

