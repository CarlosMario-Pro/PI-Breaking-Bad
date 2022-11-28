const { Character, Occupation } = require('../db')
const axios = require('axios');


const getApiInfo = async () => {
    const apiUrl = await axios.get('https://breakingbadapi.com/api/characters')
    const apiInfo = await apiUrl.data.map(el =>{
        return {
            id: el.char_id,
            name: el.name,
            image: el.img,
            nickname: el.nickname,
            status: el.status,
            occupation: el.occupation.map(el => el),    //Se hace un map porque devuelve un arreglo con varias ocupaciones 
            birthday: el.birthday,
            appearance: el.appearance.map(el => el)
        }
    });
    return apiInfo;
};



//Función que une los dos modelos, Character y Occupation
//Además incluirá el modelo Occupatión donde se traerá el atributo name, el cual tiene el nombre de la ocupación, si deseo que se traiga algún atributo más de algún modelo, lo puedo incluir, pero en este caso solo hay uno
const getDbInfo = async () => {
    return await Character.findAll({
        include: {
            model: Occupation,     //Incluimos el modelo Occupation
            attributes: ['name'],
            through: {      //A través de los atributos
                attributes: [],
            }
        }
    });
};


//Función unirá la info de la API con la unión de los dos modelos
const getAllCharacters = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);   //Esto genera un arreglo
    return infoTotal;
};
//console.log(getAllCharacters())


module.exports = {
    getAllCharacters
}