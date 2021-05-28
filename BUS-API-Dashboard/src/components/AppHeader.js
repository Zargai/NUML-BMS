import React from "react";
// import { Layout, Menu } from "antd";
// import { useHistory } from "react-router-dom";
import { Typography } from "antd";

function AppHeader() {
  const { Title } = Typography;
  const { Link } = Typography;
  
  return (
    <div >
      <div>
        <Link href="/">
          <Title style={{paddingTop:"20px",color:"white",marginBottom:"30px"}}>NUML Bus Management</Title>
        </Link>
      </div>
    </div>
  );
}

export default AppHeader;
