import { Form, Input, Button, Typography,Radio, Upload,Table,Select,message, Spin, Row, Col, Divider, InputNumber } from "antd";
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


function StudentRegister() {
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


  const onFinish = async (values) => {
    if (values.password !== values.c_password) {
      message.error("passwords do not match");
    } else {
      try {
        setLoading(true);
        delete values.c_password;
        console.log('final-val',values);
        const response = await StudentApi.create(values);
        console.log("Success", response.data);
        if (response) {
          // localStorage.setItem("token", response.data.token);
          // localStorage.setItem("user", JSON.stringify(response.data.user));
          // setIsLoggedIn(true);
          message.success("Account Created");
          // message.success("Logged in!");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        message.error("Email already exists");
        setLoading(false);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

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
          }}
        />
      ) : (
        <div
          style={{
            backgroundImage:`url(${numl})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            height:"150vh",
            width:"100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundAttachment:"fixed"
          }}
        >
          {/************ Regestration Container Started Here  **********/}
          <div className='container reg-div'>
          <div className='row '>
          <div className='col-lg-7 col-8 student_registration m-auto '>
          <h1 className='admin_Login_title'>Student <br/>Registeration Form </h1>
         
          <Form name="basic" style={{marginTop:"20px", width:"400px",margin:"0px auto",textAlign:"center"}} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
           
            <span style={{color:"white", marginLeft:"70px",float:"left" ,fontSize:"18px"}}>
              Full Name :
              </span>
              <Form.Item
                style={{  width: "300px", marginLeft: "60px", color:"white" }}
                name="name"
                rules={[{ 
                  required: true, 
                  message: "Please input your Name!",
                  
                  asyncValidator: (rule, value) => {
                  return new Promise((resolve, reject) => {
                    if (!value.match((/^[A-Za-z]|[A-Za-z]+(\s)[a-zA-Z]+$/))  ) {
                      reject('Please enter your valid Name');  // reject with error message
                    } 
                   
                    else {
                      resolve();
                    }
                  });
                }
                   
                   
                }]}
              >
                
                <Input/>
              </Form.Item>

              <span style={{color:"white",
            marginLeft:"70px",float:"left" ,fontSize:"18px"}}>
              System ID :</span>
              <Form.Item
              style={{
                width: "300px",
                marginLeft: "60px",
                color:"white"
              }}
               
                name="systemId"
                rules={[{ 
                  required: true, 
                  message: "System ID must be in formte of NUML-FXX-XXXXX!",
                  
                 asyncValidator: (rule, value) => {
                 return new Promise((resolve, reject) => {
                   if (!value.match((/[N/n][U/u][M/m][L/l]-([A-Za-z])[0-9]{2}-[0-9]{2}/))) {
                     reject('Enter valid system ID');  // reject with error message
                   } 
                   else {
                     resolve();
                   }
                 });
               }
                  
                  
               }]}
              >
                <Input/>
              </Form.Item>
              <span style={{color:"white",
            marginLeft:"70px",float:"left" ,fontSize:"18px"}}>
              Gender :</span>
              <Form.Item
          name="sex"
          
          initialValue="Male"
          rules={[
            {
              required: true,
              message: "Please select your Gender",
            },
          ]}
        >
          <Radio.Group >
            <Radio value="Male"><span style={{color:"white"}}>Male</span></Radio>
            <Radio value="Female"><span style={{color:"white"}}>Male</span></Radio>
          </Radio.Group>
        </Form.Item>

        <span style={{color:"white",
            marginLeft:"70px",float:"left" ,fontSize:"18px"}}>
              Phone Number :</span>

              <Form.Item
             style={{
                width: "300px",
                marginLeft: "60px",
                color:"white"
              }}
                
                name="phone"
                rules={[{ 
                  required: true, 
                  message: "Number Must be in format of 03XX-XXXXXXX!",
                  
                 asyncValidator: (rule, value) => {
                 return new Promise((resolve, reject) => {
                   if (!value.match((/03[0-9]{2}-[0-9]{7}/))) {
                     reject('Please enter your valid Name');  // reject with error message
                   } 
                   else {
                     resolve();
                   }
                 });
               }
                  
                  
               }]}
               
              >
              
                <Input/>
              </Form.Item>


              <span style={{color:"white",
            marginLeft:"70px",float:"left" ,fontSize:"18px"}}>
              Email :</span>
              <Form.Item
              style={{
                width: "300px",
                marginLeft: "60px",
                color:"white"
              }}
               
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input
                
                />
              </Form.Item>

              <span style={{color:"white",
            marginLeft:"70px",float:"left" ,fontSize:"18px"}}>
              Password :</span>     
              <Form.Item
              style={{
                width: "300px",
                marginLeft: "60px",
                color:"white"
              }}
               
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>


              <span style={{color:"white",
             marginLeft:"70px",
            float:"left" ,fontSize:"18px"}}>
              Conform Password :</span>
              <Form.Item
              style={{
                width: "300px",
                marginLeft: "60px",
                color:"white"
              }}
               
                name="c_password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
{/*          
        <Form.Item>
        <Upload {...propertiesUpload} onChange={(e)=> handleChange(e)}
        data={{name:'testing'}}>
    <Button icon={<UploadOutlined />}>Click to Upload Challan</Button>
  </Upload>
        </Form.Item> */}
         


             

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

            <Form.Item>
              <Button  className="btn btn-success"
                type="primary" htmlType="submit" style={{padding:"0px 40px",marginTop:"20px"}}>
                Submit
              </Button>
            </Form.Item>
            <div
              style={{
                // paddingRight:"90px",
                textAlign:"center"
              }}
            >
              <Link
              style={{marginLeft:"0px",width:"200px", color:"green"}}
               to="/login"> Admin Portal-(Login)</Link> <br/>
              <Link
              style={{marginLeft:"0px",width:"200px", color:"green"}}
              to="/student-portal">Student Portal-(Login)</Link>  <br/>
                 <Link
              style={{marginLeft:"0px", color:"green"}}
              to="/info">Buses/ Drivers Info</Link> <br/>
              {/* <Link to="/student-register">Student Portal-(Regestration)</Link> <br/> */}
            </div>
          </Form>
           </div>
          </div>
          </div>
          {/* Login Container End Here  */}


        </div>
      )}
    </>
  );
}

export default StudentRegister;
