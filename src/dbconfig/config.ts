
import mongoose from 'mongoose';
export async function connect(){
 try {
    mongoose.connect(process.env.MONGO_URI!);
     const connection = mongoose.connection;
     connection.on('connected',()=>{
        console.log("mongoDB is Connected");
        
     })

     connection.on('error',(err: Error)=>{
        console.log('mongoDB connection error'+err);
        process.exit();
        
     })
 } catch (error) {
    console.log('something went wrong while connecting to mongose'+error);
    
    
 }
}