// import { Container } from 'typedi';
// import mongoose from 'mongoose';
// import { IUser } from '../../interfaces/IUser';
// import { Logger } from 'mongodb';

// const attachCurrentUser = async (req, res, next) => {
//   // const Logger = Container.get('logger');
//   try {
//     const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
//     console.log("req.token",req.token)
//     console.log("req.token.-id",req.token._id)
//     const userRecord = await UserModel.findById(req.token._id);
//     console.log("userrecord auuthenticareuser",userRecord)
//     if (!userRecord) {
//       return res.sendStatus(401);
//     }
//     const currentUser = userRecord.toObject();
//     console.log("current user auuthenticareuser",currentUser)
//     Reflect.deleteProperty(currentUser, 'password');
//     Reflect.deleteProperty(currentUser, 'salt');
//     console.log("current user after salting auuthenticareuser",currentUser)
//     req.currentUser = currentUser;
//     return next();
//   } catch (e) {
//     // Logger.error('🔥 Error attaching user to req: %o', e);
//     return next(e);
//   }
// };

// export default attachCurrentUser;
