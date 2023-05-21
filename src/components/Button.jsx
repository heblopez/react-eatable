import { colors } from "../styles/index";
import styled from "@emotion/styled";

const ContainerButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 12px;
  height: 10%;
`;

const StyledButton = styled.button`
  background-color: ${colors.orange};
  border: none;
  border-radius: 30px;
  width: 310px;
  height: 70px;
  cursor: pointer;
  &:hover {
    background-color: #ff6109;
  }
  &:disabled {
    background-color: ${colors.gray[500]};
    color: ${colors.white};
    cursor: not-allowed;
  }
`;
const TextButton = styled.span`
  color: ${colors.white};
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
`;

export function Button({ children, disabled }) {
  return (
    <ContainerButton>
      <StyledButton disabled={disabled}>
        <TextButton>{children}</TextButton>
      </StyledButton>
    </ContainerButton>
  );
}
