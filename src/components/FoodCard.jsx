import styled from "@emotion/styled";
import { colors } from "../styles/index";
import deleteButton from "../assets/delete-button.svg";
import editButton from "../assets/edit-button.svg";
import { Link, useNavigate } from "react-router-dom";

const WrapperCard = styled.div`
  display: flex;
  width: 156px;
  height: 250px;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: none;
`
const StyledImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.25);
`

const Card = styled.div`
  border-radius: 20%;
  background-color: ${colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 38px;
  height: 212px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  padding-top: 50px;
`
const NameDish = styled(Link)`
  width: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: ${colors.black};
  margin-top: 8px;
  white-space: nowrap;
  max-width: 130px;
  overflow-x: hidden;
  text-decoration: none;
`
const StyledPrice = styled(Link)`
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  color: ${colors.orange};
  text-align: center;
  margin-top: 8px;
  text-decoration: none;
`
const WrapperButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  align-items: flex-end;
`

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeFull(str) {
  const words = str.split(' ');
  const capitalizedWords = words.map(word => capitalize(word));
  return capitalizedWords.join(' ');
}

export function FoodCard({product, onDelete}) {
  
  const {name, price, picture_url, id} = product;
  const navigate = useNavigate();

  function handleShow() {
    navigate(`/show/${id}`);
  }

  function handleEdit() {
    navigate(`/edit/${id}`);
  }
  
  return (
    <WrapperCard>
      <StyledImage src={picture_url} alt={`${name} image`} onClick={handleShow}/>
      <Card>
        <NameDish to={`/show/${id}`}>{capitalizeFull(name)}</NameDish>
        <StyledPrice to={`/show/${id}`}>${(price/100).toFixed(2)}</StyledPrice>
        <WrapperButtons>
          <img src={editButton} alt="edit-button" onClick={handleEdit} style={{padding: "4px"}}/>
          <img src={deleteButton} alt="delete-button" data-id={id} onClick={onDelete} style={{padding: "4px"}}/>
        </WrapperButtons>
      </Card>
      </WrapperCard>
  )
  
}