// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import base_url from "../ApiServices/BackendAPIs";

// function DeleteUser() {
//   const [userId, setUserId] = useState("");

//   const handleInputChange = (e) => {
//     setUserId(e.target.value);
//   };

//   const handleDeleteUser = (e) => {
//     e.preventDefault();
//     if (!userId) {
//       toast.error("Please enter a user ID.", { position: "bottom-center" });
//       return;
//     }

//     axios
//       .delete(`${base_url}/credpro/admin/${userId}`)
//       .then((response) => {
//         console.log(response.data);
//         toast.success("User deleted successfully.", {
//           position: "bottom-center",
//         });
//         setUserId("");
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Failed to delete user.", { position: "bottom-center" });
//       });
//   };

//   return (
//     <div style={{ height: "90vh" }}>
//       <h1>Delete User</h1>
//       <form onSubmit={handleDeleteUser}>
//         <div className="form-group">
//           <label htmlFor="userId">User ID:</label>
//           <input
//             type="number"
//             className="form-control"
//             id="userId"
//             value={userId}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-danger">
//           Delete User
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }

// export default DeleteUser;
