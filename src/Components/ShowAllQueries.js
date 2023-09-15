// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import base_url from "../ApiServices/BackendAPIs";

// function ShowAllQueries() {
//   const [users, setUsers] = useState([]);
//   const dataFetchedRef = useRef(false);

//   const getAllUserFromServer = () => {
//     axios
//       .get(`${base_url}/credpro/api/querylists/getAllQueries`)
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
//         toast.error("Failed to fetch data", { position: "bottom-center" });
//       });
//   };

//   useEffect(() => {
//     getAllUserFromServer();
//   }, []);

//   return (
//     <div style={{ textAlign: "center", margin: "2rem 0" }}>
//       <h1>Welcome to CredPro ShowAllQueries page</h1>
//       {/* <button onClick={getAllUserFromServer}>Fetch Data</button> */}
//       <ToastContainer />
//       <div>
//         <h2>User Data:</h2>
//         {/* <table style={{ width: "100%" }} striped> */}
//         <table class="table table-striped">
//           <thead>
//             <tr>
//               <th>Query ID</th>
//               <th>Query</th>
//               <th>Query Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.queryId}</td>
//                 <td>{user.query}</td>
//                 <td>{user.queryName}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ShowAllQueries;













// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import base_url from "../ApiServices/BackendAPIs";
// import Pagination from "react-js-pagination";

// function ShowAllQueries() {
//   const [queries, setQueries] = useState([]);
//   const [activePage, setActivePage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     fetchQueries();
//   }, []);

//   const fetchQueries = () => {
//     axios
//       .get(`${base_url}/credpro/api/querylists/getAllQueries`)
//       .then((response) => {
//         setQueries(response.data.content);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const indexOfLastItem = activePage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentQueries = queries.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div style={{ textAlign: "center", margin: "2rem 0" }}>
//       <h1>Welcome to Show All Queries Page</h1>
//       <div>
//         <h2>Queries Data:</h2>
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Query ID</th>
//               <th>Query</th>
//               <th>Query Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentQueries.map((query) => (
//               <tr key={query.queryId}>
//                 <td>{query.queryId}</td>
//                 <td>{query.query}</td>
//                 <td>{query.queryName}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Pagination
//           activePage={activePage}
//           itemsCountPerPage={itemsPerPage}
//           totalItemsCount={queries.length}
//           pageRangeDisplayed={5}
//           onChange={(pageNumber) => setActivePage(pageNumber)}
//         />
//       </div>
//     </div>
//   );
// }

// export default ShowAllQueries;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import base_url from "../ApiServices/BackendAPIs";
// import Pagination from "react-js-pagination";

// function ShowAllQueries() {
//   const [queries, setQueries] = useState([]);
//   const [activePage, setActivePage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     fetchQueries();
//   }, []);

//   const fetchQueries = () => {
//     axios
//       .get(`${base_url}/credpro/api/querylists/getAllQueries`)
//       .then((response) => {
//         setQueries(response.data.content);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const indexOfLastItem = activePage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentQueries = queries.slice(indexOfFirstItem, indexOfLastItem);

//   const handleDownload = (query) => {
//     axios
//       .get(`${base_url}/credpro/user/admin/295983/execute-query/${query.queryId}`, {
//         responseType: "blob", // Get the response as a Blob
//       })
//       .then((response) => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", `query_${query.queryId}.xlsx`); // Set a dynamic download filename
//         document.body.appendChild(link);
//         link.click();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div style={{ textAlign: "center", margin: "2rem 0" }}>
//       <h1>Welcome to Show All Queries Page</h1>
//       <div>
//         <h2>Queries Data:</h2>
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Query ID</th>
//               <th>Query</th>
//               <th>Query Name</th>
//               <th>Download</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentQueries.map((query) => (
//               <tr key={query.queryId}>
//                 <td>{query.queryId}</td>
//                 <td>{query.query}</td>
//                 <td>{query.queryName}</td>
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleDownload(query)}
//                   >
//                     Download
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Pagination
//           activePage={activePage}
//           itemsCountPerPage={itemsPerPage}
//           totalItemsCount={queries.length}
//           pageRangeDisplayed={5}
//           onChange={(pageNumber) => setActivePage(pageNumber)}
//         />
//       </div>
//     </div>
//   );
// }

// export default ShowAllQueries;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import base_url from "../ApiServices/BackendAPIs";
// import Pagination from "react-js-pagination";
// import { ProgressBar } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ShowAllQueries() {
//   const [queries, setQueries] = useState([]);
//   const [activePage, setActivePage] = useState(1);
//   const [downloadProgress, setDownloadProgress] = useState(0); // State to track download progress
//   const itemsPerPage = 10;

//   useEffect(() => {
//     fetchQueries();
//   }, []);

//   const fetchQueries = () => {
//     axios
//       .get(`${base_url}/credpro/api/querylists/getAllQueries`)
//       .then((response) => {
//         setQueries(response.data.content);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const indexOfLastItem = activePage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentQueries = queries.slice(indexOfFirstItem, indexOfLastItem);

//   const handleDownload = async (query) => {
//     try {
//       const response = await axios.get(
//         `${base_url}/credpro/user/admin/295983/execute-query/${query.queryId}`,
//         {
//           responseType: "blob", // Get the response as a Blob
//           onDownloadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setDownloadProgress(percentCompleted); // Update download progress
//           },
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `query_${query.queryId}.xlsx`); // Set a dynamic download filename
//       document.body.appendChild(link);
//       link.click();

//       setDownloadProgress(0); // Reset download progress
//     } catch (error) {
//       console.error(error);
//       setDownloadProgress(0); // Reset download progress in case of an error
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", margin: "2rem 0" }}>
//       <h1>Welcome to Show All Queries Page</h1>
//       <div>
//         <h2>Queries Data:</h2>
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Query ID</th>
//               <th>Query</th>
//               <th>Query Name</th>
//               <th>Download</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentQueries.map((query) => (
//               <tr key={query.queryId}>
//                 <td>{query.queryId}</td>
//                 <td>{query.query}</td>
//                 <td>{query.queryName}</td>
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleDownload(query)}
//                   >
//                     Download
//                   </button>
//                   {downloadProgress > 0 && (
//                     <ProgressBar
//                       now={downloadProgress}
//                       label={`${downloadProgress}%`}
//                     />
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Pagination
//           activePage={activePage}
//           itemsCountPerPage={itemsPerPage}
//           totalItemsCount={queries.length}
//           pageRangeDisplayed={5}
//           onChange={(pageNumber) => setActivePage(pageNumber)}
//         />
//       </div>
//     </div>
//   );
// }

// export default ShowAllQueries;



import React, { useState, useEffect } from "react";
import axios from "axios";
import base_url from "../ApiServices/BackendAPIs";
import Pagination from "react-js-pagination";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
function ShowAllQueries() {
  const { adminAuId } = useParams();
  console.log("adminAuId in show all queries page:" + adminAuId);
  const [queries, setQueries] = useState([]); // Initialize the queries state
  const [activePage, setActivePage] = useState(1);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editQuery, setEditQuery] = useState({ queryId: null, query: "", queryName: "" }); // Initialize the editQuery state

  const itemsPerPage = 10;

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = () => {
    axios
      .get(`${base_url}/credpro/api/querylists/getAllQueries`)
      .then((response) => {
        setQueries(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQueries = queries.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownload = async (query) => {
    try {
      const response = await axios.get(
        `${base_url}/credpro/user/${adminAuId}/admin/execute-query/${query.queryId}`,
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setDownloadProgress(percentCompleted);
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `query_${query.queryId}.xlsx`);
      document.body.appendChild(link);
      link.click();

      setDownloadProgress(0);
    } catch (error) {
      console.error(error);
      setDownloadProgress(0);
    }
  };

  const handleEditModalOpen = (query) => {
    setEditQuery(query); // Set the editQuery state when the modal is opened
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditQuery({ queryId: null, query: "", queryName: "" });
  };

  const handleEditQuery = async () => {
    try {
      // Send the edited query to the server
      await axios.put(`${base_url}/credpro/api/querylists/updateQuery`, editQuery);
      handleEditModalClose();
      fetchQueries(); // Refresh the queries after editing
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <h1>Welcome to Show All Queries Page</h1>
      <div>
        <h2>Queries Data:</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Query</th>
              <th>Query Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQueries.map((query) => (
              <tr key={query.queryId}>
                <td>{query.queryId}</td>
                <td>{query.query}</td>
                <td>{query.queryName}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleDownload(query)}>
                    Download
                  </button>
                  {downloadProgress > 0 && (
                    <ProgressBar now={downloadProgress} label={`${downloadProgress}%`} />
                  )}
                  <button className="btn btn-warning ml-2" onClick={() => {
  console.log("Edit Query Button Clicked");
  handleEditModalOpen(query);
}}>
  Edit Query
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={queries.length}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setActivePage(pageNumber)}
        />
      </div>

      {/* Edit Query Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="query">
              <Form.Label>Query</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={editQuery.query}
                onChange={(e) =>
                  setEditQuery({
                    ...editQuery,
                    query: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditQuery}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShowAllQueries;