// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import base_url from "../ApiServices/BackendAPIs";
// import { ListGroup, ListGroupItem } from "reactstrap";

// function QueriesList() {
//   const [queries, setQueries] = useState([]);

//   useEffect(() => {
//     // Fetch the list of queries assigned to the user from the backend API
//     axios
//       .get(`${base_url}/credpro/user/queries`)
//       .then((response) => {
//         setQueries(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h3>Assigned Queries:</h3>
//       <ListGroup>
//         {queries.map((query) => (
//           <ListGroupItem key={query.queryId}>
//             {query.queryName}
//           </ListGroupItem>
//         ))}
//       </ListGroup>
//     </div>
//   );
// }

// export default QueriesList;
