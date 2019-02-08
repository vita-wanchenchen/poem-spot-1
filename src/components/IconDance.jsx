// import React from "react";
import Styled, { keyframes } from "styled-components";

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(10deg);
  }

  to {
    transform: rotate(0deg) translateX(10px);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const IconDance = Styled.div`
  display: inline-block;
  margin-left: 8px;
  padding-top: -5px;

  :hover {
    animation: ${rotate} 0.5s linear infinite;
    font-size: 1rem;
  }
`;

export default IconDance;
