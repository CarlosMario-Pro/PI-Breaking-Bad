import axios from 'axios';

export function getCharacters(){
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/characters');
        return dispatch({ type: 'GET_CHARACTERS', payload: json.data });
    };
};


export function orderByName(payload) {
    return { type: 'ORDER_BY_NAME', payload };
};


export function getNameCharacters(name) {                   //name es el payload
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/characters?name=' + name);     //Por payload llega el nombre, que es lo que es usuario escribe en la barra de búsqueda
            return dispatch ({type: 'GET_NAME_CHARACTERS', payload: json.data });
        } catch (error) {
            console.log(error);
        }
    };
};


export function getOccupations(){                           //Este esta filtrado para traer solo el name
    return async function (dispatch) {
        const info = await axios.get('http://localhost:3001/occupations');
        return dispatch({ type: 'GET_OCCUPATIONS', payload: info.data });
    };
};


export function postCharacter(payload){                     //Se pasa un payload que es el vr a crear en la DB
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/character', payload);    //En la ruta queremos hacer el post de payload, por eso se pasa
        return response;                                    //No se usa el dispatch en las rutas tipo post
    };
};


export function filterCharactersByStatus(payload){          //El payload es el value que va a llegar
    return { type: 'FILTER_BY_STATUS', payload };
};


export function filterCreated(payload){
    return { type: 'FILTER_CREATED', payload };
};


export function getDetail(id){
    const urlApiId = `http://localhost:3001/characters/${id}`
    return async function (dispatch) {
        try {
            const json = await axios.get(urlApiId);
            return dispatch({ type: 'GET_DETAILS', payload: json.data })
        } catch (error) {
            console.log("Este es el error de getCountryDetails" + error)
        }
    };
};