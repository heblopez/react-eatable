import { Button } from "../components/Button";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { getProducts, deleteProductId } from "../services/products-services";
import { FoodCard } from "../components/FoodCard";
import { Rings } from "react-loader-spinner";
import { colors } from "../styles/index";
import { Link } from "react-router-dom";
import { ModalPortal } from "../components/Modal";
import { motion } from "framer-motion";

export const WrapperPage = styled.div`
  height: 100vh;
  min-height: 700px;
  position: relative;
`
const ContainerTitle = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
`
const CarouselWrapper = styled(motion.div)`
  height: 77vh;
  overflow: hidden;
  cursor: grab;
`
const ProductsContainer = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 40px;
`

export function IndexPage() {

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const carousel = useRef();
  const [height, setHeight] = useState(null);
  const [idProductDelete, setIdProductDelete] = useState(null);
  const [reload, setReload] = useState();
  
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setReload(false);
        setHeight(carousel.current.scrollHeight - carousel.current.offsetHeight);})
      .catch((err) => console.log(err));
  }, [reload]);

  function handleOpen(e) {
    setShowModal(true);
    setIdProductDelete(e.target.dataset.id);
  }

  function handleDelete(e) {
    deleteProductId(idProductDelete)
      .then(() => {
        setShowModal(false);
        setReload(true);})
      .catch((err) => console.log(err));
  }

  function handleClose() {
    setShowModal(false);
  }

  if (reload === undefined || reload === true ) {
    
    return (
      <div style={{ display:"flex", height:"100vh", justifyContent: "center", alignItems: "center"}}>
        <Rings color={`${colors.orange}`} />
      </div>
    )
  } else {
    return (
      <WrapperPage>
      <ContainerTitle><h1 style={{fontSize:"inherit"}}>Products Dashboard</h1></ContainerTitle>
      <CarouselWrapper ref={carousel} whileTap={{cursor: "grabbing"}}>
        <ProductsContainer drag="y" dragConstraints={{ bottom: 0, top: -height }} >
          { products.map((dish, index) => (<motion.div key={index+1}><FoodCard key={index+1} product={dish} onDelete={handleOpen}/></motion.div>)) }
        </ProductsContainer>
      </CarouselWrapper>
      <Link to={"/create"}>
        <Button>Create Product</Button>
      </Link>
      {showModal && <ModalPortal onDelete={handleDelete} onClose={handleClose} />}
      </WrapperPage>
    )
  }
}
