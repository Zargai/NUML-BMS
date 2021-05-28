import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import DriverService from '../../services/driver';
import { Container } from 'typedi';
import { IDriverInput } from '../../interfaces/IDriver';

const route = Router();

export default (app: Router) => {
  app.use('/drivers', route);
  const driverServiceInstance = Container.get(DriverService);

  //get All
  route.get('/all',async (req: Request, res: Response) => {
    try{
        // let location =req.body.location;
        const {drivers} = await driverServiceInstance.getDrivers();
        return res.json(drivers).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id', async (req: Request, res: Response)=>{
    try{
        const {driver} = await driverServiceInstance.getDriver(req.params.id);
        return res.json(driver).status(200);

    }catch(e){

    }

  })


  //create Driver
  route.post('/add',  
    celebrate({
        body:Joi.object({
            name: Joi.string().required(),
            phone: Joi.string(),
            assignedBus: Joi.string()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { driver, success } = await driverServiceInstance.addDriver(req.body as IDriverInput);
            console.log("Driver==>",driver)
            return res.status(201).json({driver, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  


  //update Driver
  route.put('/:id', celebrate({body:Joi.object({ 
    name: Joi.string().required(),
    phone: Joi.string(),
    assignedBus: Joi.string()
})
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
    console.log('_id', req.params.id)
        // logger.debug('req', req.body);
        try{
            const { message, success } = await driverServiceInstance.updateDriver(req.params.id as any, req.body as IDriverInput);
            return res.status(201).json({message, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  
    //create Driver
  route.delete('/:id', async(req:Request, res:Response, next: NextFunction)=>{
      try{
          const {  success } = await driverServiceInstance.deleteDriver(req.params.id as any);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })



  
    


  
};
