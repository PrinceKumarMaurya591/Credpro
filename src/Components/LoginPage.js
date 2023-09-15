import React, { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "./AuthProvider";

function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const authContext = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;// || 'http://localhost:8080';

  
  const handleLogin = () => {
    console.log("userId:", userId); // Add this line
    console.log("apiUrl:", apiUrl);
    axios
      // .get(`http://localhost:8080/credpro/checkuseroradmin/${userId}`)
      .get(`${apiUrl}/credpro/checkuseroradmin/${userId}`)
      // .get(`${process.env.REACT_APP_API_URL}/credpro/checkuseroradmin/${userId}`)
      // .get(`http://localhost:8080/credprobackend/credpro/checkuseroradmin/${userId}`)
      .then((response) => {
        const role = response.data; // Assuming the backend returns the role as "RegularUser" or "Admin"
        // if (role === "RegularUser") {
        //   navigate("/user", { state: { userAuId: userId } }); // Pass the userAuId as state
        // } 
        if (role === "RegularUser") {
          navigate(`/user-dashboard/${userId}`); // Pass the userAuId as state
         
        } 
        //Dashboard
        else if (role === "Admin") {
          //navigate("/admin", { state: { adminAuId: userId } }); // Pass the userAuId as state
          // navigate(`/admin/${userId}/add-user`, { state: { adminAuId: userId } });
          console.log("useridin login -----------" + userId);
          navigate(`/admin/${userId}`, { state: { adminAuId: userId } });
          // navigate(`/admin/${userId}`);
         
        } 
        else {
          // Handle invalid response or show an error message
        }
      }) 
      .catch((error) => {
        // Handle errors or show an error message
        console.error(error);
      });

      authContext.login();
  };

  const imageStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    
  };
  

  return (
    <div className="loginform">
    
      <div className="login-page-container auth-form-container">
        <h1>Login Page</h1>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="link-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;





// "homepage": "http://localhost:8080/sampleapp",


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Login.css';
// import CryptoJS from "crypto-js";

// function LoginPage() {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");

//   const encryptPassword = (password, secretKey) => {
//     const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
//     return encryptedPassword;
//   };

//   const handleLogin = () => {
//     const secretKey = "APuZKpRBPv8aEenc"; // Replace with your secret key
//     const encryptedPassword = encryptPassword(password, secretKey);

//     axios.get(`https://osbuat.aubankuat.in/LDAPLoginEncServiceV1/loginV2`, {
//       params: {
//         UserID: userId,
//         Password: encryptedPassword,
//         Channel: "<Channel>" // Replace with the actual channel
//       }
//     })
//     .then(response => {
//       const responseData = response.data;
//       if (responseData.return === "true") {
//         const role = responseData.role;
//         if (role === "RegularUser") {
//           navigate("/user", { state: { userAuId: userId } });
//         } else if (role === "Admin") {
//           // Redirect to the admin page with adminAuId in the URL
//           navigate(`/admin/${userId}`);
//         } else {
//           // Handle other roles or success responses
//         }
//       } else {
//         // Handle failure response
//         console.log("Login failed");
//       }
//     })
//     .catch(error => {
//       // Handle errors or show an error message
//       console.error(error);
//     });
//   };

//   return (
//     <div className="loginform">
//       <div className="login-page-container auth-form-container">
//         <h1>Login Page</h1>
//         <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//         <button className="link-btn" onClick={handleLogin}>Login</button>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

