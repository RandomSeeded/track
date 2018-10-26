import * as _ from 'lodash';

export class Reminders extends React.Component {
  render() {
    return (
      <div>
        <div className="section">
          <form>
            <div className="field is-grouped is-grouped-multiline">
              <label className="label">What's your phone #?</label>
              <input className="input"/>
            </div>
          </form>
        </div>
        <div className="section">
          <p>We'll send you a reminder to fill out your questions every day at 6PM EST. In the future this will be more customizeable.</p>
        </div>
      </div>
    );
  }
}
