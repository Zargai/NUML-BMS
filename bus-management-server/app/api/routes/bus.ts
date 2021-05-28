import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import busService from '../../services/bus';
import { Container } from 'typedi';
import { IBusInput } from '../../interfaces/IBus';

const route = Router();

export default (app: Router) => {
  app.use('/buses', route);
  const departmentServiceInstance = Container.get(busService);

  //get All
  route.get('/all', async (req: Request, res: Response) => {
    try{
        // let location =req.body.location;
        const {buses} = await departmentServiceInstance.getBuses();
        return res.json(buses).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id', async (req: Request, res: Response,next: NextFunction)=>{
    try{
        console.log("update bus id",req.params.id)
        const {bus} = await departmentServiceInstance.getBus(req.params.id);
        console.log("buses",bus)
        return res.status(201).json(bus)

    }catch(e){
        return next(e)
    }
  })


  //create Bus
  route.post('/add', 
    celebrate({
        body:Joi.object({
            name: Joi.string().required(),
            capacity:Joi.number(),
            assignedRoute: Joi.string(),
            assignedDriver: Joi.string(),

        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { bus, success } = await departmentServiceInstance.addBus(req.body as IBusInput);
            return res.status(201).json({bus, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  


  //update Bus
  route.put('/:id', middlewares.isAuth, celebrate({body:Joi.object({
      name: Joi.string(),
      capacity: Joi.number(),
      assignedRoute: Joi.string(),
      assignedDriver: Joi.string()
    })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
    console.log('_id', req.params.id)
        // logger.debug('req', req.body);
        try{
            
            const { message, success } = await departmentServiceInstance.updateBus(req.params.id as any, req.body as IBusInput);
            return res.status(201).json({message, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  
    //create Bus
  route.delete('/:id',middlewares.isAuth, async(req:Request, res:Response, next: NextFunction)=>{
      try{
          const {  success } = await departmentServiceInstance.deleteBus(req.params.id as any);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

};
