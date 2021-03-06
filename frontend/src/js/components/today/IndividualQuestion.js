import * as _ from 'lodash';
import * as uuid from 'uuid';

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
        <input type="number" placeholder="42" className="input" step="any" onChange={this.props.handleChange}/>
      </div>
    );
  }
}

class TagsQuestion extends React.Component {
  render() {
    return (
      <div className="field">
        <label className="label">{this.props.question.text}</label>
        <div className="select">
          <select onChange={this.props.handleChange}>
            {_.map(this.props.question.tags, (tag, i) =>
              <option key={i}>{tag}</option>
            )}
          </select>
        </div>
      </div>
    );
  }
}

class FreeformQuestion extends React.Component {
  render() {
    return (
      <div className="field">
        <label className="label">{this.props.question.text}</label>
        <textarea className="textarea" placeholder="What's up?" onChange={this.props.handleChange}/>
      </div>
    );
  }
}

class BinaryQuestion extends React.Component {
  render() {
    return (
      <div className="field">
        <label className="label">{this.props.question.text}</label>
        <div className="select">
          <select onChange={this.props.handleChange}>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
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
      case QUESTION_TYPES.VALUES:
        return <TagsQuestion handleChange={this.props.handleChange} question={this.props.question}/>;
      case QUESTION_TYPES.FREEFORM:
        return <FreeformQuestion handleChange={this.props.handleChange} question={this.props.question}/>;
      case QUESTION_TYPES.CHECKMARK:
        return <BinaryQuestion handleChange={this.props.handleChange} question={this.props.question}/>;
      default:
        return <p>[Unsupported question type]</p>
    }
  }
}

