import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import routeService from '../../services/route';
import { Container } from 'typedi';
import { IRouteInput } from '../../interfaces/IRoute';

const route = Router();

export default (app: Router) => {
  app.use('/routes', route);
  const routeServiceInstance = Container.get(routeService);

  //get All
  route.get('/all',async (req: Request, res: Response) => {
    try{
        // let location =req.body.location;
        const {routes} = await routeServiceInstance.getRoutes();
        return res.json(routes).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id', async (req: Request, res: Response)=>{
    try{
        const {route} = await routeServiceInstance.getRoute(req.params.id);
        return res.json(route).status(200);

    }catch(e){

    }

  })


  //create Route
  route.post('/add', 
    celebrate({
        body:Joi.object({
            name: Joi.string().required(),
            stops: Joi.array()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { route, success } = await routeServiceInstance.addRoute(req.body as IRouteInput);
            return res.status(201).json({route, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  


  //update Route
  route.put('/:id', celebrate({body:Joi.object({name: Joi.string().required(), stops: Joi.array()})
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
    console.log('_id', req.params.id)
        // logger.debug('req', req.body);
        try{
            
            const { message, success } = await routeServiceInstance.updateRoute(req.params.id as any, req.body as IRouteInput);
            return res.status(201).json({message, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  
    //delete Route
  route.delete('/:id', async(req:Request, res:Response, next: NextFunction)=>{
      try{
          const {  success } = await routeServiceInstance.deleteRoute(req.params.id as any);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })



  
    


  
};
