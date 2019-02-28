import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const CPTPageTemplate = ({ title, main, history, tiles, bottomImage, content, contentComponent }) => {
  const PageContent = contentComponent || Content

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
              <h3 className="title is-size-4 has-text-weight-bold is-bold-light">{main.title}</h3>
              <p>{main.body}</p>
              <div className="tile is-ancestor"
                    style={{margin: "2rem -50vw 3rem",
                            width: "100vw",
                            position: "relative",
                            left: "50%",
                            right: "50%"}} >
                <div className="tile is-parent">
                  <article className="tile is-child"
                            style={{padding: "0 0.75rem"}} >
                    <PreviewCompatibleImage imageInfo={tiles.image1} />
                  </article>
                  <article className="tile is-child"
                            style={{padding: "0 0.75rem"}} >
                    <PreviewCompatibleImage imageInfo={tiles.image2} />
                  </article>
                  <article className="tile is-child"
                            style={{padding: "0 0.75rem"}} >
                    <PreviewCompatibleImage imageInfo={tiles.image3} />
                  </article>
                </div>
              </div>
              <PageContent className="content" content={content} />
              <h3 className="title is-size-4 has-text-weight-bold is-bold-light has-text-centered">{history.title}</h3>
              <div className="columns">
                <div className="column is-5">
                  <PreviewCompatibleImage imageInfo={history.image1} />
                </div>
                <div className="column is-7">
                  <p>{history.body1}</p>
                  <br/>
                  <p>{history.body2}</p>
                </div>
              </div>
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
  main: PropTypes.object,
  tiles: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  history: PropTypes.object,
  bottomImage: PropTypes.object
}

const CPTPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <CPTPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        main={post.frontmatter.main}
        tiles={post.frontmatter.tiles}
        content={post.html}
        history={post.frontmatter.history}
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
        main {
          title
          body
        }
        history {
          title
          body1
          body2
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth:600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        tiles {
          image1 {
            image {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            image {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            image {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 400) {
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
