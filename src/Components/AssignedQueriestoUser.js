
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import base_url from "../ApiServices/BackendAPIs";

// // function AssignedQueriestoUser({ userAuId }) {
// //   const [queries, setQueries] = useState([]);

// //   useEffect(() => {
// //     // Fetch the list of queries assigned to the user from the backend API
// //     axios
// //       .get(`${base_url}/credpro/users/${userAuId}/queries`)
// //       .then((response) => {
// //         setQueries(response.data);
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   }, [userAuId]);

// //   const handleDownload = (queryId) => {
// //     const url = `${base_url}/credpro/user/${userAuId}/execute-query/${queryId}`;
// //     fetch(url, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     })
// //       .then((response) => {
// //         if (response.ok) {
// //           return response.blob();
// //         } else if (response.status === 401) {
// //           throw new Error(
// //             "Unauthorized: You are not authorized to access this data."
// //           );
// //         } else if (response.status === 404) {
// //           throw new Error(
// //             "Query not found: The specified query does not exist."
// //           );
// //         } else {
// //           throw new Error(
// //             "Internal server error: Something went wrong on the server."
// //           );
// //         }
// //       })
// //       .then((blob) => {
// //         const url = window.URL.createObjectURL(new Blob([blob]));
// //         const link = document.createElement("a");
// //         link.href = url;
// //         link.setAttribute("download", "data.xlsx");
// //         document.body.appendChild(link);
// //         link.click();
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   };

// //   return (
// //     <div>
// //       <h3>Assigned Queries:</h3>
// //       <table className="table table-striped">
// //         <thead>
// //           <tr>
// //             <th>Query ID</th>
// //             <th>Query</th>
// //             <th>Query Name</th>
// //             <th>Download</th> {/* New column for the download button */}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {queries.map((query) => (
// //             <tr key={query.queryId}>
// //               <td>{query.queryId}</td>
// //               <td>{query.query}</td>
// //               <td>{query.queryName}</td>
// //               <td>
// //                 <button
// //                   className="btn btn-primary"
// //                   onClick={() => handleDownload(query.queryId)}
// //                 >
// //                   Download
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default AssignedQueriestoUser;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import base_url from "../ApiServices/BackendAPIs";

// function AssignedQueriestoUser({ userAuId }) {
//   const [queries, setQueries] = useState([]);
//   const [downloadProgress, setDownloadProgress] = useState(0);

//   useEffect(() => {
//     axios
//       .get(`${base_url}/credpro/users/${userAuId}/queries`)
//       .then((response) => {
//         setQueries(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [userAuId]);

//   const handleDownload = (queryId) => {
//     const url = `${base_url}/credpro/user/${userAuId}/execute-query/${queryId}`;
//     fetch(url)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         return response.blob();
//       })
//       .then((blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", "data.xlsx");
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <h3>Assigned Queries:</h3>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Query ID</th>
//             <th>Query</th>
//             <th>Query Name</th>
//             <th>Download</th>
//           </tr>
//         </thead>
//         <tbody>
//           {queries.map((query) => (
//             <tr key={query.queryId}>
//               <td>{query.queryId}</td>
//               <td>{query.query}</td>
//               <td>{query.queryName}</td>
//               <td>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleDownload(query.queryId)}
//                 >
//                   Download
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {downloadProgress > 0 && (
//         <div className="progress">
//           <div
//             className="progress-bar"
//             role="progressbar"
//             style={{ width: `${downloadProgress}%` }}
//             aria-valuenow={downloadProgress}
//             aria-valuemin="0"
//             aria-valuemax="100"
//           >
//             {downloadProgress}%
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AssignedQueriestoUser;








import React, { useState, useEffect } from "react";
import axios from "axios";
import base_url from "../ApiServices/BackendAPIs";

function AssignedQueriestoUser({ userAuId }) {
  const [queries, setQueries] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    // Fetch the list of queries assigned to the user from the backend API
    axios
      .get(`${base_url}/credpro/users/${userAuId}/queries`)
      .then((response) => {
        setQueries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userAuId]);

  const handleDownload = (queryId) => {
    const url = `${base_url}/credpro/user/${userAuId}/execute-query/${queryId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setDownloadProgress(0);
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>Assigned Queries:</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Query ID</th>
            <th>Query</th>
            <th>Query Name</th>
            <th>Download</th>
            <th>Download Progress</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.queryId}>
              <td>{query.queryId}</td>
              <td>{query.query}</td>
              <td>{query.queryName}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDownload(query.queryId)}
                >
                  Download
                </button>
              </td>
              <td>
                {downloadProgress !== 0 && (
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-valuenow={downloadProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${downloadProgress}%` }}
                    >
                      {downloadProgress}%
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignedQueriestoUser;