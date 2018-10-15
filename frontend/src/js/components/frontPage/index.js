export class FrontPage extends React.Component {
  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">The name of this project</h1>
            <h2 className="subtitle">A description of this project</h2>
            <a className="button" href="/auth/google">Login with Google</a>
          </div>
        </div>
      </section>
    );
  }
}
