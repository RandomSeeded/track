export class EditAnswerModal extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-background"/>
        <div className="modal-content">
          <div className="box">
            <div className="field">
              <label className="label">Thingy hmmmm</label>
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
        <button className="modal-close is-large" aria-label="close"/>
      </div>
    );
  }
};
