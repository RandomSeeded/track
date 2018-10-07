import * as _ from 'lodash';
import { QUESTION_TYPES } from '../../definitions/QuestionTypes';

class RatingQuestion extends React.Component {
  render() {
    return (
      <div className="field">
        <label className="label">{this.props.question.text}</label>
        <div className="select">
          <select onChange={this.props.handleChange}>
            {_.map(_.range(10), i => <option key={i}>{i}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

class NumericQuestion extends React.Component {
  render() {
    return (
      <div className="field">
        <label className="label">{this.props.question.text}</label>
        <input type="number" placeholder="42" className="input" onChange={this.props.handleChange}/>
      </div>
    );
  }
}

export class IndividualQuestion extends React.Component {
  render() {
    switch(this.props.question.type) {
      case QUESTION_TYPES.RATING:
        return <RatingQuestion handleChange={this.props.handleChange} question={this.props.question}/>;
      case QUESTION_TYPES.NUMERIC:
        return <NumericQuestion handleChange={this.props.handleChange} question={this.props.question}/>;
      default:
        return <p>hi</p>
    }
  }
}

