export class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersWithQuestionsByDate: [],
    };
  }
  render() {
    // TODO [STOPPING POINT] - start to render answers for a specific date in a way that makes sense
    return (
      <p>Hi</p>
    );
  }

  async componentDidMount() {
    const answersWithQuestionsByDate = await (await fetch('http://localhost:17792/api/answers/by-date')).json();
  }
}
