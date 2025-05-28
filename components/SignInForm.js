"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../lib/useAuth";
import Header from "./Header";
import { API_BASE_URL } from "../lib/config";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default function SignInForm() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [hasHydrated, setHasHydrated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/booking");
    }
  }, [user]);

  if (!hasHydrated) return null;

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });

      if (response.data.token) {
        await login(response.data.token); // ✅ This will redirect inside login()
      } else {
        alert("Login Failed: Invalid response from server.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Header back={true} home={true} booking={false} title="Sign In" />
      <Form style={styles.form}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#fff",
  },
  form: {
    marginTop: "20px",
  },
};
