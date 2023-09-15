import React ,{useState,useEffect}from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { ListGroup, ListGroupItem } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { encryptData, decryptData } from "./AESEncryptionAndDecryption";
function AdminMenu() {

  
   const { adminAuId } = useParams();
  console.log("adminAuId in admin menue:" + adminAuId);

  // const [decryptedAdminAuId, setDecryptedAdminAuId] = useState(null);

  // useEffect(() => {
  //   // Decrypt the adminAuId when the component mounts
  //   const decryptedId = decryptData(adminAuId);
  //   console.log("adminAuId in admin menue:" + decryptedId);
  //   setDecryptedAdminAuId(decryptedId);
  // }, [adminAuId]);


  return (
    <ListGroup>
     
      <ListGroupItem tag={Link} to={`/admin/${adminAuId}/add-query`}action>
        Add Query
      </ListGroupItem>
     
      <ListGroupItem tag={Link} to={`/admin/${adminAuId}/add-user`} action>
        Add Users
      </ListGroupItem>

      <ListGroupItem tag={Link} to={`/admin/${adminAuId}/delete-user`} action>
       Delete Users
      </ListGroupItem>

      <ListGroupItem tag={Link} to={`/admin/${adminAuId}/show-all-users`} action>
        Show ALL Users
      </ListGroupItem>
      {/* <ListGroupItem tag={Link} to={`/admin/${adminAuId}/execute-query`} action>
        Execute For Admin Query
      </ListGroupItem> */}


{/* <ListGroupItem
  tag={Link}
  to={`/admin/${adminAuId}/execute-query`} // Define the URL path
  action
>
  Execute Queries by Admin
</ListGroupItem> */}

      <ListGroupItem tag={Link} to={`/admin/${adminAuId}/assign-queries`} action> Assign Queries </ListGroupItem>

      <ListGroupItem tag={Link} to={`/admin/${adminAuId}/show-all-queries`} action>
        Show ALL Queries
      </ListGroupItem>

      <ListGroupItem tag={Link} to={`/admin/${adminAuId}/update-queries`} action>
        Update Queries 
        
      </ListGroupItem>


      <ListGroupItem tag={Link} to={`/admin/${adminAuId}/update-user`} action>
        Update User
        
      </ListGroupItem>


    </ListGroup>
  );
}

export default AdminMenu;





