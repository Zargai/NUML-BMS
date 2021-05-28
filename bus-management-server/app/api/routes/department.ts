import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import departmentService from '../../services/department';
import { Container } from 'typedi';
import { IDepartmentInput } from '../../interfaces/IDepartment';

const route = Router();

export default (app: Router) => {
  app.use('/departments', route);
  const departmentServiceInstance = Container.get(departmentService);

  //get All
  route.get('/all',async (req: Request, res: Response) => {
    try{
        // let location =req.body.location;
        const {departments} = await departmentServiceInstance.getDepartments();
        return res.json(departments).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id', async (req: Request, res: Response)=>{
    try{
        const {department} = await departmentServiceInstance.getDepartment(req.params.id);
        return res.json(department).status(200);

    }catch(e){

    }
  })



  //create Department
  route.post('/add', 
    celebrate({
        body:Joi.object({
            title: Joi.string().required()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { department, success } = await departmentServiceInstance.addDepartment(req.body as IDepartmentInput);
            return res.status(201).json({department, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  


  //update Department
  route.put('/:id', celebrate({body:Joi.object({title: Joi.string().required()})
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
    console.log('_id', req.params.id)
        // logger.debug('req', req.body);
        try{
            
            const { message, success } = await departmentServiceInstance.updateDepartment(req.params.id as any, req.body as IDepartmentInput);
            return res.status(201).json({message, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  
    //create Department
  route.delete('/:id', async(req:Request, res:Response, next: NextFunction)=>{
      try{
          const {  success } = await departmentServiceInstance.deleteDepartment(req.params.id as any);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })



  
    


  
};
