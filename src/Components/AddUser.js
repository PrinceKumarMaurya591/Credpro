import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base_url from "../ApiServices/BackendAPIs";
import "./AddUser.css";
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

import { useParams } from "react-router-dom";

function AddUserForm() {
 
  const { adminAuId } = useParams();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userAuId: "", // Set the userAuId from the location state
    auEmail: "",
    isAdmin: false
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
      .post(`${base_url}/credpro/admin/${adminAuId}/add-user`, formData) // Use adminAuId from the location state

      .then((response) => {
        console.log(response.data);
        toast.success("User added successfully", { position: "bottom-center" });
        setFormData({
          username: "",
          password: "",
          userAuId: "", // Set the userAuId from the location state
          auEmail: "", // Add the auEmail field to the formData state
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add user", { position: "bottom-center" });
      });
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <div
            className="add-user"
            style={{ textAlign: "center", margin: "2rem 0" }}
          >
            <h1>Add User</h1>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Username:</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password:</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="userAuId">User AuId:</Label>
                <Input
                  type="number"
                  name="userAuId"
                  id="userAuId"
                  value={formData.userAuId}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="auEmail">Au Email:</Label>
                <Input
                  type="email"
                  name="auEmail"
                  id="auEmail"
                  value={formData.auEmail}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="isAdmin">Is Admin:</Label>
                <Input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={formData.isAdmin}
                onChange={(e)=>
                setFormData({
                  ...formData,
                  isAdmin: e.target.checked,
                })}/>
              </FormGroup>

              <div>
                <Button type="submit" color="primary">
                  Add User
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

export default AddUserForm;
