
import ImageKit  from 'imagekit';


export default async (): ImageKit => {

    const imagekit = new ImageKit({
        urlEndpoint: 'https://ik.imagekit.io/busmanagement/',
        publicKey: 'public_fKo5YmIft0pv9hhR8bX+ixsX/z8=',
        privateKey: 'private_0gtSrJfQtC+55joG9/bfigh0BtI='
      });
      
  return imagekit;
};