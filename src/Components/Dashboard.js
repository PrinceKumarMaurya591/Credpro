import React from "react";
import { Row, Col } from "reactstrap";
import QueriesList from "./QueriesList"; // Import the component that shows the list of queries
import ExecuteQuery from "./ExecuteQuery"; // Import the component to execute and download queries
import AssignedQueriestoUser from "./AssignedQueriestoUser";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
function Dashboard() {
    const { userAuId } = useParams();

  console.log("userAuId in login page:" + userAuId);
  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <h1>Dashboard</h1>
      <Row>
        <Col xs={12}>
          <AssignedQueriestoUser userAuId={userAuId}/> {/* Show the list of queries assigned to the user */}
        </Col>
       
        </Row>
    </div>
   
  );
}

export default Dashboard;
