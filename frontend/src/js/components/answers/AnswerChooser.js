import { format } from 'date-fns';

export class AnswerChooser extends React.Component {
  render() {
    const currentDate = format(Number(this.props.currentDate), 'MM/DD/YY hh:mm A');
    return (
      <div className="level is-mobile">
        <div className="buttons has-addons level-item">
          <a className="button" disabled={this.props.isFirstDate} onClick={this.props.handlePrevDate}>
            <span className="icon">
              <i className="fas fa-chevron-left"/>
            </span>
          </a>
          <span className="button is-primary">{currentDate}</span>
          <a className="button" disabled={this.props.isLastDate} onClick={this.props.handleNextDate}>
            <span className="icon">
              <i className="fas fa-chevron-right"/>
            </span>
          </a>
        </div>
      </div>
    );
  }
}
