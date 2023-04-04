import styled from "@emotion/styled";
import { colors } from "../styles";
import ReactDOM from "react-dom";

const ModalContainer = styled.div`
  display: flex;
  backdrop-filter: blur(7px);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
`
const ModalContent = styled.div`
  height: 154px;
  width: 260px;
  margin: auto;
  background: ${colors.white};
  color: ${colors.black};
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 20px;
`
const ModalText = styled.p`
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
`
const ModalButton = styled.button`
  width: 262px;
  height: 47px;
  background-color: ${(props) => props.color};
  border-radius: 30px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  color: ${colors.white};
  cursor: pointer;
`

function Modal({onDelete, onClose}) {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalText>Are you sure?</ModalText>
        <ModalButton color={colors.orange} onClick={onDelete}>
          Yes, delete it!
        </ModalButton>
        <ModalButton color={colors.yellow[500]} onClick={onClose}>
          No, cancel!
        </ModalButton>
      </ModalContent>
    </ModalContainer>
  )
}

export function ModalPortal({onDelete, onClose}) {
  return ReactDOM.createPortal(
    <Modal onDelete={onDelete} onClose={onClose}/>,
    document.getElementById("modal-root")
  )
}
