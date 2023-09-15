import React ,{useContext}from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap"; // Import your button library here
import { AuthContext } from "./AuthProvider"; // Import AuthContext
// import { useContext } from "react";

function BackButton() {
//   const history = useHistory();

 
  const navigate = useNavigate();
  
  const authContext = useContext(AuthContext);

  const handleBack = () => {
    navigate(-1) ;// Go back to the previous page in history
  };

  return (
    authContext.isLoggedIn && (
      <Button color="secondary" onClick={handleBack}>
        Back
      </Button>
    )
  );
}

export default BackButton;
