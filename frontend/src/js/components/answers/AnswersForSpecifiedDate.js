import * as _ from 'lodash';

import { IndividualAnswer } from './IndividualAnswer';

class ColumnOfAnswers extends React.Component {
  render() {
    return (
      <div className="tile is-parent is-4 is-vertical">
        {_.map(this.props.answers, (answer, i) =>
          <IndividualAnswer key={answer._id} text={answer.question.text} answer={answer.answer}/>
        )}
      </div>
    );
  }
}

export class AnswersForSpecifiedDate extends React.Component {
  render() {
    // TODO (nw): sort these by the order that they're on on the user page? Not sure. Aka question added at.
    const sortedAnswers = _.sortBy(this.props.answers, 'question.text');
    const [firstCol, secondCol, thirdCol] = _.transform(sortedAnswers, (acc, answer, i) => {
      acc[i%3].push(answer);
    }, [[],[],[]]);
    return (
      <div className="tile is-ancestor">
        <ColumnOfAnswers answers={firstCol}/>
        <ColumnOfAnswers answers={secondCol}/>
        <ColumnOfAnswers answers={thirdCol}/>
      </div>
    );
  }
}

