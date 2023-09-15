import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import base_url from "../ApiServices/BackendAPIs";

function UpdateUser() {
  const [updatedUser, setUpdatedUser] = useState({
    userId: null,
    username: "",
    auEmail: "",
    isActiveUser: false,
    isAdmin: false,
    userAuId: null, // The admin will provide this value manually
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`${base_url}/credpro/admin/${updatedUser.userAuId}`, updatedUser);
      console.log("User updated successfully");
      toast.success("User updated successfully", { position: "bottom-center" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to updated users", { position: "bottom-center" });
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={updatedUser.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="auEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="auEmail"
            value={updatedUser.auEmail}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="isActiveUser">
          <Form.Check
            type="checkbox"
            label="Is Active User"
            name="isActiveUser"
            checked={updatedUser.isActiveUser}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="isAdmin">
          <Form.Check
            type="checkbox"
            label="Is Admin"
            name="isAdmin"
            checked={updatedUser.isAdmin}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="userAuId">
          <Form.Label>User AuId (Provided by Admin)</Form.Label>
          <Form.Control
            type="text"
            name="userAuId"
            value={updatedUser.userAuId}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button onClick={handleUpdateUser}>Update</Button>
      </Form>
    </div>
  );
}

export default UpdateUser;
