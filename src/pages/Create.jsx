import { WrapperPage } from "./Index";
import { ContainerTitle} from "./Edit";
import { Form } from "../components/Form";
import { useEffect, useState } from "react";
import { createProduct } from "../services/products-services";
import { useNavigate } from "react-router-dom";

export function CreatePage() {

  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    const dataSaved = JSON.parse(sessionStorage.getItem("product-form"));
    if (dataSaved) {
      setDataForm(dataSaved);
    }
  }, []);

  const { name, price, description, category, picture_url } = dataForm;

  function handleChange(e) {
    const { name, value } = e.target;
    
    name === "price" ? 
      setDataForm({...dataForm, [name]: (value*100)}) :
      setDataForm({...dataForm, [name]: value});
    
    let dataProduct = JSON.stringify(dataForm);
    sessionStorage.setItem("product-form", dataProduct);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createProduct(dataForm)
      .catch((err) => console.log(err));
    sessionStorage.removeItem("product-form");
    navigate("/");
  }

  return (
    <WrapperPage>
      <ContainerTitle><h1 style={{fontSize:"inherit"}}>Create Product</h1></ContainerTitle>
      <Form name={name} price={price/100} description={description} category={category} picture_url={picture_url}
          handleChange={handleChange} handleSubmit={handleSubmit} textButton="Create">
      </Form>
    </WrapperPage>
  )
}