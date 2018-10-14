import * as _ from 'lodash';
import { format, prase } from 'date-fns';

class AnswerChooser extends React.Component {
  render() {
    const currentDate = format(Number(this.props.currentDate), 'MM/DD/YY');
    return (
      <div className="level">
        <div className="buttons has-addons level-item">
          <span className="button is-large" disabled={this.props.isFirstDate} onClick={this.props.handlePrevDate}>{"<"}</span>
          <span className="button is-large is-primary">{currentDate}</span>
          <span className="button is-large" disabled={this.props.isLastDate} onClick={this.props.handleNextDate}>{">"}</span>
        </div>
      </div>
    );
  }
}

class IndividualAnswer extends React.Component {
  render() {
    // TODO (nw): sort these by the order that they're on on the user page? Not sure. Aka question added at.
    const sortedAnswers = _.sortBy(this.props.answers, 'question.text');
    return (
      <div>
        {_.map(sortedAnswers, (answer, i) => 
          <div className="box" key={i}>
            <div className="level">
              <div className="level-item">
                <h2 className="subtitle">{answer.question.text}</h2>
              </div>
            </div>
            <div className="level">
              <div className="level-item">
                <p>{answer.answer}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersWithQuestionsByDate: {},
      currentDateIndex: 0,
    };
  }
  render() {
    const dates = _.sortBy(_.keys(this.state.answersWithQuestionsByDate));
    const currentDate = dates[this.state.currentDateIndex];
    const isFirstDate = this.state.currentDateIndex === 0;
    const isLastDate = this.state.currentDateIndex === _.size(dates) - 1;
    return (
      <div className="section">
        <AnswerChooser currentDate={currentDate} handleNextDate={this.handleNextDate.bind(this)} handlePrevDate={this.handlePrevDate.bind(this)} isFirstDate={isFirstDate} isLastDate={isLastDate}/>
        <IndividualAnswer answers={this.state.answersWithQuestionsByDate[currentDate]}/>
      </div>
    );
  }

  handleNextDate() {
    const currentDateIndex = Math.min(this.state.currentDateIndex + 1, _.size(this.state.answersWithQuestionsByDate)-1);
    this.setState({
      currentDateIndex,
    });
  }

  handlePrevDate() {
    const currentDateIndex = Math.max(this.state.currentDateIndex - 1, 0);
    this.setState({
      currentDateIndex,
    });
  }

  async componentDidMount() {
    const answersWithQuestionsByDate = await (await fetch('http://localhost:17792/api/answers/by-date')).json();
    this.setState({
      answersWithQuestionsByDate,
      currentDateIndex: _.size(answersWithQuestionsByDate) -1,
    });
  }
}
