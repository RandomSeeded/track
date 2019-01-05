import * as _ from 'lodash';

import { AnswerChooser } from './AnswerChooser';
import { AnswersForSpecifiedDate } from './AnswersForSpecifiedDate';
import { EditAnswerModal } from './EditAnswerModal';

export class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersWithQuestionsByDate: {},
      currentDateIndex: 0,
      editAnswerModalOpen: false,
    };
  }
  render() {
    if (_.isEmpty(this.state.answersWithQuestionsByDate)) {
      return (
        <div className="section">
          <div className="box">
            <p>Check back here after you've answered questions to review your previous answers!</p>
          </div>
        </div>
      );
    }
    const dates = _.sortBy(_.keys(this.state.answersWithQuestionsByDate));
    const currentDate = dates[this.state.currentDateIndex];
    const isFirstDate = this.state.currentDateIndex === 0;
    const isLastDate = this.state.currentDateIndex === _.size(dates) - 1;
    return (
      <div className="section">
        <AnswerChooser
          currentDate={currentDate}
          handleNextDate={this.handleNextDate.bind(this)}
          handlePrevDate={this.handlePrevDate.bind(this)}
          handleFirstDate={this.handleFirstDate.bind(this)}
          handleLastDate={this.handleLastDate.bind(this)}
          isFirstDate={isFirstDate}
          isLastDate={isLastDate}
        />
        <AnswersForSpecifiedDate answers={this.state.answersWithQuestionsByDate[currentDate]} openEditModal={this.openEditModal.bind(this)}/>
        <EditAnswerModal opened={this.state.editAnswerModalOpen} closeEditModal={this.closeEditModal.bind(this)}/>
      </div>
    );
  }

  handleFirstDate() {
    const currentDateIndex = 0;
    this.setState({ currentDateIndex });
  }

  handleLastDate() {
    const currentDateIndex = _.size(this.state.answersWithQuestionsByDate)-1;
    this.setState({ currentDateIndex });
  }

  handleNextDate() {
    const currentDateIndex = Math.min(this.state.currentDateIndex + 1, _.size(this.state.answersWithQuestionsByDate)-1);
    this.setState({ currentDateIndex });
  }

  handlePrevDate() {
    const currentDateIndex = Math.max(this.state.currentDateIndex - 1, 0);
    this.setState({ currentDateIndex });
  }

  openEditModal(answerId) {
    this.setState({
      editAnswerModalOpen: true,
    });
  }

  closeEditModal() {
    this.setState({
      editAnswerModalOpen: false,
    });
  }

  handleEdit() {
  }

  async componentDidMount() {
    const answersWithQuestionsByDate = await (await fetch('/api/answers/by-date')).json();
    this.setState({
      answersWithQuestionsByDate,
      currentDateIndex: _.size(answersWithQuestionsByDate) -1,
    });
  }
}
