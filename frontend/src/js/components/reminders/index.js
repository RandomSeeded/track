import * as _ from 'lodash';
import * as axios from 'axios';

export class Reminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      submitting: false,
    };
  }

  render() {
    return (
      <div>
        <div className="section">
          <div className="box">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="field">
                <label className="label">What's your phone #?</label>
                <input className="input" onChange={this.handleChange.bind(this)} value={this.state.phoneNumber} placeholder="+1 234 567 8901"/>
              </div>
              <div className="field">
                <button className={`button is-primary ${this.state.submitting && 'is-loading'}`} type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
        <div className="section">
          <p>We'll send you a reminder to fill out your questions every day at 6PM EST.</p>
        </div>
      </div>
    );
  }

  handleChange(event) {
    event.preventDefault();
    const phoneNumber = event.target.value;
    this.setState({
      phoneNumber,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submitting: true,
    });
    const phoneNumber = this.state.phoneNumber;
    const body = { phoneNumber };
    await axios.post('/api/users/phone-number', body);
    this.setState({
      submitting: false,
    });
  }
}
