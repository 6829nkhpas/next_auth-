
import mongoose from 'mongoose';
export async function connect(){
 try {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    
    connection.on('connected', () => {
        console.log("MongoDB is Connected Successfully");
    });

    connection.on('error', (err: Error) => {
        console.log('MongoDB connection error:', err.message);
        if (err.message.includes('Authentication failed')) {
            console.log('❌ Authentication Error: Please check your MongoDB username and password in .env file');
        }
        process.exit(1);
    });
    
 } catch (error) {
    console.log('❌ Error connecting to MongoDB:', error);
    if (error instanceof Error && error.message.includes('Authentication failed')) {
        console.log('💡 Please verify your MongoDB credentials in the .env file');
    }
    throw error;
 }
}
