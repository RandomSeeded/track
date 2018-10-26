import * as _ from 'lodash';

export class Reminders extends React.Component {
  render() {
    return (
      <div>
        <div className="section">
          <form>
            <div className="field">
              <label className="label">What's your phone #?</label>
              <input className="input"/>
            </div>
            <div className="field">
              <button className="button is-primary">Save</button>
            </div>
          </form>
        </div>
        <div className="section">
          <p>We'll send you a reminder to fill out your questions every day at 6PM EST.</p>
        </div>
      </div>
    );
  }
}
