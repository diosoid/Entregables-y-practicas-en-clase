import {Router} from "express"
import fs from 'fs'

const router = Router()

router.get("/", (req, res) => {
    res.render('vista1' )
})
router.get("/vista2", (req, res) => {
    res.render('vista2' )
})
router.get("/vista3", (req, res) => {

    let user = {
        firstname: 'Raul',
        lastname: 'Perez',
        age: 25,
        email: 'raulperez.com',
        password: '123'
    }
    res.render('vista3', {user} )
})

router.get("/Listadeproductos", async (req, res) => {
    let productos = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    res.render('Listadeproductos', {productos})

})

export default router