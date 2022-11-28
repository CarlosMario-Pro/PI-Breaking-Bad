import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail } from '../../redux/actions/index';


export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const myCharacter = useSelector(state => state.detail);        //Seleecionamos el estado detail de Redux

    useEffect(() => {
        dispatch(getDetail(id));      //Con (props.match.params.id) accedemos al id del detalle, es una forma predeterminada por JS
    }, [dispatch, id]);
    
    //console.log(myCharacter);

    return (
        <div>
            {
                myCharacter.length > 0 ?
                <div>
                    <h1>Soy { myCharacter[0].name }</h1>      {/*myCharacter tiene todos los personajes en un array, cuando se selecciona uno, el array queda con un solo obj, por eso el [0], y seleccionamos el name*/}
                    <img alt='Imagen' src={ myCharacter[0].img ? myCharacter[0].img : myCharacter[0].image } width='500px' height='700px' />
                    <h2>status: { myCharacter[0].status }</h2>
                    <p>Cumpleaños: { myCharacter[0].birthday }</p>
                    <h5>Ocupaciones: { !myCharacter[0].createdInDb ? myCharacter[0].occupation + ' ' : myCharacter[0].occupations.map(el => el.name + (' ')) }</h5>
                    {/*  !myCharacter[0].createdInDb: Quiere decir que si no hay myCharacter creados en DB. Como al crear la propiedad occupations en la DB al crear el personaje, quedó en plural, entonces en el array de personajes debo de hacer un ternario, si es occupation u occupations*/}
                </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    );
};