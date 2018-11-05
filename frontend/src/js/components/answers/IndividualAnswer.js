export class IndividualAnswer extends React.Component {
  render() {
    return (
      <div className="tile is-child">
        <article className="message is-info">
          <div className="message-header">
            {this.props.text}
            <button className="delete"/>
          </div>
          <div className="message-body">
            {this.props.answer}
          </div>
        </article>
      </div>
    );
  }
}

