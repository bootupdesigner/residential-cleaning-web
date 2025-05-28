"use client";
import React from "react";
import Form from "react-bootstrap/Form";

const ContactInfoComponent = ({ contactInfo, setContactInfo, showPassword = true }) => {
  const handleInputChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={contactInfo.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          placeholder="Enter first name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={contactInfo.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          placeholder="Enter last name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={contactInfo.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          value={contactInfo.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="Enter phone number"
        />
      </Form.Group>

      {showPassword && (
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={contactInfo.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
      )}
    </>
  );
};

export default ContactInfoComponent;
