import Product from "../models/ProductModel.js"
import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from 'uuid';
export const getProducts = async(req, res)=>{
    try {
        const response = await Product.findAll()
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}
export const getProductById = async(req, res)=>{
    try {
        const response = await Product.findOne({
            where:{
                id:req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}
export const saveProduct = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg:"No File Uploaded"})
    const name = req.body.title;
    const desc = req.body.desc;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const uniqueId = uuidv4();
    const fileName = `${uniqueId}${ext}`; 
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"})
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 mb"})

    file.mv(`./public/images/${fileName}`, async(err)=> {
        if(err) return res.status(500).json({msg: err.message})
            try {
        await Product.create({name: name, description: desc, image: fileName, url:url})
        res.status(201).json({msg:"Product Created Sucessfully"})
        } catch (error) {
            console.log(error.message)
        }
    })
}
export const updateProduct = async(req, res)=>{
    const product = await Product.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:"No Data Found"})
    
        let fileName = product.image; // Use the existing image name by default
        if (req.files && req.files.file) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const uniqueId = uuidv4();
            fileName = `${uniqueId}${ext}`;
            const allowedType = [".png", ".jpg", ".jpeg"];
        
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
            if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 mb" });
        
            // Delete the old image file
            const filepath = `./public/images/${product.image}`;
        // Check if the file exists before trying to delete it
        if (fs.existsSync(filepath)) {
            try {
                fs.unlinkSync(filepath);
            } catch (err) {
                console.log(`Failed to delete old image: ${err.message}`);
            }
        } else {
            console.log("File not found, skipping deletion");
        }

        // Move new file to the public/images directory
        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    
    const name = req.body.title;
    const desc = req.body.desc;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Product.update({name: name, description:desc, image: fileName, url: url},{
            where: {
                id: req.params.id
            }
        }) 
        res.status(200).json({msg: "Product Updated Sucessfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg: `Error updating product: ${error.message}` });
    }  
}


export const deleteProduct = async(req, res)=>{
    const product = await Product.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:"No Data Found"})

        const filepath = `./public/images/${product.image}`;

        // Check if the file exists before trying to delete it
        if (fs.existsSync(filepath)) {
            try {
                fs.unlinkSync(filepath);
            } catch (err) {
                console.log(`Failed to delete image: ${err.message}`);
            }
        } else {
            console.log("File not found, skipping deletion");
        } try {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: "Product Deleted Successfully" });
        } catch (error) {
            console.log(error.message);
        }
        
    }