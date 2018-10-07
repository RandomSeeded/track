import * as _ from 'lodash';
import * as axios from 'axios';
import * as uuid from 'uuid';

import { QuestionType } from './QuestionType';
import { Tags } from './Tags';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    const question = this.props.question;
    const questionId = _.get(question, '_id');
    const tags = _.get(question, 'tags');
    this.state = {
      questionId,
      text: question.text,
      type: question.type,
      submitted: !!questionId,
    };
  }
  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input value={this.state.text} onChange={this.handleQuestionTextChange.bind(this)} className="input"/>
            </div>
            <div className="control">
              <QuestionType handleQuestionTypeChange={this.handleQuestionTypeChange.bind(this)} type={this.state.type}/>
            </div>
            <div className="control">
              <button type="submit" className='button is-success'>{this.state.submitted ? "Save" : "Save Question" }</button>
            </div>
            <div className="control">
              {this.state.submitted && <button onClick={this.handleDelete.bind(this)} className="button is-danger">Delete</button>}
            </div>
          </div>
          <div className="container">
            <Tags type={this.state.type}/>
          </div>
        </form>
      </div>
    ); 
  }

  handleQuestionTextChange(event) {
    this.setState({
      text: event.target.value,
    });
    event.preventDefault();
  }

  handleQuestionTypeChange(event) {
    this.setState({
      type: event.target.value,
    });
    event.preventDefault();
  }

  async handleDelete(event) {
    event.preventDefault();
    await axios.delete(`http://localhost:17792/api/questions/${this.state.questionId}`, {
    });
    this.props.removeQuestion(this.props.listId);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const postQuestionsUrl = this.state.submitted
      ?  `http://localhost:17792/api/questions/${this.state.questionId}`
      : 'http://localhost:17792/api/questions/';

    const res = await axios.post(postQuestionsUrl, {
      text: this.state.text,
      type: this.state.type,
    });

    this.setState({
      submitted: true,
    });
  }
}

class NewQuestionButton extends React.Component {
  render() {
    return <button onClick={this.props.addQuestion} className="button is-info">New Question</button>
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
        <div>
          {_.map(this.state.questions, (question, i) =>
            <QuestionForm question={question} key={uuid.v4()} listId={i} removeQuestion={this.removeQuestion.bind(this)}/>
          )}
        </div>
        <div className="container">
          <NewQuestionButton addQuestion={this.addQuestion.bind(this)}/>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:17792/api/questions');
    const questions = await res.json();
    this.setState({
      questions,
    });
  }

  async addQuestion() {
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

