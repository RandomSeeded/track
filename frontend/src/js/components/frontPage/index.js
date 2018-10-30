import GoogleSigninButton from '../../../assets/btn_google_signin_light_normal_web.png'
import GoogleSigninButtonPressed from '../../../assets/btn_google_signin_light_pressed_web.png'

export class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleButtonPressed: false,
    };
  }

  render() {
    return (
      <section className="hero is-primary is-medium is-fullheight">
	<div className="hero-body">
	  <div className="container has-text-centered">
	    <h1 className="title is-1">Longitude</h1>
	    <h2 className="subtitle">Subtitle goes here</h2>
            <a href="/auth/google" onClick={this.handleGoogleButtonClick.bind(this)}>
              {!this.state.googleButtonPressed &&
                <img src={GoogleSigninButton}/>
              }
              {this.state.googleButtonPressed &&
                <img src={GoogleSigninButtonPressed}/>
              }
            </a>
	  </div>
	</div>
      </section>
    );
  }

  handleGoogleButtonClick() {
    this.setState({
      googleButtonPressed: true,
    });
  }
}
