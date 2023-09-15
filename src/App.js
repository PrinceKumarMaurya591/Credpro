import React from "react";
import { Container, Row } from "reactstrap";
import Header from "./Components/Header";
import "./App.css"; // Import your custom CSS file for styling.
import AdminMenu from "./Components/AdminMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddQuery from "./Components/AddQuery";
import AddUser from "./Components/AddUser";
import ShowAllUsers from "./Components/ShowAllUsers";
import ShowAllQueries from "./Components/ShowAllQueries";
import "bootstrap/dist/css/bootstrap.min.css";
import ExecuteQuery from "./Components/ExecuteQuery";
import QueryUpdateForm from "./Components/QueryUpdateForm";
import LoginPage from "./Components/LoginPage";

import AssignQueries from "./Components/AssignQueries";
import DeleteUser from "./Components/DeleteUser";
import Dashboard from "./Components/Dashboard";
import AdminExecuteQuery from "./Components/AdminExecuteQuery";
import BackButton from "./Components/BackButton";
import { ToastContainer } from "react-toastify";
import AdminQueryExecutionPage from "./Components/AdminQueryExecutionPage";
import UpdateUser from "./Components/UpdateUser";
import AuthProvider from "./Components/AuthProvider";



function App() {
 
  return (
    <AuthProvider>
    <div className="App">
       {/* basename="sampleapp" */}
      <Router basename="/sampleapp">
        <Container>
          <Header />
          <BackButton />
          <ToastContainer></ToastContainer>
          <Routes>
            
            <Route exact path="/" element={<LoginPage />} />
          </Routes>
          <Row>
           
              <Routes>
               

                <Route path="/admin/:adminAuId/add-query" element={<AddQuery />} />
                
                <Route
                  exact
                  path="/admin/:adminAuId/show-all-users"
                  element={<ShowAllUsers />}
                />
                <Route
                  exact
                  path="/admin/:adminAuId/show-all-queries"
                  element={<ShowAllQueries />}
                />
                {/* <Route exact path="/admin/:adminAuId/execute-query" element={<AdminExecuteQuery />} /> */}
          
      
                <Route
                  exact
                  path="/admin/:adminAuId/update-queries"
                  element={<QueryUpdateForm />}
                />


                <Route
                  exact
                  path="/admin/:adminAuId/update-user"
                  element={<UpdateUser />}
                />



              <Route path="/admin/:adminAuId/assign-queries" element={<AssignQueries />} />

               
                <Route path="/admin/:adminAuId/*" element={<AdminMenu />} />
          
                <Route
          path="/admin/:adminAuId/execute-query"
          element={<AdminQueryExecutionPage />}
        />

                <Route
                  path="/admin/:adminAuId/add-user"
                  element={<AddUser />}
                />

               <Route
                  path="/user-dashboard/:userAuId"
                  element={<Dashboard />}
                />

                <Route
                  path="/admin/:adminAuId/delete-user"
                  element={<DeleteUser />}
                />

              </Routes>
           
          </Row>
        </Container>
      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
