import expressLoader from './express';
import mongooseLoader from './mongoose';
// import redisLoader from './redis';
import Logger from './logger';
import injector from './injector'

export default async ({ expressApp }) => {

  const mongoConnection = await mongooseLoader()
  // const redisConnection = await redisLoader()
  const userModel = {
      name: 'userModel',
      model: require('../models/user').default,
    };
    const departmentModel = {
      name: 'departmentModel',
      model: require('../models/department').default,
    };
    const supportModel = {
      name: 'supportModel',
      model: require('../models/support').default,
    };
    const studentModel = {
      name: 'studentModel',
      model: require('../models/student').default,
    };
    const busModel = {
      name: 'busModel',
      model: require('../models/bus').default,
    };
    const routeModel = {
      name: 'routeModel',
      model: require('../models/route').default,
    };
    const driverModel = {
      name: 'driverModel',
      model: require('../models/driver').default,
    };
    

  const { agenda } = await injector({
    mongoConnection,
    models: [
      userModel,
      departmentModel,
      busModel,
      driverModel,
      routeModel,
      studentModel,
      supportModel

    ]
  });

    await expressLoader({ app: expressApp });
    Logger.info('Express ready to go!!');
  
  };