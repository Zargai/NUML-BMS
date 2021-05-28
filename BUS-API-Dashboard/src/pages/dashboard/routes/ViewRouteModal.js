import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col, Select } from "antd";
import GoogleMap from "google-map-react";


const { Option } = Select;

const K_WIDTH = 40;
const K_HEIGHT = 40;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: "5px solid green",
  borderRadius: K_HEIGHT,
  backgroundColor: "white",
  textAlign: "center",
  color: "#3f51b5",
  fontSize: 16,
  fontWeight: "bold",
  padding: 4,
};
const disabledPlaces = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: "5px solid red",
  borderRadius: K_HEIGHT,
  backgroundColor: "white",
  textAlign: "center",
  color: "#3f51b5",
  fontSize: 16,
  fontWeight: "bold",
  padding: 4,
};

const MyGreatPlace = (props) => {
  return <div style={props.disabled == false ? greatPlaceStyle:disabledPlaces} >{props.title}</div>;
};

const ViewRouteModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const [markers, setMarkers] = useState([]);

  const onSubmit = () => {

    console.log('markers' ,markers);
    let response = {
      name: title, 
      stops: markers
    }
  

    onCreate(response);

    // form
    //   .validateFields()
    //   .then((values) => {
    //     console.log('v',values);
    //     form.resetFields();
    //     onCreate(values);
    //   })
    //   .catch((info) => {
    //     console.log("Validate Failed:", info);
    //   });
  };


  const YOUR_GOOGLE_MAP_API_KEY = "AIzaSyA7jbl5TnQofa0ALQyN6uWXoui92Kw_Otg";
  const center = [33.738045, 73.084488];
  const zoom = 7;

  const [title, setTitle] = useState();
  const addMarker = (event)=>{
    let data = {
      title: "",
      lat: event.lat || null,
      long: event.lng || null,
      disabled: false,
    };
    markers.push(data);
    console.log('markers', markers);
    setMarkers([...markers])
  }


  const setTitleValue = (e,i) =>{
    console.log('word', e.target.value);
    markers[i].title = e.target.value;
    setMarkers([...markers])
  }

  const setDisabledValue = (e,i) => {
    console.log('e', e);
    markers[i].disabled = e === 'true' ? true : false;
    setMarkers([...markers])
  
  }

  return (
    <Modal
      visible={visible}
      title="Create Route"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSubmit();
      }}
    >
      <div style={{ height: "20vh", width: "100%" }}>
        <GoogleMap
          apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          center={center}
          key="mapx"
          zoom={zoom}
          onClick={(event) => addMarker(event)
          }
          // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded
          // onGoogleApiLoaded={({ map, maps }) => ModelsMap(map, maps)}
        >
          {markers.map((m, indexValue) => (
            <MyGreatPlace lat={m.lat || null} lng={m.long || null} title={indexValue+1 || ''} disabled={m.disabled || false} />
          ))}
        </GoogleMap>
      </div>

      <div>
      <Row span={12} style={{margin:'10px'}}>
            <Col span={12}>
            <Input placeholder="Route Name" value={title} onChange={(event)=> setTitle(event.target.value)} />
            </Col>
          </Row>
        <h2> Stops </h2>

        <div>
         
          {markers && markers.map((item, index) => (
            <div className="site-input-group-wrapper">
              <span>Stop {index+1}</span>
              <Input.Group size="large">
                <Row gutter={20}>
                  <Col span={5}>
                    <Input value={item.lat} placeholder="Latitude"  />
                  </Col>
                  <Col span={5}>
                    <Input value={item.long} placeholder="Longitude" />
                  </Col>
                  <Col span={8}>
                    <Input value={markers[index].title} placeholder="title" onChange={($event)=>setTitleValue($event, index)} />
                  </Col>
                  <Col span={3}>
                    <Input.Group compact>
                      <Select defaultValue="false" placeholder="Disabled" onChange={($event) => setDisabledValue($event, index)}>
                        <Option value="false">False</Option>
                        <Option value="true">True</Option>
                      </Select>
                    </Input.Group>
                  </Col>
                </Row>
              </Input.Group>
              <br />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ViewRouteModal;
