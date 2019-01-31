import Styled from "styled-components";

const Button = Styled.button`
  color: black;
  background-color: lightgray;
  border-radius: 12px;
  box-shadow: 0 6px #999;
  cursor: pointer;

  :hover {
    font-weight: bolder;
    background-color: gray;
  }

  :active {
    background-color: gray;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;

export default Button;
