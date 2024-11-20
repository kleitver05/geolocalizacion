import express from 'express'
import cors from 'cors'; //importa paquetes cors --permisos de accesos
import path from 'path';
import { fileURLToPath } from 'url';
import clientesRoutes from './routes/clientes.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import productosRoutes from './routes/productos.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import pedidos_detlleRoutes from './routes/pedidos_detlle.routes.js'

//definir el modulo de entrada y salida de las imagenes
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app=express();
const corsOptions={
    origin:'*',//la direccion del dominio del servidor
    methods:['GET','POST','PUT','PATCH','DELETE'],
    Credentials:true
}
app.use(cors(corsOptions));
app.use(express.json()); //para que interprete los objetos json
app.use(express.urlencoded({extended:true}));//se añade para poder receptar formularioss
app.use('/uploads',express.static(path.join(__dirname,'../uploads')));

//rutas
app.use('/api',clientesRoutes)
app.use('/api',usuariosRoutes)
app.use('/api',productosRoutes)
app.use('/api',pedidosRoutes)
app.use('/api',pedidos_detlleRoutes)

app.use((req,res,next)=>{
    res.status(400).json({
        message:'Endpoint not found'
    })
})
export default app;