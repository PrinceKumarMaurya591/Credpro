import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import base_url from "../ApiServices/BackendAPIs";

function AddQuery() {
  const [formData, setFormData] = useState({
    queryName: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${base_url}/credpro/api/querylists/addQuery`, formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Query added successfully", {
          position: "bottom-center",
        });
        setFormData({
          queryName: "",
          query: "",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add query", { position: "bottom-center" });
      });
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <h1>Welcome to CredPro Add Query page</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="queryName">Query Name:</Label>
                <Input
                  type="text"
                  name="queryName"
                  id="queryName"
                  value={formData.queryName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="query">Query:</Label>
                <Input
                  type="text"
                  name="query"
                  id="query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <div>
                <Button type="submit" color="primary">
                  Add Query
                </Button>
              </div>
            </Form>
          </div>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default AddQuery;
