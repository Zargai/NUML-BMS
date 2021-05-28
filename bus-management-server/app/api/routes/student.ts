import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import studentService from '../../services/student';
import { Container } from 'typedi';
import { IStudentInput } from '../../interfaces/IStudent';

const route = Router();

export default (app: Router) => {
  app.use('/students', route);
  const studentServiceInstance = Container.get(studentService);

  //get All
  route.get('/all',async (req: Request, res: Response) => {
    try{
        // let location =req.body.location;
        const {students} = await studentServiceInstance.getStudents();
        return res.json(students).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id', async (req: Request, res: Response)=>{
    try{
        const {student} = await studentServiceInstance.getStudent(req.params.id);
        return res.json(student).status(200);

    }catch(e){
        throw new Error('Error')
    }
  })

 // QUERY SINGLE STUDENT
 route.get('/', async (req: Request, res: Response)=>{
    try{
        console.log('this is route is hit', req.query)
        const query = req.query;
        const {student} = await studentServiceInstance.queryStudent(query);
        console.log('query-student', student);
        return res.json(student).status(200);

    }catch(e){
        res.json({})
        // throw new Error('Error')
    }
  })


  //create Student
  route.post('/add', 
    celebrate({
        body:Joi.object({
            name: Joi.string().required(),
            systemId: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            phone: Joi.string().required(),
            sex: Joi.string().required(),
            photo: Joi.string(),
            slipPhoto: Joi.string(),
            department: Joi.string()

        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { student, success } = await studentServiceInstance.addStudent(req.body as IStudentInput);
            return res.status(201).json({student, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  


  //update Student
  route.put('/:id', celebrate({body:Joi.object({
    name: Joi.string(),
    systemId: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    phone: Joi.string(),
    sex: Joi.string(),
    photo: Joi.string(),
    slipPhoto: Joi.string(),
    verified: Joi.boolean(),
    slipVerified: Joi.boolean(),
    department: Joi.string()
    })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log('update request got',req.body);
    console.log('_id', req.params.id)
        // logger.debug('req', req.body);
        try{
            
            const { message, success } = await studentServiceInstance.updateStudent(req.params.id as any, req.body as IStudentInput);
            return res.status(201).json({message, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  
    //create Student
  route.delete('/:id', async(req:Request, res:Response, next: NextFunction)=>{
      try{
          const {  success } = await studentServiceInstance.deleteStudent(req.params.id as any);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })



  
    


  
};
