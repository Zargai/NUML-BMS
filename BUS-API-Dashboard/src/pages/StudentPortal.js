import { Form, Input, Button, message,Upload, Typography, Spin, Row, Col, Image,Tag,
  Descriptions, Badge 

} from "antd";
import numl from '../numl.jpg'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { StudentApi } from "../services/api";
import { UploadOutlined } from '@ant-design/icons';
import {SupportApi } from '../services/api';

const { TextArea } = Input;

let mock ={
  "verified": false,
  "slipVerified": false,
  "_id": "60a689d6049eb73a10badeac",
  "name": "Muhammad Abrar",
  "email": "abrar@gmail.com",
  "password": "12345",
  "phone": "0312312312312312",
  "systemId": "numl-f19-28876",
  "department": "60a678d223c07001c42e2828",
  "sex": "Male",
  "createdAt": "2021-05-20T16:09:58.369Z",
  "updatedAt": "2021-05-20T16:09:58.369Z",
  "__v": 0
}


const propertiesUpload = {
  name: 'myFile',
  action: 'http://localhost:8080/api/auth/upload',
  headers: {
    authorization: 'authorization-text',
  }
}

function StudentPortal() {
  const { Title } = Typography;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState();
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [slipPhoto, SetSlipPhoto] = useState();



  
 
  const  handleChange = async(e)=>{
    console.log('change',e);
    if(e.file.status == 'done'){
      // set the file url 
      message.success('File Uploaded');
      let imgUrl = e.file.response.file;
      console.log('use', imgUrl)
      if(imgUrl){
        SetSlipPhoto(imgUrl);
         setStudent({...student, slipPhoto: imgUrl});

       await StudentApi.update(student._id, {
          slipPhoto: imgUrl
        });

        
      }
    }

  }


const onSubmit = () =>{
  setLoading(true);
  let data = {
    title,
    message:msg,
    studentId: student._id
  }
  console.log('data', data);
  SupportApi.create(data).then(res=>{
message.success('Support Ticket Created');
setTitle('');
setMsg('');

    setLoading(false);
  })
}



  useEffect(() => {
    setLoading(false);
    let loggedIn = true;
    const token = localStorage.getItem("token");
    if (token !== null && loggedIn === true) {
      setIsLoggedIn(true);
    }

    return () => (loggedIn = false);
  }, []);

  const onFinish = async (values) => {
    console.log('values', values)
    try {
      setLoading(true);
      const response = await StudentApi.queryStudent(values);
      if (response && response.data && response.data.systemId) {
        setStudent(response.data);
        message.success("Profile Loaded ",response.data);
        setLoading(false);
      }else{
        message.error("No Record found.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
            backgroundAttachment:"fixed",
            height:"auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop:"100px"
          }}
        >
          {/************ Student-Portal Container Started Here  **********/}
          <div className='container'>
          <div className='row '>
          <div className='col-lg-6 col-10 student_login m-auto '>
          <h1 className='admin_Login_title'>Student Login</h1>
          <Form

            // {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="student_login_form">
            <span style={{color:"white",
           marginLeft:"110px",float:"left" ,fontSize:"20px"}}>
              System ID :</span>
                 <Form.Item
                style={{
                  width: "300px",
                  marginLeft: "100px",
                
                }}
               
                name="systemId"
                rules={[{ 
                  required: true, 
                  message: "System ID must be in formate of NUML-FXX-XXXXX!",
                  
                 asyncValidator: (rule, value) => {
                 return new Promise((resolve, reject) => {
                   if (!value.match((/[N/n][U/u][M/m][L/l]-([A-Za-z])[0-9]{2}-[0-9]{1}/))) {
                     reject('Enter valid system ID');  // reject with error message
                   } 
                   else {
                     resolve();
                   }
                 });
               }
                  
                  
               }]}
              >
                <Input />
              </Form.Item>
              {/* <Form.Item
                style={{
                  width: "92.45%",
                  marginLeft: "1.4rem",
                }}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input Correct Email!",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}
               <span style={{color:"white",
           marginLeft:"110px",float:"left" ,fontSize:"20px"}}>
              Password :</span>
              <Form.Item
              style={{
                width: "300px",
                marginLeft: "100px",
              
              }}
              
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            
            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}
          
              <Form.Item>
                <Button className="btn btn-success" style={{padding:"0px 40px",marginTop:"20px"}}
                 type="primary" htmlType="submit" >
                  Search
                </Button>
              </Form.Item>
            
            
            
            
            <div
               style={{
                 paddingRight:"90px",
                textAlign: "center",
                
              }}
            >

              <Link 
               style={{marginLeft:"100px", color:"green"}}
              to="/login"> Admin Portal-(Login)</Link> <br/>
              {/* <Link to="/student-portal">Student Portal-(Login)</Link>  <br/> */}
              <Link 
               style={{marginLeft:"100px", color:"green"}}
              to="/student-register">Student Portal-(Regestration)</Link> <br/>
                 <Link
              style={{marginLeft:"100px", color:"green"}}
              to="/info">Buses/ Drivers Info</Link> <br/>
            </div>
            </div>
          </Form>
          </div>
          </div>
          </div>
          {/* Student-Portal Container End Here  */}
         
     <div className='student_portal'>
     <div className='student_portal_bg'>
       
          {
            student &&
            (<Row style={{paddingLeft:"200px"}}>
              <Col>
               <h2 style={{fontWeight: "bolder",textShadow: "white 1px 0px",padding:"20px 0px",fontSize:"40px",
    color: "rgba(4, 114, 4, 0.774)"}}>Welcome {student.name}</h2>
              <Descriptions className="bg-success"  style={{color:"white"}} bordered>
    <Descriptions.Item  label="Full Name" labelStyle={{color:"black"}} style={{color:"white"}}>{student.name}</Descriptions.Item>
    <Descriptions.Item label="Email Address"labelStyle={{color:"black"}} style={{color:"white"}}>{student.email}</Descriptions.Item>
    <Descriptions.Item label="Contact Number"labelStyle={{color:"black"}} style={{color:"white"}}>{student.phone}</Descriptions.Item>

    <Descriptions.Item label="Slip Verified"labelStyle={{color:"black"}} style={{color:"white"}}>
    <Badge labelStyle={{color:"black"}} style={{color:"white"}} status={student.slipVerified == true ? 'success':'error'} text={student.slipVerified == true ? 'Verified':'Not Verified'} />
    </Descriptions.Item>
    <Descriptions.Item label="Updated At"labelStyle={{color:"black"}} style={{color:"white"}}>{new Date(student?.updatedAt).toUTCString()}</Descriptions.Item>
    <Descriptions.Item label="System ID">
    <Tag color={'green'} key={student.systemId}>
              {student.systemId?.toUpperCase() || ''}
            </Tag></Descriptions.Item>
    {/* <Descriptions.Item label="Created At" span={2}>
    {student.createdAt ? new Date(student?.createdAt).toUTCString() : ''}
    </Descriptions.Item> */}
    {/* <Descriptions.Item  labelStyle={{color:"black"}} style={{color:"white"}} label="Account Status" span={3}>
      <Badge labelStyle={{color:"black"}} style={{color:"white"}} status={student.verified == true ? 'success':'warning'} text={student.verified == true ? 'Active':'Not Active'} />
    </Descriptions.Item> */}
    <Descriptions.Item labelStyle={{color:"black"}} style={{color:"white"}} label="Gender ">{student.sex}</Descriptions.Item>
    <Descriptions.Item labelStyle={{color:"black"}} style={{color:"white"}} label="Slip Photo">
      <Image labelStyle={{color:"black"}} style={{color:"white"}}  src={student.slipPhoto ||'https://www.wkbn.com/wp-content/uploads/sites/48/2020/06/missing-generic.jpg'} style={{width:'250px'}} />
      <br/>
      <br/>
      <Form.Item style={{color:"white"}}>
        <Upload labelStyle={{color:"black"}} style={{color:"white"}} {...propertiesUpload} onChange={(e)=> handleChange(e)}
        data={{name:'testing'}}>
    <Button style={{color:"black"}} icon={<UploadOutlined />}>Click to Upload Challan</Button>
  </Upload>
        </Form.Item>
    </  Descriptions.Item >
    {/* <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1<br />
    </Descriptions.Item> */}
  </Descriptions>

              
              </Col>
              <Col style={{alignItems:"center",margin:"20px 250px" }}>
              <h2 style={{fontWeight: "bolder",textShadow: "white 1px 0px", marginBottom:"20px",
    color: "rgba(4, 114, 4, 0.774)"}}>Send Message To Support</h2>
              <Input className="bg-success" value={title} placeholder="Title..."  style={{marginBottom:'10px',color:"white"}} onChange={(e)=> setTitle(e.target.value)} />
              <TextArea style={{color:"white"}} className="bg-success" value={msg} rows={3} placeholder="Write your Message...!" onChange={(e)=> setMsg(e.target.value)}  />
              <Button className="btn btn-success" style={{padding:"0px 40px",marginTop:"20px"}} onClick={onSubmit}>Send Message</Button>
              </Col>
            </Row>)
           
            
          }

           
          </div>
        </div>
        </div>
      )}
    </>
  );
}

export default StudentPortal;
