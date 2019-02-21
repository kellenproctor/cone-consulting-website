import React from "react";
import { graphql } from 'gatsby'
import { navigate } from "gatsby-link";
import Layout from '../../components/Layout'
import PreviewCompatibleImage from '../../components/PreviewCompatibleImage'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section"
          style={{marginTop: "5rem"}}>
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
        <h1>Get In Touch With Us</h1>
        <form
          name="contact"
          method="post"
          action="/contact/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </div>
          <div className="field">
            <label className="label" htmlFor={"name"} >Your name</label>
            <div className="control">
              <input className="input" type={"text"} name={"name"} onChange={this.handleChange} id={"name"} required={true} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={"email"}>Email</label>
              <div className="control">
                <input className="input" type={"email"} name={"email"} onChange={this.handleChange} id={"email"} required={true} />
              </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={"message"}>Message</label>
            <div className="control">
              <textarea className="textarea" name={"message"} onChange={this.handleChange} id={"message"} required={true} />
            </div>
          </div>
          <div className="field">
            <button className="button is-link" type="submit">Send</button>
          </div>
        </form>
        <h1 className="has-text-centered">Contact Information</h1>
        <hr style={{marginBottom: "3rem"}} />
        <div className="columns">
          <div className="column is-5 is-offset-1">
            <h2>Hong Kong</h2>
            <p>
              Penthouse, Central Building <br/>
              1 Queen's Road Central <br/>
              Central, Hong Kong
            </p>
            <p>+852 8888 8888</p>
          </div>
          <div className="column is-6">
            <PreviewCompatibleImage imageInfo={this.props.data.hk} />
          </div>
        </div>
        <hr style={{marginBottom: "3rem"}} />
        <div className="columns">
          <div className="column is-5 is-offset-1">
            <h2>Kuala Lumpur</h2>
            <p>
              Concourse Level, Lower Ground <br/>
              Kuala Lumpur City Centre <br/>
              50088 Kuala Lumpur <br/>
              Malaysia
            </p>
            <p>+60 1-8888 8888</p>
          </div>
          <div className="column is-6" style={{marginBottom: "5rem"}}>
            <PreviewCompatibleImage imageInfo={this.props.data.kl} />
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
      </Layout>
    );
  }
}

export const ContactQuery = graphql`
query ContactQuery {
  hk: file(relativePath: {eq: "hongkong.jpg"}) {
    childImageSharp {
      fluid(maxWidth: 550) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  kl: file(relativePath: {eq: "kl.jpg"}) {
    childImageSharp {
      fluid(maxWidth: 550) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`
