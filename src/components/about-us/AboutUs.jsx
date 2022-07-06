import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import parse, { domToReact } from "html-react-parser";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import ArrowIcon from "../../assets/short_right.svg";
import MapImage from "../../images/about-map.png";
import MapSmallPointImage from "../../assets/ellipse.svg";

const ContainerWithImage = styled.div`
  width: 100%;
  height: 680px;
  position: relative;
  color: #ffffff;
  overflow: hidden;
`;
const DarkImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #03141a;
  opacity: 0.8;
`;
const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: ${props => (props.isMain ? "87px 0" : "50px 0 80px")};
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1170px;
`;
const InfoWrapper = styled.div`
  max-width: 548px;
  margin: 0;
  margin-bottom: 40px;
  margin-right: 25px;
`;
const InfoTextHeading = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  margin-bottom: 30px;
`;
const Title = styled.h1`
  margin: 0;
  margin-bottom: 40px;
`;
const InfoText = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  margin-bottom: 40px;
`;
const InfoList = styled.ul`
  font-size: 15px;
  line-height: 22px;
  margin: 0;
  margin-bottom: 30px;
`;
const StyledArrowIcon = styled(ArrowIcon)`
  margin-right: 16px;
`;
const InfoListItem = styled.li`
  display: flex;
  align-items: center;
  list-style-type: none;
`;
const MapWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 567px;
  height: 480px;
`;
const MapPoint = styled.span`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  background-color: #93c3d3;
`;
const MapSmallPointWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
const MapSmallPoint = styled(MapSmallPointImage)`
  width: ${({ sizeSmall }) => `${sizeSmall}px`};
  height: ${({ sizeSmall }) => `${sizeSmall}px`};
`;

const AboutUs = isMain => {
  // isMain is a boolean that determines whether the component is rendered on the main page or on the about us page
  const {
    wpMediaItem: { localFile, altText, description },
  } = useStaticQuery(graphql`
    query MainAboutQuery {
      wpMediaItem(title: { eq: "about-main" }) {
        title
        altText
        description
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, height: 680)
          }
        }
      }
    }
  `);

  const mainImage = getImage(localFile.childImageSharp.gatsbyImageData);

  let options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === "heading") {
        return (
          <InfoTextHeading>
            {domToReact(domNode.children, options)}
          </InfoTextHeading>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "text") {
        let text = domToReact(domNode.children).substring(0, 211) + "...";
        return (
          <InfoText>{isMain ? text : domToReact(domNode.children)}</InfoText>
        );
      }
      if (domNode.name === "ul") {
        return <InfoList>{domToReact(domNode.children, options)}</InfoList>;
      }
      if (domNode.name === "li") {
        return (
          <InfoListItem>
            <StyledArrowIcon />
            {domToReact(domNode.children, options)}
          </InfoListItem>
        );
      }
    },
  };

  return (
    <ContainerWithImage>
      <GatsbyImage image={mainImage} alt={altText} />
      <DarkImageOverlay />
      <InnerContainer isMain={isMain}>
        <ContentWrapper>
          <InfoWrapper>
            {!isMain && <div>Главная - О компании</div>}
            <Title>О компании</Title>
            {parse(description || "", options)}
            {isMain && (
              <PrimaryButton
                text="Оставить заявку"
                color={"#0E6683"}
                backgroundColor={"#ffffff"}
                hoverStyles={{ backgroundColor: "#CFE0E6;" }}
              />
            )}
          </InfoWrapper>
          <MapWrapper>
            <img src={MapImage} alt="контурная карта РБ" />
            <MapPoint size={21} top={209} left={256}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={7} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={21} top={80} left={374}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={7} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={21} top={218} left={439}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={7} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={21} top={367} left={432}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={7} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={21} top={378} left={37}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={7} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={21} top={234} left={58}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={7} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={17} top={200} left={134}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={7} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={15} top={83} left={320}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={5} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={15} top={276} left={353}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={5} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={15} top={311} left={154}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={5} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={15} top={316} left={249}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={5} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={15} top={388} left={217}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={5} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={15} top={276} left={353}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={5} />
              </MapSmallPointWrapper>
            </MapPoint>
            <MapPoint size={15} top={412} left={394}>
              <MapSmallPointWrapper>
                <MapSmallPoint sizeSmall={5} />
              </MapSmallPointWrapper>
            </MapPoint>
          </MapWrapper>
        </ContentWrapper>
      </InnerContainer>
    </ContainerWithImage>
  );
};

export default AboutUs;
