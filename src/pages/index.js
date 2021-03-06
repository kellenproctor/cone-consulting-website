import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section
          className="hero is-success is-fullheight"
          id="index-page"
          style={{backgroundImage: `linear-gradient(rgba(45, 54, 67, 0.5), rgba(45, 54, 67, 0.5)), url('img/devils_peak.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition:"center", backgroundSize:"cover"}}>
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-offset-2 has-text-centered" 
                      style={{borderRadius: "5px", background: "radial-gradient(rgba(45, 54, 67, 0.9), rgba(45, 54, 67, 0))"}} >
                  <h1 className="title is-size-1">
                    Cone Consulting Limited
                  </h1>
                  <h2 className="subtitle is-size-3 is-clearfix">
                    Expert Geotechnical Consultation &amp; Data Analysis
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-3"> Find Out More About Our Services</h1>
            </div>
            <div className="content">
              <h1 className="has-text-weight-bold is-size-3">News</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{ border: '1px solid #333', padding: '2em 4em' }}
                  key={post.id}
                >
                  <p>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <br />
                    <br />
                    <Link className="button is-small" to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
