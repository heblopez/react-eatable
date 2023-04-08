import { WrapperPage } from "./Index";
import { ContainerTitle} from "./Edit";
import { Form } from "../components/Form";
import { useEffect, useState } from "react";
import { createProduct } from "../services/products-services";
import { useNavigate } from "react-router-dom";

export function CreatePage() {

  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    picture_url: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const dataSaved = JSON.parse(sessionStorage.getItem("product-form"));
    if (dataSaved) {
      setDataForm(dataSaved);
    }
  }, []);

  const { name, price, description, category, picture_url } = dataForm;

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
      setDataForm({...dataForm, [name]: (value*100)}) :
      setDataForm({...dataForm, [name]: value});

    setErrors(validate(dataForm))
    let dataProduct = JSON.stringify(dataForm);
    sessionStorage.setItem("product-form", dataProduct);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createProduct(dataForm)
      .catch((err) => console.log(err));
    if (Object.keys(errors).length === 0) {
      navigate("/");
      sessionStorage.removeItem("product-form");
    }
  }

  return (
    <WrapperPage>
      <ContainerTitle><h1 style={{fontSize:"inherit"}}>Create Product</h1></ContainerTitle>
      <Form name={name} price={price/100} description={description} category={category} picture_url={picture_url}
          handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} textButton="Create">
      </Form>
    </WrapperPage>
  )
}