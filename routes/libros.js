const express = require("express");
const router = express.Router();

const libro = require("../models/libro.js");

const { requiredScopes } = require("express-oauth2-jwt-bearer");


//Ruta para obtener todos los libros
router.get("/", requiredScopes("read:libros"), async (req, res) => {
    try {
        const libros = await libro.find();
        res.json(libros);
    }   catch (error) {
        res.status(500).json({error: "Error al obtener los libros" });
    }
});

router.get("/:id",  async (req,res) => {
    try{

        const libro = await libro.findById(req.params.id);
        if(libro){
            res.json(libro);
        } else{
            res.status(404).json({error: "Libro no encontrado"});
        }


    } catch(error) {
        res.status(500).json({error: "Error al obtener el libro"
        })
    }
})

// Ruta para crear un nuevo libro
router.post("/",requiredScopes("write:libros"), async (req, res) => {
    try {
        const nuevoLibro = new libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    }   catch (error) {
        res.status(500).json({error: "Error al crear el libros" });
    }
});

// Ruta para actualizar un Libro existente 
router.post("/:id",requiredScopes("write:libros"), async (req, res) => {
    try {
        const libro = await libro.findByIdAndUdate(req.params.id, req.body,
{
          new: true,
        });
        res.json(libro);
    }   catch (error) {
        res.status(500).json({error: "Error al actualizar el libros" });
    }
});

//Ruta para eliminar un Libro
router.delete('/:id',requiredScopes("write:libros"), async (req, res) => {
    try {
        await libro.findByIdAndDelete(req.params.id);
        res.json({message: 'Libro eliminado correctamente' });
    }   catch (error) {
        res.status(500).json({error: 'Error al eliminar el Libro '});
    }
});
module.exports = router;