// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Header() {

//   const navigate=useNavigate();

//   const handeLogout=()=>{
//     navigate("/");
//   }


//   return (
//     <div style={{ textAlign: "center", margin: "0rem 0" }}>
//       <h1>Welcome to CredPro Application</h1>
//       <button className="btn btn-danger" onClick={handeLogout}>Logout</button>
//     </div>
//   );
// }
// export default Header;


import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider"; // Import AuthContext

function Header() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authContext.logout();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", margin: "0rem 0" }}>
      <h1>Welcome to CredPro Application</h1>
      {authContext.isLoggedIn ? (
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/"></Link>
      )}
    </div>
  );
}

export default Header;

