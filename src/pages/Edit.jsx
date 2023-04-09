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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

    function validate(values) {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.price) {
        errors.price = "Price is required";
      } else if (values.price < 100) {
        errors.price = "Price must be greater than $1.00";
      }
  
      if (!values.picture_url) {
        errors.picture_url = "Picture URL is required";
      } else if (!/\.(gif|jpg|jpeg|tiff|png)$/i.test(values.picture_url)) {
        errors.picture_url = "Picture URL is invalid";
      }
      return errors;
    }
    
    function handleChange(e) {
      const { name, value } = e.target;
      name === "price" ? 
        setProduct({...product, [name]: (value*100)}) :
        setProduct({...product, [name]: value});
      let dataProduct = JSON.stringify(product);
      sessionStorage.setItem(`product-form-${id}`, dataProduct);
    }

    function handleBlur(e) {
      const name = e.target.name;
      setTouched({...touched, [name]: true});
      setErrors(validate(product))
    }

    function handleSubmit(e) {
      e.preventDefault();
      updateProductId(id, product)
        .catch((err) => console.log(err));
      if (Object.keys(errors).length === 0) {
        navigate("/");
        sessionStorage.removeItem(`product-form-${id}`);
      }
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
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          errors={errors}
          touched={touched}
          textButton="Save"
        />
      </WrapperPage>
    );
  }
}
