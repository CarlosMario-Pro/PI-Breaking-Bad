const { Router } = require('express');
const axios = require('axios');
const { Character, Occupation } = require('../db');
const { getAllCharacters } = require('../controller/index');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();




//Ruta que taerá todos los personajes con sus ocupaciones
router.get('/characters', async (req, res) => {
    const name = req.query.name; //Busca si hay un query con la propiedad nombre
    let charactersTotal = await getAllCharacters();
    if(name) {
        let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))//Filtra si el elemento pasado por query está incluido dentro de characterTotal
        characterName.length ?
        res.status(200).send(characterName) :
        res.status(404).send('No está el personaje')
    }
    else {
        res.status(200).send(charactersTotal)
    }
})//La ruta por query en el front se usa para buscar por nombre




//Ruta post para crear un personaje
router.post('/character', async (req, res) => {
    const { id, name, image, nickname, status, birthday, createdInDb, occupation } = req.body   //Esto se recibe por body

    const characterCreated = await Character.create({ //WARNING: Relacionar todos los atributos del modelo donde se desee crear 
        id,
        name, 
        image, 
        nickname, 
        status, 
        birthday, 
        createdInDb 
    }); //Creamos el personaje --> No se pasa occupation porque se usa para unirla con el personaje

    const occupationDb = await Occupation.findAll({//Dentro de Occupation, busque y encuentre todas las occupation que coincidan con la pasada por body
        where:{
            name: occupation
        }
    })
    characterCreated.addOccupation(occupationDb);   //Luego a characterCreated le adicionamos occupationDb
    res.send('Personaje creado con éxito');
});
//Hice un GET a http://localhost:3001/characters
//Luego un GET a http://localhost:3001/occupations
//Y un POST a http://localhost:3001/character pasando por body: { "id": "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11", "name": "Carlos", "image": "https://vignette.wikia.nocookie.net/breakingbad/images/b/b7/HankS5.jpg/revision/latest/scale-to-width-down/700?cb=20120620014136", "nickname": "Carlitos", "status": "Alive", "birthday": "13.03.1992", "occupation": ["High School Chemistry Teacher"] }




router.get('/characters/:id', async (req, res) => {
    const id = req.params.id;
    const charactersTotal = await getAllCharacters();
    if (id) {
        let characterId = await charactersTotal.filter(el => el.id == id);
        characterId.length?
        res.status(200).json(characterId) :
        res.status(404).send('No encontré ese personaje')
    }
});//Hice un GET a http://localhost:3001/characters/1 para traer el personaje por id




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