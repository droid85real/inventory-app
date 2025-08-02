import multer from "multer";
import path from "path";

const storageConfig=multer.diskStorage({ //takes three callback function
    destination:(req,file,callback)=>{ //used to describe file save location
        callback(null,path.join(path.resolve(),'src','public','images')); //calback(error,path)
    },
    filename:(req,file,cb)=>{ //used to describe filename
        const name=Date.now()+'-'+file.originalname;
        cb(null,name);
    },
});

const uploadFile=multer({storage: storageConfig});

export default uploadFile;