import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import parse, { domToReact } from "html-react-parser";
import CatalogBox from "./CatalogBox";

const Container = styled.section`
  display: flex;
  justify-content: center;

  background-color: #f3f7f9;
  padding: 80px 0;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1170px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
const Title = styled.h1`
  margin: 0;
`;
const Info = styled.div`
  color: #4a5763;
  line-height: 27px;
  margin-top: 24px;
  margin-bottom: 40px;
`;
const List = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const Catalog = () => {
  const [hoveredItemId, setHoveredItemId] = React.useState(null);
  const {
    allWpMediaItem: { nodes },
    allWpContentNode: { nodes: contentNodes },
  } = useStaticQuery(graphql`
    query MainCatalogQuery {
      allWpMediaItem(
        filter: { title: { regex: "/catalog/" } }
        sort: { fields: caption }
      ) {
        nodes {
          id
          altText
          description
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG)
            }
          }
        }
      }
      allWpContentNode(filter: { slug: { eq: "main" } }) {
        nodes {
          ... on WpPage {
            id
            content
          }
        }
      }
    }
  `);

  let { content } = contentNodes[0];

  let options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === "catalog") {
        return <>{domToReact(domNode.children[1].children, options)}</>;
      }
      if (
        domNode.attribs &&
        (domNode.attribs.class === "main-slideshow-images" ||
          domNode.attribs.class === "services-container" ||
          domNode.attribs.class === "equipment-logos" ||
          domNode.attribs.class === "implementation-cycle" ||
          domNode.attribs.class === "projects" ||
          domNode.attribs.class === "about-us" ||
          domNode.attribs.class === "partners-icons-wrapper")
      ) {
        return <></>;
      }
    },
  };

  const handleHoverOn = index => {
    setHoveredItemId(index);
  };
  const handleHoverOff = () => {
    setHoveredItemId(null);
  };
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>Каталог</Title>
          <PrimaryButton text="Все оборудование" />
        </Header>
        <Info>{parse(content, options)}</Info>
        <List>
          {nodes.map(item => {
            let hovered = hoveredItemId === item.id ? true : false;
            return (
              <CatalogBox
                handleHoverOn={handleHoverOn}
                handleHoverOff={handleHoverOff}
                itemData={item}
                hovered={hovered}
              />
            );
          })}
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Catalog;
