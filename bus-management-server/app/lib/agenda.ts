import Agenda from 'agenda';
import config from '../config';

export default ({ mongoConnection }) => {
    return new Agenda({
      mongo: mongoConnection, //its a mongodbconnection page loaded here
      db: { collection: config.agenda.dbCollection }, //mongodb collections
      processEvery: config.agenda.pooltime,//The processEvery parameter is the interval at which agenda checks if there are tasks to be run.
      maxConcurrency: config.agenda.concurrency, //akes a number which specifies the max number of jobs that can be running at any given moment. By default it is 20
    });
  
  };


/*************************************/
//  const Agenda = require('agenda');
// const connectionString = 'mongodb://127.0.0.1/our-app-db';

// const agenda = new Agenda({
//     db: {address: connectionString, 
//           collection: 'ourScheduleCollectionName'},
//           processEvery: '30 seconds'
// });