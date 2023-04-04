import { Button } from "../components/Button";
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductId } from "../services/products-services";
import { colors } from "../styles/index";
import { capitalizeFull } from "../components/FoodCard";
import { Rings } from "react-loader-spinner";
import { WrapperPage } from "./Index";

const ContainerProduct = styled.div`
  display: flex;
  flex-direction: column;
  height: 87vh;
  align-items: center;
`
const StyledImaged = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 93px auto;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.25);
`
const StyledName = styled.p`
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  color: ${colors.black};
  text-align: center;
`
const StyledPrice = styled.p`
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  color: ${colors.orange};
  text-align: center;
  margin: 12px auto 28px auto;
`
const StyledDescription = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  align-self: start;
  padding: 0 55px;
`
const DescriptionProduct = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.black};
  padding: 12px 55px;
  text-align: justify;
  overflow-y: scroll;
`

export function ShowPage() {

  const [product, setProduct ] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getProductId(id)
      .then((data) => setProduct(data))
      .catch((err) => console.log(err))
  }, [])

  if (Object.keys(product).length === 0) {
    return (
      <div style={{ display:"flex", height:"100vh", justifyContent: "center", alignItems: "center"}}>
        <Rings color={`${colors.orange}`} />
      </div>
    )
  } else {
    const { name, description, price, picture_url } = product;

    return (
      <WrapperPage>
          <ContainerProduct>
            <StyledImaged src={picture_url} alt={`${name} image`} />
            <StyledName> {capitalizeFull(name)} </StyledName>
            <StyledPrice> ${(price/100).toFixed(2)} </StyledPrice>
            <StyledDescription>Description</StyledDescription>
            <DescriptionProduct> {description} </DescriptionProduct>
        </ContainerProduct>
        <Link to="/">
          <Button>Go Back</Button>
        </Link>
      </WrapperPage>
    );
  }
}
