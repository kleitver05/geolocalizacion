import { json } from 'express'
import{conmysql} from '../db.js'

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'appi2024', 
  api_key: '456645216836757',        
  api_secret: '6BCyX14aZvWB6SwxzOJiItm9mKA'  
})

export const getProductos=
async (req,res) =>{
    try {
        const [result]= await conmysql.query('select * from productos')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error al consultar Productos"})
    }
}
export const getProductosxid=
async(req, res)=>{
   try {
    const [result]=await conmysql.query('select * from productos where prod_id=?',[req.params.id])
    if(result.length<=0)return res.status(404).json({
        prod_id:0,
        message:"Producto no encontrado"
    })
    res.json(result[0])
   } catch (error) {
    return res.status(500).json({message: 'Error en el servidor'})
    
   }

}


export const postProducto= 
async(req, res)=>{
    try {
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;
        console.log("DATOS RECIBIDOS DEL CUERPO:", req.body);

        let prod_imagen = null; 

        if (req.file) {
            console.log("IMAGEN RECIBIDA:", req.file);
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads', 
                public_id:  `${Date.now()}-${req.file.originalname} ` 
            });

            console.log("Resultado de la carga en Cloudinary:", uploadResult);
            prod_imagen = uploadResult.secure_url;
        } else {
            console.log("NO SE RECIBIO NINGUNA IMAGEN.");
        }

        const [rows] = await conmysql.query(
            'INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?, ?, ?, ?, ?, ?)',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
        );

        console.log("Producto insertado con ID:", rows.insertId);

        res.status(201).json({
            mensaje: 'PRODUCTO GUARDADO CORRECTAMENTE.',
            prod_id: rows.insertId,
            prod_imagen: prod_imagen 
        });


    } catch (error) {
        console.error("ERROR AL CREAR UN PRODUCTO", error);
        return res.status(500).json({ message: 'ERROR DEL LADO DEL SERVIDOR', error: error.message });
    }
};

//PUT REEMPLAZAR
export const putProducto=
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
   // console.log(prod_nombre)
    const[result]=await conmysql.query('update productos set prod_codigo=?,prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=?',
        [prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"Producto no encontrado"
        })

        const[rows]=await conmysql.query('select * from productos where prod_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

 //PATCH MODIFICAR

export const patchProducto=     //PATCH MODIFICAR
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
    console.log(prod_nombre)
    const[result]=await conmysql.query('update productos set prod_codigo=?,prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=?',
        [prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"producto no encontrado"
        })

        const[rows]=await conmysql.query('select * from productos where prod_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

export const deleteProducto= //DELETE ELIMINAR
async(req, res)=>{
    try {
        const [result]=await conmysql.query(' delete from productos where prod_id=?', [req.params.id])
        if (rows.affectedRows>=0) return res.status(404).json({
            id:0,
            message:"NO PUDO ELIMINAR AL PRODUCTO"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
        
    }
}