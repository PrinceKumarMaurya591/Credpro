import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base_url from "../ApiServices/BackendAPIs";
import { useParams } from "react-router-dom";

function ExecuteQuery() {
  const { userAuId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, queryId } = e.target.elements;
    const url = `${base_url}/credpro/user/${userAuId}/execute-query/${queryId.value}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else if (response.status === 401) {
          throw new Error(
            "Unauthorized: You are not authorized to access this data."
          );
        } else if (response.status === 404) {
          throw new Error(
            "Query not found: The specified query does not exist."
          );
        } else {
          throw new Error(
            "Internal server error: Something went wrong on the server."
          );
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.xlsx");
        document.body.appendChild(link);
        link.click();
        toast.success("Data downloaded successfully", {
          position: "bottom-center",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, { position: "bottom-center" });
      });
  };

  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <h1>Execute Query and Download Data</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="userId">User ID:</Label>
          <Input
            type="number"
            name="userId"
            id="userId"
            value={userAuId} // Set the value to userAuId from the URL
            disabled // Disable the input so the user cannot change it
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="queryId">Query ID:</Label>
          <Input
            type="number"
            name="queryId"
            id="queryId"
            required
          />
        </FormGroup>
        <Button type="submit">Download Data</Button>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default ExecuteQuery;

