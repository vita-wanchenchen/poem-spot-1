import Styled from "styled-components";

const Buttons = Styled.button`
  width: 300px;
  height: 45px;
  color: white;
  font-size: 25px;
  border-color: navy;
  background: linear-gradient(SteelBlue, MidnightBlue);
  border-radius: 12px;
  box-shadow: 0 4px #999;
  cursor: pointer;

  :hover {
    font-weight: "bolder";
    color: black;
    background: linear-gradient(yellow, orangered);
  }

  :active {
    background-color: gray;
    box-shadow: 0 5px #999;
    transform: translateY(4px);
  }
`;

export default Buttons;
