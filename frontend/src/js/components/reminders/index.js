import * as _ from 'lodash';
import * as axios from 'axios';

import { AsYouType } from 'libphonenumber-js';

export class RetriesFields extends React.Component {
  render() {
    if (!this.props.retriesEnabled) {
      return null;
    }

    return (
      <div className="field">
        <label className="label">Number of follow-ups?</label>
        <input className="input" onChange={this.props.handleMaxRetriesChange} value={this.props.maxRetries} placeholder="+1 234 567 8901"/>
      </div>
    );
    //         <div className="field">
    //           <label className="label">How long to snooze between reminders?</label>
    //           <input className="input" onChange={this.handleRetryTimeoutChange.bind(this)} value={phoneNumber} placeholder="+1 234 567 8901"/>
    //         </div>
  }
}

export class Reminders extends React.Component {
  constructor(props) {
    super(props);
    // TODO (nw): you need to be setting state of the enable/disable bit here.
    this.state = {
      phoneNumber: '',
      retryTimeout: 0,
      maxRetries: 0,
      submitting: false,
      modified: false,
      retriesEnabled: false,
    };
  }

  render() {
    const phoneNumber = new AsYouType().input(this.state.phoneNumber);
    return (
      <div>
        <div className="section">
          <div className="box">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="field">
                <label className="label">What's your phone #?</label>
                <input className="input" onChange={this.handlePhoneNumChange.bind(this)} value={phoneNumber} placeholder="+1 234 567 8901"/>
              </div>
              <div className="field">
                <label className="label">Send reminder follow-ups?</label>
                <div className="select">
                  <select onChange={this.handleRetryEnableChange.bind(this)}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </div>
              <RetriesFields 
                retriesEnabled={this.state.retriesEnabled}
                handleMaxRetriesChange={this.handleMaxRetriesChange.bind(this)}
                maxRetries={this.state.maxRetries}
              />
              <div className="field">
                <button className={`button is-primary ${this.state.submitting && 'is-loading'}`} disabled={!this.state.modified} type="submit">Save</button>
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

  handlePhoneNumChange(event) {
    event.preventDefault();
    const phoneNumber = event.target.value;
    this.setState({
      phoneNumber,
      modified: true,
    });
  }

  handleRetryEnableChange(event) {
    const [maxRetries, retryTimeout, retriesEnabled] = event.target.value === 'Yes' ? [1, 1, true] : [0, 0, false];
    this.setState({ maxRetries, retryTimeout, retriesEnabled, modified: true });
  }

  handleRetryTimeoutChange(event) {
    event.preventDefault();
    const retryTimeout = event.target.value;
    this.setState({
      retryTimeout,
      modified: true,
    });
  }

  handleRetryTimeoutChange(event) {
    event.preventDefault();
    const retryTimeout = event.target.value;
    this.setState({
      retryTimeout,
      modified: true,
    });
  }

  handleMaxRetriesChange(event) {
    event.preventDefault();
    const maxRetries = event.target.value;
    this.setState({
      maxRetries,
      modified: true,
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

  // TODO (nw): you also need to set the enable/disable bit here (depending on what we get)
  async componentDidMount() {
    const res = await fetch('/api/users/phone-number');
    const { phoneNumber, attempt, maxRetries, retryTimeout } = await res.json();
    this.setState({
      phoneNumber,
      attempt,
      maxRetries,
      retryTimeout,
      modified: false,
    });
  }
}
