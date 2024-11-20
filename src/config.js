import {config} from 'dotenv'
config()

 
export const BD_HOST=process.env.BD_HOST || bkreik6wfqn7rjzskpmz-mysql.services.clever-cloud.com
export const BD_DATABASE=process.env.BD_DATABASE || bkreik6wfqn7rjzskpmz
export const DB_USER= process.env.DB_USER || uqbg5luma8ypxf0o
export const DB_PASSWORD=process.env.DB_PASSWORD ||''
export const DB_PORT=process.env.DB_PORT || 3306
export const PORT=process.env.PORT || 3000
export const JWT_SECRET=process.env.JWT_SECRET || 'DIIVE'
export const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME||appi2024
export const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API||456645216836757
export const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET||'6BCyX14aZvWB6SwxzOJiItm9mKA'


