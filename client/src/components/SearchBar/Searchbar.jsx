import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getNameCharacters } from '../../redux/actions/index';

export default function Searchbar() {
    const dispatch = useDispatch();
    const [ name, setName ] = useState('');

        //Guardamos lo que el usuario digite en el input, se guarda en el estado local,y se despacha con el handleSubitmi
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameCharacters(name))    //El botón despacha la action
        console.log(name)
    };

    return (
        <div>
            <input type="text" placeholder='Buscar...' onChange={(e) => handleInputChange(e)} />
            <button type='submit' onClick={(e) => handleSubmit(e)} >Buscar</button>
        </div>
    );
};