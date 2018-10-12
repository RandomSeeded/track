import * as _ from 'lodash';
import * as uuid from 'uuid';

export class AnswersForQuestion extends React.Component {
  render() {
    return (
      <ul>
        {_.map(this.props.answers, answer =>
          <li key={uuid.v4()}>{answer.answer}</li>
        )}
      </ul>
    );
  }
}

export class QuestionDisplay extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.text}</p>
        <AnswersForQuestion answers={this.props.answers}/>
      </div>
    );
  }
}

export class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsWithAnswers: [],
    };
  }
  render() {
    return (
      <ul>
        {_.map(this.state.questionsWithAnswers, question =>
          <li key={uuid.v4()}><QuestionDisplay text={question.text} answers={question.answers}/></li>
        )}
      </ul>
    );
  }

  async componentDidMount() {
    const questionsWithAnswers = await (await fetch('http://localhost:17792/api/answers/full')).json();
    console.log('questionsWithAnswers', questionsWithAnswers);
    this.setState({
      questionsWithAnswers,
    });
  }
}
