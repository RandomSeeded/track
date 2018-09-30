import * as _ from 'lodash';
import * as axios from 'axios';
import * as uuid from 'uuid';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    const questionId = _.get(this.props.question, '_id');
    this.state = {
      questionId,
      text: this.props.question.text,
      submitted: !!questionId,
    };
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input value={this.state.text} onChange={this.handleChange.bind(this)}/>
        <button type="submit">{this.state.submitted ? "Edit" : "Add New Question" }</button>
        {this.state.submitted && <button onClick={this.handleDelete.bind(this)}>Delete</button>}
      </form>
    ); 
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
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
    if (this.state.submitted) {
      return await axios.post(`http://localhost:17792/api/questions/${this.state.questionId}`, {
        text: this.state.text,
      });
    }
    const res = await axios.post('http://localhost:17792/api/questions/', {
      text: this.state.text,
    });
    this.setState({
      submitted: true,
    });
  }
}

class NewQuestionButton extends React.Component {
  render() {
    return <button onClick={this.props.addQuestion}>New Question</button>
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
      <div>
        <ul>
          {_.map(this.state.questions, (question, i) =>
            <QuestionForm question={question} key={uuid.v4()} listId={i} removeQuestion={this.removeQuestion.bind(this)}/>
          )}
        </ul>
        <NewQuestionButton addQuestion={this.addQuestion.bind(this)}/>
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

