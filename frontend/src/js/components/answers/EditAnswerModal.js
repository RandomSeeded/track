export class EditAnswerModal extends React.Component {
  render() {
    return (
      <div className={`modal ${this.props.opened && 'is-active'}`}>
        <div className="modal-background" onClick={this.props.closeEditModal}/>
        <div className="modal-content">
          <div className="box">
            <div className="field">
              <label className="label">This modal hasn't been implemented yet</label>
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button className="button is-primary">Go Back</button>
              </div>
              <div className="control">
                <button className="button is-danger">Confirm Delete</button>
              </div>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.props.closeEditModal}/>
      </div>
    );
  }
};
