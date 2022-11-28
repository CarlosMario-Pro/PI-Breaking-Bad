const { Router } = require('express');
const axios = require('axios');
const { Character, Occupation } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();



//Ruta occupations que trae las ocupaciones de la API y las crea en la DB
router.get('/occupations', async (req, res) => {
    const occupationsApi = await axios.get('https://breakingbadapi.com/api/characters');    //Me conecto a la API
    const occupations = occupationsApi.data.map(el => el.occupation);                       //Devuelve muchos arreglos con todas las ocupations [["High School Chemistry Teacher", "Meth King Pin"], ["Meth Dealer"],["House wife","Book Keeper","Car Wash Manager","Taxi Dispatcher"]]
    const occEach = occupations.map(el => {                                                 //El 2do map ingresa a c/u de esos arreglos
        for (let i = 0; i < el.length; i++) return el[i]});;                                //Y reccore con un for loop para devolver cada una de esas ocupaciones en i --> [{"id": 1, "name": "High School Chemistry Teacher"}, {"id": 2, "name": "Meth Dealer"}, {"id": 3,"name": "House wife"}]
        //console.log(occEach);
        occEach.forEach(el => {                                                             //Este forEach guarda en la Db, iterando 
            Occupation.findOrCreate({                                                       //En el modelo Occupation y se hace un findOrCreate para buscar o  crear 
                where: { name: el }                                                         //Donde el nombre sea igual al elemento
            })//hay personajes que tienes la misma profesión, pero el findOrCreate impide que se dupliquen 
        });

    const allOcuppations = await Occupation.findAll();
    res.send(allOcuppations);
});




module.exports = router;