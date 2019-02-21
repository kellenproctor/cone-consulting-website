import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const CPTPageTemplate = ({ title, team, bottomImage, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  console.log(team)

  return (
    <section className="section section--gradient"
      style={{marginTop: "3rem"}}>
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light has-text-centered"
                  style={{margin: "0 0 1rem"}} >
                {title}
              </h2>
              <hr style={{margin: "0 0 2rem"}} />
              <PageContent className="content" content={content} />
            </div>
            <div
              className="full-width-image-container margin-top-0"
              style={{
                backgroundImage: `url(${
                  !!bottomImage.childImageSharp
                    ? bottomImage.childImageSharp.fluid.src
                    : bottomImage
                })`,}} />
          </div>
        </div>
      </div>
    </section>
  )
}

CPTPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  bottomImage: PropTypes.object
}

const CPTPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <CPTPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        bottomImage={post.frontmatter.bottomImage}
      />
    </Layout>
  )
}

CPTPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CPTPage

export const CPTPageQuery = graphql`
  query CPTPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        bottomImage {
          childImageSharp {
            fluid(maxWidth: 2500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
