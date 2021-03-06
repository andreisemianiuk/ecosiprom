import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import ServiceBox from "./ServiceBox";

const ContentWrapper = styled.section`
  max-width: 1170px;
  margin: 0 auto;
  padding-bottom: 80px;
`;
const Navigation = styled.div`
  padding: 50px 0 20px;
`;
const Title = styled.h1`
  line-height: 48px;
  margin: 0;
  margin-bottom: 40px;
`;
const ItemsWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 377px);
  grid-template-rows: repeat(2, 350px);

  justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ServicesList = ({ isMain, children }) => {
  // isMain should be true if we are on the main page

  const {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query ServicesListQuery {
      allWpMediaItem(
        filter: { title: { regex: "/services/" } }
        sort: { fields: caption }
      ) {
        nodes {
          id
          altText
          description
          slug
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  return (
    <ContentWrapper>
      {!isMain && <Navigation>{children}</Navigation>}
      <Title>Наши услуги</Title>
      <ItemsWrapper>
        {nodes.map((service) => {
          return <ServiceBox service={service} />;
        })}
      </ItemsWrapper>
      <ButtonWrapper>
        <PrimaryButton text={"Оставить заявку"} />
      </ButtonWrapper>
    </ContentWrapper>
  );
};

export default ServicesList;
