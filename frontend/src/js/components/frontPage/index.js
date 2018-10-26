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
      <section className="hero is-fullheight is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Longitude5</h1>
            <h2 className="subtitle">A description of this project</h2>
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
