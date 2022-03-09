import * as React from 'react'
import { graphql, useScrollRestoration } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import { CatalogLayout } from '../components/CatalogLayout'
import Layout from '../components/Layout'
import { Link } from 'gatsby-plugin-modal-routing'
import { devices } from '../common/MediaQuery/media-query'

const ProductWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 75%;
  @media ${devices.mobileL} {
    width: 100%;
    flex-direction: column;
  }
`
const ProductLink = styled(Link)`
  text-decoration: none;
`
const Product = styled.div`
  width: clamp(320px, 100%, 425px);
  display: flex;
  flex-direction: column;
  height: fit-content;
  border: 1px solid #333;
  margin: 10px 0;
  padding: 10px 5px 0;
  @media ${devices.mobileL} {
    /* padding: 0; */
  }
`
const ProductTitle = styled.h3`
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-align: center;
  font-size: 1.4rem;
`
const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const ProductListTemplate = ({
  data: {
    wpPage: { content },
    allWpMediaItem: { nodes },
  },
  path,
}) => {
  // console.log('listScrollRestoration >> ', listScrollRestoration)
  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'item') {
        return (
          <ProductLink to={`${path}${domNode.attribs['data-link']}/`} asModal>
            <Product>{domToReact(domNode.children, options)}</Product>
          </ProductLink>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'image-wrapper') {
        const regex = new RegExp(`${domNode.attribs['data-image']}`, 'i')
        const images = nodes.filter(node => regex.test(node.title))
        return (
          <ImagesWrapper>
            {images.map((image, index) => (
              <GatsbyImage
                image={image.localFile.childImageSharp.gatsbyImageData}
                alt={image.altText}
                key={image.altText + index}
              />
            ))}
          </ImagesWrapper>
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
            gatsbyImageData(height: 100)
          }
        }
        altText
      }
    }
  }
`