import * as _ from 'lodash';

class IndividualQuestion extends React.Component {
  // Bring individual questions down into here
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div key={this.props.key}>
        <label>{this.props.question.text}</label>
        <select onChange={this.props.handleChange}>
          {_.map(_.range(10), i => <option key={i}>{i}</option>)}
        </select>
      </div>
    );
  }
}

export class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }
  render() {
    const html = (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.questions.map((question, i) =>
          <IndividualQuestion question={question} key={i} handleChange={this.handleChange.bind(this, i)}/>
        )}
        <input type="submit" value="Answer"/>
      </form>
    );
    return html;
  }
  async componentDidMount() {
    const res = await fetch('http://localhost:17792/api/questions');
    const questions = await res.json();
    this.setState({
      questions,
    });
  }
  handleChange(i, event) {
    const questions = this.state.questions;
    questions[i].value = event.target.value;
    this.setState({
      questions,
    });
  }
  handleSubmit(event) {
    // Should be done as bulk, but NBD
    _.each(this.state.questions, question => {
    });
    const res = await fetch('http://localhost:17792/api/answers');
    event.preventDefault();
  }
}

