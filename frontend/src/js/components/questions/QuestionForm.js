import * as _ from 'lodash';
import * as axios from 'axios';

import { Tags } from './Tags';
import { QuestionType } from './QuestionType';
import { DEFAULT_QUESTION_TYPE, QUESTION_TYPES } from '../../definitions/QuestionTypes';

class ConfirmDeleteModal extends React.Component {
  render() {
    return (
      <div className={`modal ${this.props.deleteModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={this.props.closeDeleteModal}>
        </div>
        <div className="modal-content">
          <div className="box">
            <div className="field">
              <label className="label">Are you sure you want to delete this question?</label>
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button className="button is-primary" onClick={this.props.closeDeleteModal}>Go Back</button>
              </div>
              <div className="control">
                <button className="button is-danger" onClick={this.props.handleDelete}>Confirm Delete</button>
              </div>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.props.closeDeleteModal}/>
      </div>
    );
  }
}

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
      deleteModalOpen: false,
      modified: false,
    };
  }
  render() {
    return (
      <div className="box">
        <ConfirmDeleteModal handleDelete={this.handleDelete.bind(this)} deleteModalOpen={this.state.deleteModalOpen} closeDeleteModal={this.closeDeleteModal.bind(this)}/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field is-grouped is-grouped-multiline">
            <div className="control is-expanded">
              <input value={this.state.text} onChange={this.handleQuestionTextChange.bind(this)} className="input"/>
            </div>
            <div className="control">
              <QuestionType handleQuestionTypeChange={this.handleQuestionTypeChange.bind(this)} type={this.state.type}/>
            </div>
            <div className="control">
              {!this.state.submitted &&
                  <button type="submit" className='button is-success'>Save Question</button>
              }
              {this.state.submitted &&
                  <button type="submit" className='button is-success' disabled={!this.state.modified}>Save</button>
              }
            </div>
            {this.state.submitted && 
                <div className="control">
                  <a className="button is-danger is-outlined" onClick={this.openDeleteModal.bind(this)}>
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

  openDeleteModal() {
    this.setState({
      deleteModalOpen: true,
      modified: true,
    });
  }

  closeDeleteModal() {
    this.setState({
      deleteModalOpen: false,
      modified: true,
    });
  }

  handleQuestionTextChange(event) {
    event.preventDefault();
    this.setState({
      text: event.target.value,
      modified: true,
    });
  }

  handleQuestionTypeChange(event) {
    event.preventDefault();
    this.setState({
      type: event.target.value,
      modified: true,
    });
  }

  handleQuestionTagsSave(newTag) {
    const tags = [...this.state.tags, newTag];
    this.setState({
      tags,
      modified: true,
    });
  }

  handleQuestionTagsDelete(listId) {
    const tags = [...this.state.tags];
    tags.splice(listId, 1);
    this.setState({
      tags,
      modified: true,
    });
  }

  async handleDelete(event) {
    this.setState({
      deleteModalOpen: false,
    });
    event.preventDefault();
    await axios.delete(`/api/questions/${this.state.questionId}`);
    this.props.removeQuestion(this.props.listId);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const postQuestionsUrl = this.state.submitted
      ?  `/api/questions/${this.state.questionId}`
      : '/api/questions/';

    const body = _.pickBy({
      text: this.state.text,
      type: this.state.type,
      tags: this.state.type === QUESTION_TYPES.VALUES && this.state.tags,
    });

    const res = await axios.post(postQuestionsUrl, body);

    this.setState({
      submitted: true,
      modified: false,
    });
  }
}

