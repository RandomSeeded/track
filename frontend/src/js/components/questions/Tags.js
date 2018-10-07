import { QUESTION_TYPES } from '../../definitions/QuestionTypes';
import * as uuid from 'uuid';

export class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '',
    };
  }
  render() {
    const temp = (
      <div className="field is-grouped">
        <div className="control">
          <input className="input is-expanded" placeholder="Add Tag" value={this.state.currentValue} onChange={this.handleInputChange.bind(this)}/>
        </div>
        <div className="control">
          <div className="tags">
            {_.map(this.props.tags, (value, listId) =>
              <span key={uuid.v4()} className="tag is-info is-medium">{value}<button className="delete is-small" onClick={this.props.handleQuestionTagsDelete.bind(this, listId)}/></span>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button" type="submit">Save Tag</button>
        </div>
      </div>
    );
    const debug = (
      <div class="field is-grouped is-grouped-multiline">
        {_.map(this.props.tags, (value, listId) =>
          <div className="control">
            <div className="tags has-addons">
              <span key={uuid.v4()} className="tag is-info">{value}<button className="delete" onClick={this.props.handleQuestionTagsDelete.bind(this)}></button></span>
            </div>
          </div>
        )}
      </div>
    );
    return (
      <form onSubmit={this.handleTagSave.bind(this)} hidden={this.props.type !== QUESTION_TYPES.VALUES}>
        {debug}
      </form>
    );
  }

  handleTagSave(e) {
    e.preventDefault();
    const newTag = this.state.currentValue;
    this.setState({ currentValue: '' });
    this.props.handleQuestionTagsSave(newTag);
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ 
      currentValue: e.target.value,
    });
  }
}
