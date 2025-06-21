"use client";

import React from "react";
import Form from "react-bootstrap/Form";

const HomeSizeComponent = ({ homeSize, setHomeSize }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="bedrooms">
        <Form.Label>Bedrooms</Form.Label>
        <Form.Select
          value={homeSize.bedrooms}
          onChange={(e) => setHomeSize({ ...homeSize, bedrooms: e.target.value })}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="4">5</option>
          <option value="4">6</option>
          <option value="4">7</option>
          <option value="4">8</option>
          <option value="4">9</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="bathrooms">
        <Form.Label>Bathrooms</Form.Label>
        <Form.Select
          value={homeSize.bathrooms}
          onChange={(e) => setHomeSize({ ...homeSize, bathrooms: e.target.value })}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="4">5</option>
          <option value="4">6</option>
          <option value="4">7</option>
          <option value="4">8</option>
          <option value="4">9</option>
        </Form.Select>
      </Form.Group>
    </>
  );
};

export default HomeSizeComponent;
