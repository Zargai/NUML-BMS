import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import supportService from '../../services/support';
import { Container } from 'typedi';
import { ISupportInput } from '../../interfaces/ISupport';

const route = Router();

export default (app: Router) => {
  app.use('/supports', route);
  const supportServiceInstance = Container.get(supportService);

  //get All
  route.get('/all',async (req: Request, res: Response) => {
    try{
        // let location =req.body.location;
        const {supports} = await supportServiceInstance.getSupports();
        return res.json(supports).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id', async (req: Request, res: Response)=>{
    try{
        const {support} = await supportServiceInstance.getSupport(req.params.id);
        return res.json(support).status(200);

    }catch(e){

    }

  })


  //create Support
  route.post('/add', 
    celebrate({
        body:Joi.object({
            title: Joi.string().required(),
            message: Joi.string().required(),
            studentId: Joi.string().required(),
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
        console.log('ye-chala-hai-bhai')
    // const logger = Container.get('logger');
    console.log('create-support', req.body);
        // logger.debug('req', req.body);
        try{
            const { support, success } = await supportServiceInstance.addSupport(req.body as ISupportInput);
            return res.status(201).json({support, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  


  //update Support
  route.put('/:id', celebrate({body:Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    studentId: Joi.string().required(),
})
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
    console.log('_id', req.params.id)
        // logger.debug('req', req.body);
        try{
            
            const { message, success } = await supportServiceInstance.updateSupport(req.params.id as any, req.body as ISupportInput);
            return res.status(201).json({message, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  
    //create Support
  route.delete('/:id', async(req:Request, res:Response, next: NextFunction)=>{
      try{
          const {  success } = await supportServiceInstance.deleteSupport(req.params.id as any);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })



  
    


  
};
