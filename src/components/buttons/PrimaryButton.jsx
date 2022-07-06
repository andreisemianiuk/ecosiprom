import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 173px;
  height: 48px;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  gap: 8px;
  color: ${props => (props.color ? props.color : `#ffffff`)};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : `#0e6683`};
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: ${props =>
      props.hoverStyles?.backgroundColor
        ? props.hoverStyles?.backgroundColor
        : `#1a7897`};
    color: ${props => props.hoverStyles?.color && props.hoverStyles?.color};
  }
`;

const PrimaryButton = ({
  text,
  callback,
  color,
  backgroundColor,
  hoverStyles,
}) => {
  return (
    <StyledButton
      onClick={callback}
      color={color}
      backgroundColor={backgroundColor}
      hoverStyles={hoverStyles}>
      {text}
    </StyledButton>
  );
};

export default PrimaryButton;
