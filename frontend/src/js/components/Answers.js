import * as _ from 'lodash';

class ListElement extends React.Component {
  render() {
    return <li>{this.props.answer.answer}</li>
  }
}

export class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
  }
  render() {
    return _.isEmpty(this.state.answers) ? <p>Loading</p> : (
      <ul>
        {_.map(this.state.answers, (answer, i) =>
          <ListElement answer={answer} key={i}/>
        )}
      </ul>
    );
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:17792/api/answers');
    const answers = await res.json();
    this.setState({
      answers,
    });
  }
}
