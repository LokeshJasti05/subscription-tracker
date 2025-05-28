import {config} from 'dotenv';


// Load environment variables from .env.[environment].local file
// If NODE_ENV is not set, defaults to 'development'
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

// Export environment variables that will be used by the application
export const { PORT } = process.env;
