// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import base_url from "../ApiServices/BackendAPIs";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
// } from "reactstrap";
// import { useParams } from "react-router-dom";
// function AssignQueries() {
//   const { adminAuId } = useParams();
//   const [formData, setFormData] = useState({
//     userAuId: "", // Set the userAuId from the location state
//     queries: [],
//   });

//   const queryIdsWrapper = {
//     userAuId: formData.userAuId,
//     queryIds: formData.queries,
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "queries") {
//       // Convert the comma-separated string to an array of numbers
//       const queryIds = value.split(",").map(Number);
//       setFormData({ ...formData, [name]: queryIds });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

    
//     axios
//       .post(`${base_url}/credpro/admin/${adminAuId}/assign-queries`,
//       queryIdsWrapper // Send the queryIdsWrapper as the request body
//     )
//     .then((response) => {
//       console.log(response.data);
//       toast.success("Query assigned successfully", { position: "bottom-center" });
//       setFormData({
//         userAuId: "", // Set the userAuId from the location state
//         queries: [],
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//       toast.error("Failed to assign queries to user", {
//         position: "bottom-center",
//       });
//     });
// };
//   return (
//     <div style={{ height: "90vh" }}>
//       <h1> Welcome to assign Queries page </h1>
//       <FormGroup>
//         <Label for="userAuId">User AU ID:</Label>
//         <Input
//           type="number"
//           name="userAuId"
//           id="userAuId"
//           value={formData.userAuId}
//           onChange={handleChange}
//           required
//         />
//       </FormGroup>
//       <Form onSubmit={handleSubmit}>
//       <FormGroup>
//   <Label for="queries">Queries:</Label>{" "}
//   <Input
//     type="text"
//     name="queries"
//     id="queries"
//     value={formData.queries.join(",")} // Convert the array back to a comma-separated string
//     onChange={handleChange}
//     required
//   />
// </FormGroup>{" "}
//         <div>
//           {" "}
//           <Button type="submit" color="primary">
//             {" "}
//             Assign Queres{" "}
//           </Button>{" "}
//         </div>{" "}
//       </Form>{" "}
//     </div>
//   );
// }
// export default AssignQueries;
















import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base_url from "../ApiServices/BackendAPIs";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Pagination,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useParams } from "react-router-dom";

function AssignQueries() {
  const { adminAuId } = useParams();
  const [formData, setFormData] = useState({
    userAuId: "",
    queryId:[], // Initialize as an empty string
  });

  const [queryList, setQueryList] = useState([]); // Store the list of queries
  const [searchText, setSearchText] = useState(""); // Store the search text
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user
  const itemsPerPage = 10;
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    getAllUsersFromServer();
  }, []);

  const getAllUsersFromServer = () => {
    axios
      .get(`${base_url}/credpro/api/querylists/getAllQueries`)
      .then((response) => {
        setQueryList(response.data.content);
        console.log(response.data.content);
        if (!dataFetchedRef.current) {
          toast.success("Data has been loaded", { position: "bottom-center" });
          dataFetchedRef.current = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };



  // Update the handleChange function to handle both manual input and selections
const handleChange = (e) => {
  const { name, value } = e.target;

  // If the input field name is "queryId", split the input by commas to get an array
  if (name === "queryId") {
    const queryIdArray = value.split(",").map((id) => id.trim());
    setFormData({ ...formData, [name]: queryIdArray });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const handleQuerySelect = (queryId) => {
    // Make sure queryId is always an array
    const updatedQueryId = Array.isArray(formData.queryId)
      ? [...formData.queryId, queryId]
      : [queryId];
  
    setFormData({ ...formData, queryId: updatedQueryId });
    setQueryList([]); // Clear the query list after selecting a query
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure formData.queryId is an array
    const queryIds = Array.isArray(formData.queryId)
      ? formData.queryId
      : [formData.queryId];
  
    axios
      .post(`${base_url}/credpro/admin/${adminAuId}/assign-queries`, {
        userAuId: formData.userAuId,
        queryIds: queryIds, // Send as an array
        
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Query assigned successfully", {
          position: "bottom-center",
        });
        setFormData({
          userAuId: "", // Set the userAuId from the location state
          queryId: [], // Initialize as an empty array

        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to assign query to user", {
          position: "bottom-center",
        });
      });
  };
  

  // Function to handle search button click
  const handleSearch = () => {
    setActivePage(1); // Reset to the first page when searching
  };

  // Function to handle row click
  const handleRowClick = (query) => {
    if (!formData.queryId.includes(query.queryId)) {
      const updatedQueryId = [...formData.queryId, query.queryId];
      setFormData({ ...formData, queryId: updatedQueryId });
    }
  };

  // Filter users based on the search query
  const filteredUsers = queryList.filter((query) =>
    query.queryName.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ height: "90vh" }}>
      <h1>Welcome to assign Queries page</h1>
      <FormGroup>
        <Label for="userAuId">User AU ID:</Label>
        <Input
          type="number"
          name="userAuId"
          id="userAuId"
          value={formData.userAuId}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="queryId">Query:</Label>
    <Input
      type="text"
      name="queryId"
      id="queryId"
      value={formData.queryId.join(", ")} // Display as a comma-separated string
      onChange={handleChange}
      required
    />
  </FormGroup>
  <div>
    <Button type="submit" color="primary">
      Assign Query
    </Button>
  </div>
</Form>
      <FormGroup>
        <Label for="searchText">Search Users:</Label>
        <Input
          type="text"
          name="searchText"
          id="searchText"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button color="primary" onClick={handleSearch}>
          Search
        </Button>
      </FormGroup>
      {/* Conditionally render the table and pagination */}
      {searchText ? (
        <>
          <Table striped>
            <thead>
              <tr>
                <th>Query ID</th>
                <th>QueryName </th>
                <th>Query</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((query) => (
                <tr
                  key={query.queryId}
                  onClick={() => handleRowClick(query)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{query.queryId}</td>
                  <td>{query.queryName}</td>
                  <td>{query.query}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={filteredUsers.length}
            pageRangeDisplayed={5}
            onChange={(pageNumber) => setActivePage(pageNumber)}
          />
        </>
      ) : null}
      {/* Display selected user */}
      {selectedUser && (
        <div>
          <h2>Selected User</h2>
          <p>Query ID: {selectedUser.queryId}</p>
          <p>QueryName: {selectedUser.queryName}</p>
          <p>Query: {selectedUser.query}</p>
        </div>
      )}
    </div>
  );
}

export default AssignQueries;
