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
    return (
      <div>
        <div className="field is-grouped is-grouped-multiline" hidden={this.props.type !== QUESTION_TYPES.VALUES}>
          {_.map(this.props.tags, (value, listId) =>
            <div className="control" key={uuid.v4()}>
              <div className="tags has-addons">
                <span className="tag is-info">{value}<button className="delete" onClick={this.props.handleQuestionTagsDelete.bind(this, listId)}></button></span>
              </div>
            </div>
          )}
        </div>
        <div className="field is-grouped is-grouped-multiline">
          <div className="control">
            <input className="input is-expanded" placeholder="Add Tag" value={this.state.currentValue} onChange={this.handleInputChange.bind(this)}/>
          </div>
          <div className="control">
            <button className="button" type="submit" onClick={this.handleTagSave.bind(this)}>Save Tag</button>
          </div>
        </div>
      </div>
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
