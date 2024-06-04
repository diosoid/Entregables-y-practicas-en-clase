//import { id } from "schema/lib/objecttools";
import ProductManagerDaoMongoDB from "../daos/mongodb/productDao.js"; 
//import { response } from "express";
const prodDao = new ProductManagerDaoMongoDB()

// import { __dirname } from "../path.js";
// import ProductManagerDaoFs from "../daos/filesystem/productDao.js";
// const prodDao = new ProductManagerDaoFs(`${__dirname}/daos/filesystem/products.json`) 

export const getAll = async () => {
    try {
        return await prodDao.getAll()       
    } catch (error) {
        throw new Error(error)       
    }
}
export const getById = async (id) => {
    try {
        return await prodDao.getById(id)         
    } catch (error) {
        throw new Error(error)       
    }
}
export const create = async (obj) => {
    try {
        return await prodDao.create(obj)       
    } catch (error) {
        throw new Error(error)       
    }
}
export const update = async (id, obj) => {
    try {
        return await prodDao.update(id, obj)       
    } catch (error) {
        throw new Error(error)       
    }
}
export const remove = async (id) => {
    try {
        return await prodDao.delete(id)       
    } catch (error) {
        throw new Error(error)       
    }
}