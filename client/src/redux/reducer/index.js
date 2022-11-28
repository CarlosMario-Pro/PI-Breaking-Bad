
const initialState = {
    characters: [],
    detail: {},
    allCharacters: [],       //Se hace una copia para que al seleccionar otra opción de filtrado, se filtre en todos los characters y no un filtro sobre lo que ya estaba filtró
    occupations: []
};
//console.log(initialState.occupations)

function rootReducer (state= initialState, action) {
    switch(action.type) {
        case 'GET_CHARACTERS': 
            return {
                ...state,
                characters: action.payload,
                allCharacters: action.payload       //Es necesario crear este estado como copia del characters para filtrar
            };
        case 'GET_NAME_CHARACTERS':     //Para el componente search bar
            return {
                ...state,
                characters: action.payload
            };
        case 'GET_OCCUPATIONS':
            return {
                ...state,
                occupations: action.payload
            };
        case 'FILTER_BY_STATUS':
            const allCharacters = state.allCharacters;      //Cuando se vuelva a hacer otro filtro, ese filtro se hará sobre la copia que contiene toda la info y no un filtro sobre lo que ya fue filtrado
            const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.status === action.payload)
            return {
                ...state,
                characters: statusFiltered
            };
        case 'POST_CHARACTER':     //El post no hace nada xq voy a crearlo en una ruta nueva
            return {
                ...state
            };
        case 'FILTER_CREATED':
            const allCharacters2 = state.allCharacters;
            const createdFilter = action.payload === 'Created' ? allCharacters2.filter(el => el.createdInDb) : allCharacters2.filter(el => !el.createdInDb);
            return {
                ...state,
                characters: action.payload === 'All' ? state.allCharacters : createdFilter
            };
        case 'ORDER_BY_NAME':
            function orderByName(a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                return 0;
            };
            function ordenar(){
                if (action.payload === 'Ascendente'){
                    return [...state.characters.sort(orderByName)]
                };
                if (action.payload === 'Descendente'){
                    return  [...state.characters.sort(orderByName).reverse()]
                };
            }
            return {
                ...state,
                characters: ordenar()
            }     
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            };
        default:
            return state;
    };
};


export default rootReducer;