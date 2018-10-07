import * as _ from 'lodash';

import { QUESTION_TYPES } from '../../definitions/QuestionTypes';

export class QuestionType extends React.Component {
  render() {
    return (
      <div className="select">
        <select onChange={this.props.handleQuestionTypeChange} value={this.props.type}>
          {!this.props.type && <option disabled selected>Question Type</option>}
          {_.map(QUESTION_TYPES, (questionType, i) =>
            <option key={i}>{questionType}</option>
          )}
        </select>
      </div>
    );
  }
}
