import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Img from 'gatsby-image'

export const AboutPageTemplate = ({ title, team, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  const imageStyle = { width: '250px'}

  return (
    <section className="section section--gradient"
      style={{marginTop: "3rem"}}>
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
              <figure className="image is-4by4">
                <Img style={imageStyle} fluid={team.image.image.childImageSharp.fluid} alt={team.image.alt} />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        team={post.frontmatter.team}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        team {
          image {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 250, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
