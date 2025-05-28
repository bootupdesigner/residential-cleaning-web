"use client";
import React from 'react';
import Form from 'react-bootstrap/Form';

const AddressComponent = ({ address, setAddress }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="street">
        <Form.Label>Street Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter street address"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter state"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="zipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ZIP code"
          value={address.zipCode}
          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="homeType">
        <Form.Label>Home Type</Form.Label>
        <Form.Select
          value={address.homeType}
          onChange={(e) => setAddress({ ...address, homeType: e.target.value })}
        >
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </Form.Select>
      </Form.Group>
    </>
  );
};

export default AddressComponent;
