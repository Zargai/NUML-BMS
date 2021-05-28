import { Statistic, Card, Row, Col,message } from 'antd';
import { TeamOutlined, HomeOutlined,EnvironmentOutlined,UsergroupAddOutlined,CarOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import {Admin } from '../../../services/api'




function Dashboard() {


  const [statistics, setStatistics] = useState();
  const [mounted, setMounted] = useState(true);


  const getStatistics = async () => {
    try {

      const response = await Admin.getStatistics();
      const newResponse = response.data;
      console.log("newResponse", newResponse);
      setStatistics(newResponse);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (mounted === true) {
      getStatistics();
      console.log('statis', statistics);
    }
    return () => {
      setMounted(false);
    };
  }, [setMounted]);


  return (
    
    <div style={{
        padding: '30px',
        background: '#ececec'
    }}>
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Total Students"
            value={statistics?.students || ''}
            valueStyle={{ color: '#3f8600' }}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Total Drivers"
            value={statistics?.drivers}
            
            valueStyle={{ color: '#3f8600' }}
            prefix={<UsergroupAddOutlined />}
            
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Total Buses"
            value={statistics?.buses}
            
            valueStyle={{ color: '#3f8600' }}
            prefix={<CarOutlined />}
            
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Active Routes"
            value={statistics?.routes}
            
            valueStyle={{ color: '#3f8600' }}
            prefix={<EnvironmentOutlined />}
            
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Departments"
            value={statistics?.departments}
            
            valueStyle={{ color: '#cf1322' }}
            prefix={<HomeOutlined />}
            
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Support Ticket"
            value={statistics?.supports}
            
            valueStyle={{ color: '#cf1322' }}
            prefix={<HomeOutlined />}
            
          />
        </Card>
      </Col>
    </Row>
  </div>
  );
}

export default Dashboard;
