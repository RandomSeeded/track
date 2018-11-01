import * as _ from 'lodash';
import { format, prase } from 'date-fns';

class AnswerChooser extends React.Component {
  render() {
    const currentDate = format(Number(this.props.currentDate), 'MM/DD/YY hh:mm A');
    return (
      <div className="level is-mobile">
        <div className="buttons has-addons level-item">
          <a className="button" disabled={this.props.isFirstDate} onClick={this.props.handlePrevDate}>
            <span className="icon">
              <i className="fas fa-chevron-left"/>
            </span>
          </a>
          <span className="button is-primary">{currentDate}</span>
          <a className="button" disabled={this.props.isLastDate} onClick={this.props.handleNextDate}>
            <span className="icon">
              <i className="fas fa-chevron-right"/>
            </span>
          </a>
        </div>
      </div>
    );
  }
}

class IndividualAnswer extends React.Component {
  render() {
    // TODO (nw): sort these by the order that they're on on the user page? Not sure. Aka question added at.
    const sortedAnswers = _.sortBy(this.props.answers, 'question.text');
    const [firstCol, secondCol, thirdCol] = _.transform(sortedAnswers, (acc, answer, i) => {
      acc[i%3].push(answer);
    }, [[],[],[]]);
    return (
      <div className="tile is-ancestor">
        <div className="tile is-parent is-4 is-vertical">
          {_.map(firstCol, (answer, i) =>
            <article className="tile is-child notification">
              <p className="title">{answer.question.text}</p>
              <p className="subtitle">{answer.answer}</p>
            </article>
          )}
        </div>
        <div className="tile is-parent is-4 is-vertical">
          {_.map(secondCol, (answer, i) =>
            <article className="tile is-child notification">
              <p className="title">{answer.question.text}</p>
              <p className="subtitle">{answer.answer}</p>
            </article>
          )}
        </div>
        <div className="tile is-parent is-4 is-vertical">
          {_.map(thirdCol, (answer, i) =>
            <article className="tile is-child notification">
              <p className="title">{answer.question.text}</p>
              <p className="subtitle">{answer.answer}</p>
            </article>
          )}
        </div>
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
    if (_.isEmpty(this.state.answersWithQuestionsByDate)) {
      return (
        <div className="section">
          <div className="box">
            <p>Check back here after you've answered questions to review your previous answers!</p>
          </div>
        </div>
      );
    }
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
    const answersWithQuestionsByDate = await (await fetch('/api/answers/by-date')).json();
    this.setState({
      answersWithQuestionsByDate,
      currentDateIndex: _.size(answersWithQuestionsByDate) -1,
    });
  }
}
