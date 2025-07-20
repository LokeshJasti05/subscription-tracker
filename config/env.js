import {config} from 'dotenv';


// Load environment variables from .env.[environment].local file
// If NODE_ENV is not set, defaults to 'development'
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

// Export environment variables that will be used by the application
export const { 
    PORT ,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN, 
    ARCJET_KEY,ARCJET_ENV,
} = process.env;
