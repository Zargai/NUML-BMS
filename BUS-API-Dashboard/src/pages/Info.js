import { Form, Input, Button, Typography,Radio, Upload,Table,Select,message, Spin, Row, Col, Divider } from "antd";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { Link } from "react-router-dom";
import numl from '../numl.jpg'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { DepartmentApi , BusApi,StudentApi,RouteApi, DriverApi} from "../services/api";
const { Option } = Select;


const propertiesUpload = {
  name: 'myFile',
  action: 'http://localhost:8080/api/auth/upload',
  headers: {
    authorization: 'authorization-text',
  }
}


function Info() {
  const { Title } = Typography;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slipPhoto, SetSlipPhoto] = useState();
  const [mounted, setMounted] = useState(true);

  // const [mounted, setMounted] = useState(true);

  // const [departments, setDepartments] = useState([]);
  // const [form] = Form.useForm();


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length

    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      editable: true,
      sorter: (a, b) => a.capacity - b.capacity

    },
    {
      title: "AssignedRoute",
      dataIndex: "assignedRoute",
      key: "assignedRoute",
      editable: true,
      sorter: (a, b) => a.assignedRoute.length - b.assignedRoute.length,
      render: (_, record) => {
        return record.assignedRoute.name;
      },
    },
    {
      title: "AssignedDriver",
      dataIndex: "assignedDriver",
      key: "assignedDriver",
      editable: true,
      render: (_, record) => {
        return record.assignedDriver.name;
      },
    }
  ];

  const columnsRoute = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      editable: true,
    },
    {
      title: "Start Point",
      dataIndex: "startPoint",
      key: "startPoint",
      editable: false,
      render: (_, record) =>{
       return <span>
          {record.stops.length >0 ? record?.stops[0].title : ''}
        </span>
      }
    },

    {
      title: "End Point",
      dataIndex: "endPoint",
      key: "endPoint",
      editable: false,
      render: (_, record) =>{
       return <span>
          {record.stops.length >0 ? record?.stops[record.stops.length -1].title : ''}
        </span>
                         }
    }
    

  ];

  const getBuses = async () => {
    try {
      setLoading(true);
      const response = await BusApi.getAll();
      const newResponse = [...response.data].map((bus) => {
        const object = {
          ...bus,
          key: bus._id,
        };
        return object;
      });

      setBuses(newResponse);
      setLoading(false);
      console.log("Response:", newResponse);
      console.log("BUSES", buses);
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
  };

  const getRoutes = async () => {
    try {
      setLoading(true);
      const response = await RouteApi.getAll();

      console.log("response", response);

      const newResponse = [...response.data].map((route) => {
        const object = {
          ...route,
          key: route._id,
        };
        return object;
      });

      console.log("newResponse");

      setRoutes(newResponse);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  const handleChange = (e)=>{
    console.log('change',e);
    if(e.file.status == 'done'){
      // set the file url 
      alert('uploaded file');
      let imgUrl = e.file.response.file;
      console.log('use', imgUrl)
      if(imgUrl){
        SetSlipPhoto(imgUrl);
      }
    }

  }


  useEffect(() => {
    const response = async () => {
      try {
        const myBuses = await BusApi.getAll();
        const myRoutes = await RouteApi.getAll();
        setBuses(myBuses.data);
        setRoutes(myRoutes.data);
      } catch (error) {
        console.log(error);
      }
    }
    response();
    getBuses();

    return () => {
      setMounted(false);
    };
    
  }, [setMounted]);

    // useEffect(() => {
    // const response = async () => {
    //   try {
    //     const myDepartments = await DepartmentApi.getAll();
    //     setDepartments(myDepartments.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // if (mounted === true) {
    // }
    // response();
    // return () => {
    //   setMounted(false);
    // };
  // }, [setMounted]);


//   const onFinish = async (values) => {
//     if (values.password !== values.c_password) {
//       message.error("passwords do not match");
//     } else {
//       try {
//         setLoading(true);
//         delete values.c_password;
//         console.log('final-val',values);
//         const response = await StudentApi.create(values);
//         console.log("Success", response.data);
//         if (response) {
//           // localStorage.setItem("token", response.data.token);
//           // localStorage.setItem("user", JSON.stringify(response.data.user));
//           // setIsLoggedIn(true);
//           message.success("Account Created");
//           message.success("Logged in!");
//           setLoading(false);
//         }
//       } catch (error) {
//         console.log(error);
//         message.error("Email already exists");
//         setLoading(false);
//       }
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log(errorInfo);
//   };

  return (
    <>
      {isLoggedIn ? (
        <Redirect to="/app" />
      ) : loading ? (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "47%",
            right: "50%",
            transform: "translate(0, -50%)",
            label:"Loading"
          }}
        />
      ) : (
         
        
        <div
          style={{
            backgroundImage:`url(${numl})`,
            
            backgroundSize:"cover",
            backgroundPosition:"center",
            height:"auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundAttachment:"fixed",
          }}
        >
           {/************ Container Started Here  **********/}
           <div className='container'>
          <div className='row '>
          <div className='col-12 mx-auto my-5 info_center'>
          <h1 className='admin_Login_title text-center'> Bus/Routes - Information </h1>
          
         
      


<Row style={{width:'100%'}}>
<Col span={22} >

  <h1 style={{textAlign:"center",color:"whitesmoke"}}>Buses</h1>

<Table
        loading={loading}
        components={{
          body: {},
        }}
        bordered
        dataSource={buses}
        columns={columns}
        style={{
          marginLeft:"60px"
        }}
        
      />
      </Col>
</Row>
<Row style={{width:'100%'}}>
<Col span={22} >
<h1 style={{textAlign:"center",color:"whitesmoke"}}>Routes</h1>

      <Table
     
        loading={loading}
        components={{
          body: {},
        }}
        bordered
        dataSource={routes}
        columns={columnsRoute}
        style={{
          marginLeft:"70px",
         
        }}

        
      />
      </Col>
</Row>
             
<Link
              style={{marginLeft:"10px",width:"200px", color:"green"}}
              to="/student-portal">Student(Login)</Link>  <br/>
              <Link
              style={{marginLeft:"10px", color:"green"}}
              to="/student-register">Student(Regestration)</Link> <br/>
            

            </div>
          </div>
          </div>
          {/* Container End Here  */}  


        </div>
       
      )}
    </>
  );
}

export default Info;
