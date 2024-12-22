import dotenv from 'dotenv'

dotenv.config()

const ENVIROMENT = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.GMAIL_USER,
    API_KEY_INTERN: process.env.API_KEY_INTERN,
    FRONTEND_URL: process.env.URL_FRONT,  
    FRONTEND_PORT: process.env.FRONTEND_PORT 
}

console.log(process.env.GMAIL_USER);  
console.log(process.env.GMAIL_PASS);  

export default ENVIROMENT