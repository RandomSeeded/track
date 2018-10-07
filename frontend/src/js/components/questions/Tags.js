import { QUESTION_TYPES } from '../../definitions/QuestionTypes';
export class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [1,2,3],
      currentValue: '',
    };
  }
  render() {
    return (
      <form onSubmit={this.handleTagSave.bind(this)} hidden={this.props.type !== QUESTION_TYPES.VALUES}>
        <div className="field is-grouped">
          <div className="control">
            <input className="input is-expanded" placeholder="Add Tag" value={this.state.currentValue} onChange={this.handleInputChange.bind(this)}/>
          </div>
          <div className="control">
            <div className="tags">
              {_.map(this.state.values, (value, i) =>
                <span key={i} className="tag is-info is-medium">{value}<button className="delete is-small"/></span>
              )}
            </div>
          </div>
          <div className="control">
            <button className="button" type="submit">Save Tag</button>
          </div>
        </div>
      </form>
    );
  }

  handleTagSave(e) {
    e.preventDefault();
    const newValues = [...this.state.values, this.state.currentValue];
    this.setState({
      values: newValues,
      currentValue: '',
    });
  }

  handleInputChange(e) {
    this.setState({ 
      currentValue: e.target.value,
    });
    e.preventDefault();
  }
}
