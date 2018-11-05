export class IndividualAnswer extends React.Component {
  render() {
    return (
      <div className="tile is-child">
        <div className="card">
          <header className="card-header has-background-grey-lighter">
            <p className="card-header-title">{this.props.text}</p>
            <a className="card-header-icon">
              <span className="icon">
                <i className="fas fa-angle-down"/>
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

