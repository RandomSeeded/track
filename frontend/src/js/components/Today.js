import * as _ from 'lodash';
import * as axios from 'axios';

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <label>{this.props.question.text}</label>
        <select onChange={this.props.handleChange}>
          {_.map(_.range(10), i => <option key={i}>{i}</option>)}
        </select>
      </div>
    );
  }
}

class SubmitButton extends React.Component {
  render() {
    const disable = _.isEmpty(this.props.questions) || _.some(this.props.questions, question => !_.has(question, 'answer'));
    return (<input type="submit" value="Answer" disabled={disable}/>);
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
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.questions.map((question, i) =>
          <IndividualQuestion question={question} key={i} handleChange={this.handleChange.bind(this, i)}/>
        )}
        <SubmitButton questions={this.state.questions}/>
      </form>
    );
    const allDone = (
      <AllDone/>
    );
    const html = this.state.done ? allDone : form;
    return html;
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:17792/api/questions');
    const questions = await res.json();

    // Initialize answers to 0 - enables submit button immediately
    _.each(questions, question => {
      question.answer = '0';
    });

    this.setState({
      questions,
    });
  }

  handleChange(i, event) {
    const questions = this.state.questions;
    questions[i].answer = event.target.value;
    this.setState({
      questions,
    });
  }

  async handleSubmit(event) {
    _.each(this.state.questions, async question => {
      const body = {
        questionId: question._id,
        answer: question.answer,
      }
      await axios.post('http://localhost:17792/api/answers', body);
    });
    event.preventDefault();
    this.setState({ done: true });
  }
}

