import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const AboutPageTemplate = ({ title, tiles, team, bottomImage, content, contentComponent }) => {
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
              <PageContent className="content" content={content} />
              <div className="tile is-ancestor"
                    style={{margin: "2rem -50vw auto",
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
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light has-text-centered"
                  style={{margin: "4rem 0 1rem"}} >
                Team
              </h2>
              <hr style={{margin: "0 0 4rem"}} />
              <div className="columns">
                {Object.keys(team).map((key) => (
                  <div className="column is-5 is-offset-1 has-text-justified" key={key}>
                    <div className="image" style={{width: "200px", margin: "0 auto 2rem"}} >
                      <PreviewCompatibleImage imageInfo={team[key]} />
                    </div>
                    <div className="title is-2 has-text-centered">{team[key].name}</div>
                    <div style={{margin: "0 0 4rem"}} >{team[key].writeup}</div>
                  </div>
                ))}
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

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  tiles: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  team: PropTypes.object
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        tiles={post.frontmatter.tiles}
        team={post.frontmatter.team}
        bottomImage={post.frontmatter.bottomImage}
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
        tiles {
          image1 {
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        bottomImage {
          childImageSharp {
            fluid(maxWidth: 2500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        team {
          Will {
            name
            writeup
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 250) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          Ernst {
            name
            writeup
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 250) {
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
