import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import parse, { domToReact } from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'
import { CatalogLayout } from '../components/CatalogLayout'
import Layout from '../components/Layout'

const ProductWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 75%;
  @media ${devices.mobileL} {
    width: 100%;
    flex-direction: column;
    padding: 0 2px;
  }
`
const ProductLink = styled(Link)`
  text-decoration: none;
  width: clamp(320px, 100%, 425px);
`
const Product = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px dotted #00637f;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px 5px 0;
`
const ProductTitle = styled.h3`
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-align: center;
  font-size: 1.2em;
`
const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
const GatsbyImageWrapper = styled.div`
  padding: 0 10px;
`

const ProductListTemplate = ({
  data: {
    wpPage: { content },
    allWpMediaItem: { nodes },
  },
  path,
}) => {
  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'item') {
        return (
          <ProductLink
            to={`${path}${domNode.attribs['data-link']}/`}
            state={{ modal: true }}>
            <Product>{domToReact(domNode.children, options)}</Product>
          </ProductLink>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'image-wrapper') {
        const regex = new RegExp(`${domNode.attribs['data-image']}`, 'i')
        const images = nodes.filter(node => regex.test(node.title))
        return (
          <ImagesContainer>
            {images.map((image, index) => (
              <GatsbyImageWrapper>
                <GatsbyImage
                  image={image.localFile.childImageSharp.gatsbyImageData}
                  alt={image.altText}
                  key={image.altText + index}
                />
              </GatsbyImageWrapper>
            ))}
          </ImagesContainer>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'title') {
        return (
          <ProductTitle>{domToReact(domNode.children, options)}</ProductTitle>
        )
      }
    },
  }
  return (
    <Layout>
      <CatalogLayout>
        <ProductWrapper>{parse(content, options)}</ProductWrapper>
      </CatalogLayout>
    </Layout>
  )
}

export default ProductListTemplate

export const pageQuery = graphql`
  query ProductListTemplateQuery($id: String!) {
    wpPage(id: { eq: $id }) {
      content
    }
    allWpMediaItem(filter: { wpParent: { node: { id: { eq: $id } } } }) {
      nodes {
        id
        title
        localFile {
          childImageSharp {
            gatsbyImageData(height: 100, placeholder: TRACED_SVG)
          }
        }
        altText
      }
    }
  }
`
