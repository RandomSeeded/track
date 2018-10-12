import * as _ from 'lodash';
import * as axios from 'axios';

import { Tags } from './Tags';
import { QuestionType } from './QuestionType';
import { DEFAULT_QUESTION_TYPE, QUESTION_TYPES } from '../../definitions/QuestionTypes';

export class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    const question = this.props.question;
    const questionId = _.get(question, '_id');
    const tags = _.get(question, 'tags', []);
    const type = question.type || QUESTION_TYPES[DEFAULT_QUESTION_TYPE];
    this.state = {
      questionId,
      text: question.text,
      type,
      submitted: !!questionId,
      tags,
    };
  }
  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input value={this.state.text} onChange={this.handleQuestionTextChange.bind(this)} className="input"/>
            </div>
            <div className="control">
              <QuestionType handleQuestionTypeChange={this.handleQuestionTypeChange.bind(this)} type={this.state.type}/>
            </div>
            <div className="control">
              <button type="submit" className='button is-success'>{this.state.submitted ? "Save" : "Save Question" }</button>
            </div>
            {this.state.submitted && 
                <div className="control">
                  <a className="button is-danger is-outlined" onClick={this.handleDelete.bind(this)}>
                    <span>Delete</span>
                    <span className="icon">
                      <i className="fas fa-times"></i>
                    </span>
                  </a>
                </div>
            }
          </div>
          <Tags type={this.state.type} tags={this.state.tags} handleQuestionTagsSave={this.handleQuestionTagsSave.bind(this)} handleQuestionTagsDelete={this.handleQuestionTagsDelete.bind(this)}/>
        </form>
      </div>
    ); 
  }

  handleQuestionTextChange(event) {
    event.preventDefault();
    this.setState({
      text: event.target.value,
    });
  }

  handleQuestionTypeChange(event) {
    event.preventDefault();
    this.setState({
      type: event.target.value,
    });
  }

  handleQuestionTagsSave(newTag) {
    const tags = [...this.state.tags, newTag];
    this.setState({ tags });
  }

  handleQuestionTagsDelete(listId) {
    const tags = [...this.state.tags];
    tags.splice(listId, 1);
    this.setState({ tags });
  }

  async handleDelete(event) {
    event.preventDefault();
    await axios.delete(`http://localhost:17792/api/questions/${this.state.questionId}`);
    this.props.removeQuestion(this.props.listId);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const postQuestionsUrl = this.state.submitted
      ?  `http://localhost:17792/api/questions/${this.state.questionId}`
      : 'http://localhost:17792/api/questions/';

    const body = _.pickBy({
      text: this.state.text,
      type: this.state.type,
      tags: this.state.type === QUESTION_TYPES.VALUES && this.state.tags,
    });

    const res = await axios.post(postQuestionsUrl, body);

    this.setState({
      submitted: true,
    });
  }
}

