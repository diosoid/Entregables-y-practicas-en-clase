import ProductManager from "../manager/productManager.js";
const productManager = new ProductManager()
import * as service from "../services/productServices.js"

export const getAllProducts = async (req, res, next) =>{
    try {
        const { page, limit, title, sort } = req.query
        const response = await service.getAll(page, limit, title, sort)
        const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
        const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
        res.json({
            payload: response.docs,
            info:{
                count:response.totalDocs,
                totalPages:response.totalPages,
                nextLink: next,
                prevLink: prev,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                
            }
        })
        res.status(200).json(response)       
    } catch (error) {
        next (error.message)      
    }}
export const getProductByid = async (req, res, next) =>{
    try {
        const {id} =  req.params //Saque el await aca
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
        const {id} =  req.params //Saque el await aca
        const prodUpd = await service.update(id, req.body)
        if(!prodUpd) res.status(405).json ({msg: 'Error updating product'})
        else res.json(prodUpd)
    } catch (error) {
        next (error.message)      
    }}

    export const remove = async (req, res, next) =>{
        try {
            const {id} = await req.params 
            const prodDel = await service.remove(id)
            if(!prodDel) res.status(404).json ({msg: 'Error deleting product'})
            else res.json(prodDel)       
        } catch (error) {
            next (error.message)      
        }}