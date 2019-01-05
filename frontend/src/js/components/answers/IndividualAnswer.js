export class IndividualAnswer extends React.Component {
  render() {
    return (
      <div className="tile is-child">
        <div className="card">
          <header className="card-header has-background-grey-lighter">
            <p className="card-header-title">{this.props.text}</p>
            <a className="card-header-icon" onClick={() => this.props.openEditModal(this.props._id)}>
              <span className="icon">
                <i className="fas fa-pencil-alt"/>
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="content">
              <p>{this.props.answer}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

