import jwt from 'express-jwt';
import config from '../../config';

const getTokenFromHeader = req => {
  // console.log("req.header.authorization ==>",req.headers.authorization)
  // console.log("bearer ==>",req.headers.authorization.split(' ')[0])
  if (
    (req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    // console.log("bear token line",req.headers.authorization.split(' ')[0])
    // console.log("header line without bearer",req.headers.authorization.split(' ')[1])
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};


const isAuth = jwt({
  secret: config.jwtSecret, 
  userProperty: 'token',
  getToken: getTokenFromHeader,
});

export default isAuth;
