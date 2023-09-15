// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Table } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import base_url from "../ApiServices/BackendAPIs";
// import Pagination from "react-js-pagination";
// import "./ShowAllUsers.css";

// function ShowAllUsers() {
//   const [users, setUsers] = useState([]);
//   const [activePage, setActivePage] = useState(1); // To keep track of the current active page
//   const itemsPerPage = 10; // Number of items to display per page
//   const dataFetchedRef = useRef(false);

//   const getAllUsersFromServer = () => {
//     axios
//       .get(`${base_url}/credpro/admin/getAllUsers`)
//       .then((response) => {
//         console.log(response.data);
//         setUsers(response.data);
//         if (!dataFetchedRef.current) {
//           toast.success("Data has been loaded", { position: "bottom-center" });
//           dataFetchedRef.current = true;
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Failed to fetch users", { position: "bottom-center" });
//       });
//   };

//   useEffect(() => {
//     getAllUsersFromServer();
//   }, []);

//   const indexOfLastItem = activePage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div style={{ textAlign: "center", margin: "2rem 0" }}>
//       <h1>Show All Users</h1>
//       <ToastContainer />
//       <div>
//         <Table striped>
//           <thead>
//             <tr>
//               <th>User ID</th>
//               <th>Username</th>
//               <th>User AU ID</th>
//               <th>Email</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.map((user) => (
//               <tr key={user.userId}>
//                 <td>{user.userId}</td>
//                 <td>{user.username}</td>
//                 <td>{user.userAuId}</td>
//                 <td>{user.auEmail}</td>
               
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       <Pagination
//         activePage={activePage}
//         itemsCountPerPage={itemsPerPage}
//         totalItemsCount={users.length}
//         pageRangeDisplayed={5}
//         onChange={(pageNumber) => setActivePage(pageNumber)}
//       />
//     </div>
//   );
// }

// export default ShowAllUsers;







import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Input, Button } from "reactstrap"; // Import Input and Button components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base_url from "../ApiServices/BackendAPIs";
import Pagination from "react-js-pagination";
import "./ShowAllUsers.css";

function ShowAllUsers() {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1); // To keep track of the current active page
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const itemsPerPage = 10; // Number of items to display per page
  const dataFetchedRef = useRef(false);

  const getAllUsersFromServer = () => {
    axios
      .get(`${base_url}/credpro/admin/getAllUsers`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        if (!dataFetchedRef.current) {
          toast.success("Data has been loaded", { position: "bottom-center" });
          dataFetchedRef.current = true;
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch users", { position: "bottom-center" });
      });
  };

  useEffect(() => {
    getAllUsersFromServer();
  }, []);

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle search button click
  const handleSearch = () => {
    setActivePage(1); // Reset to the first page when searching
  };

  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <h1>Show All Users</h1>
      <ToastContainer />
      <div>
        {/* Input field for search */}
        <Input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search button */}
        <Button color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>User AU ID</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.userAuId}</td>
              <td>{user.auEmail}</td>
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
    </div>
  );
}

export default ShowAllUsers;

