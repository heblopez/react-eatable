import { WrapperPage } from "./Index";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { getProductId, updateProductId } from "../services/products-services";
import { colors } from "../styles";
import { Form } from "../components/Form";

export const ContainerTitle = styled.div`
  height: 10vh;
  display: flex;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  justify-content: center;
  align-items: center;
`

export function EditPage() {

  const [product, setProduct ] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const dataSaved = JSON.parse(sessionStorage.getItem(`product-form-${id}`));
    if (dataSaved) {
      setProduct(dataSaved);
    } else {
      getProductId(id)
        .then((data) => setProduct(data))
        .catch((err) => console.log(err));
    }
  }, [])

  if (Object.keys(product).length === 0) {
    return (
      <div style={{ display:"flex", height:"100vh", justifyContent: "center", alignItems: "center"}}>
        <Rings color={`${colors.orange}`} />
      </div>
    )
  } else {

    const { name, price, description, category, picture_url } = product;

    function handleChange(e) {
      const { name, value } = e.target;
      name === "price" ? 
        setProduct({...product, [name]: (value*100)}) :
        setProduct({...product, [name]: value});
      let dataProduct = JSON.stringify(product);
      sessionStorage.setItem(`product-form-${id}`, dataProduct);
      }

    function handleSubmit(e) {
      e.preventDefault();
      updateProductId(id, product)
        .catch((err) => console.log(err));
      sessionStorage.removeItem(`product-form-${id}`);
      navigate("/");
    }

    return (
      <WrapperPage>
        <ContainerTitle><h1 style={{fontSize:"inherit"}}>Edit Product</h1></ContainerTitle>
        <Form
          name={name}
          price={price/100}
          description={description}
          category={category}
          picture_url={picture_url}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          textButton="Save"
        />
      </WrapperPage>
    );
  }
}
