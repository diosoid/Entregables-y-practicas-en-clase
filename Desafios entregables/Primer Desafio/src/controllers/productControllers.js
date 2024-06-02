import ProductManager from "../manager/productManager.js";
const productManager = new ProductManager()
import * as service from "../services/productServices.js"

export const getAllProducts = async (req, res, next) =>{
    try {
        const response = await service.getAll()
        res.json(response)       
    } catch (error) {
        next (error.message)      
    }}
export const getProductByid = async (req, res, next) =>{
    try {
        const {id} = await req.params //Aca no puso el await no se porque
        const product = await service.getById (id)
        if(!product) res.status(404).json ({msg: 'product not found'})
        else res.json(product)       
    } catch (error) {
        next (error.message)      
    }}
export const createProduct = async (req, res, next) =>{
    try {
        const newProd = await service.create(req.body)
        if(!newProd) res.status(404).json ({msg: 'Error creating product'})
        else res.json(newProd)      
    } catch (error) {
        next (error.message)      
    }}
export const updateProduct = async (req, res, next) =>{
    try {
        const {id} = await req.params //Aca tampoco puso await
        const prodUpd = await service.update(id, req.body)
        if(!prodUpd) res.status(405).json ({msg: 'Error updating product'})
        else res.json(prodUpd)
    } catch (error) {
        next (error.message)      
    }}

    export const remove = async (req, res, next) =>{
        try {
            const {id} = await req.params // Tampoco uso el await
            const prodDel = await service.remove(id)
            if(!prodDel) res.status(404).json ({msg: 'Error deleting product'})
            else res.json(prodDel)       
        } catch (error) {
            next (error.message)      
        }}