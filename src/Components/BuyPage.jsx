import React, { useState, useEffect } from "react";
import Axios from "axios";
import CartItem from "./CartItem";

import { faker } from "@faker-js/faker";
import { Container, Col, Row } from "reactstrap";

// const apiKey = "PdfFOhDGrRRSZm6GJ7yXP4KhAsIsBveZqAbcuPYORd922B7qSEYEcCW0";

// const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";
const localurl =
  "https://jsonware.com/api/v1/json/c6b23c0a-3822-40b1-828e-c1b65f8a97b5";
const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  // const fetchPhotos = async () => {
  //   const response = await Axios.get(url, {
  //     header: {
  //       Authorization: apiKey,
  //     },
  //   });

  const fetchPhotos = async () => {
    const { data } = await Axios.get(localurl, {});

    const { photos } = data;

    const allProduct = photos.map((photo) => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: faker.random.word(),
      productPrice: faker.commerce.price(),
      id: faker.datatype.uuid(),
    }));

    setProduct(allProduct);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-success text-center">Buy Page</h1>
      <Row>
        {product.map((product) => (
          <Col md={4} key={product.id}>
            <CartItem product={product} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;
