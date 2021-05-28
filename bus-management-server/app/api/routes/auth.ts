import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { IUserInput } from '../../interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';

const multer = require("multer");


const route  = Router();
const imageToBase64 = require('image-to-base64');

import ImageKit from 'imagekit'

const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/busmanagement/',
    publicKey: 'public_fKo5YmIft0pv9hhR8bX+ixsX/z8=',
    privateKey: 'private_0gtSrJfQtC+55joG9/bfigh0BtI='
  });
  

export default (app:Router)=>{
    app.use('/auth', route)
    const authServiceInstance = Container.get(AuthService);
    // route.post('/signup', 
    // celebrate({
    //     body:Joi.object({
    //         name: Joi.string().required(),
    //         email: Joi.string().required(),
    //         password: Joi.string().required()
    //     })
    // }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    // console.log(req.body);
    //     // logger.debug('req', req.body);
    //     try{
    //         const { user, token } = await authServiceInstance.SignUp(req.body as IUserInput);
    //         return res.status(201).json({user, token})
    //     }catch(e){
    //         console.log(e);
    //         return next(e)
    //     }
    // })


    route.post('/signin', celebrate({
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    }), async (req:Request, res:Response, next:NextFunction)=>{
        try{
   
        const {email, password} = req.body;
        const {user, token } = await authServiceInstance.SignIn(email, password);
        return res.json({user, token}).status(200);
                 
    }catch(e){
        // logger.error("Error loading e")
        next(e)
    }
    })


    route.get('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
        // const logger = Container.get('logger');
        // logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
        try {
          return res.status(200).end();
        } catch (e) {
        //   logger.error('🔥 error %o', e);
          return next(e);
        }
      });



      //FILE UPLOADER 

      // SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('params', req.params);
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // 
        console.log('in', req.body.name);
        console.log('intest', file)

      cb(null, file.originalname)
    }
  })
   
  
  var upload = multer({ storage: storage })

     route.post('/upload', upload.single('myFile'), async (req, res, next) => {
        const file = req.file;
        if (!file) {
            const error = new Error('Please upload a file')
            console.log('no-file')
            return next(error)
          }

        imageToBase64('public/uploads/'+file.originalname) // Path to the image
    .then(
        (response) => {
         //   console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
            imagekit.upload({
                fileName:"madad",
                file: response
            }).then(data=>{
                console.log('res', data);
                res.json({
                    file:data.url
                })
            })
         
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
            throw new Error("Error converting file")
        }
    )

        //   res.send( file)
        
      });



      route.get('/statistics',async (req,res,next)=>{
          const {statistics} = await authServiceInstance.getStatistics();
          res.json(statistics)

      })





}

