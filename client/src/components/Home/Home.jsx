import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters, filterCharactersByStatus, filterCreated, orderByName } from '../../redux/actions/index';
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import Searchbar from '../SearchBar/Searchbar';


export default function Home() {
    const dispatch = useDispatch();                                             //Para ir despachando las actions
    const allCharacters = useSelector((state) => state.characters);             //Selecciono el estado de Redux donde guardo todoos los personajes
    const [ order, setOrder] = useState('');


    //Paginado
    const [ currentPage, setCurrentPage ] = useState(1);                        //Estado inicial en 1 donde empieza el paginado
    const [ charactersPerPage ] = useState(6);                                  //Personajes por páginas indicados
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter= indexOfLastCharacter - charactersPerPage;
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect (() => {                  //Cuando se monte el componente, traerá todos los personajes del state de Redux
        dispatch(getCharacters())       //Este dispatch es lo mismo que hacer el mapStateToProps
    }, [dispatch]); //Lo que se incluye dentro del [] es aquello de lo que depende el useEffect, en este caso el dispatch, se monta siempre y cuando ocurra dispatch(getCharacters())

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCharacters());
    };

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);                          //Aquí ordeno seteando la página en la primera, modifica el estado local
        setOrder(`Ordenado por: ${e.target.value}`)//Y se renderiza con este enunciado. Repaso de Selene del miércoles 01:15:00 del video
        console.log(order)
    };

    function handleFilterStatus(e){
        dispatch(filterCharactersByStatus(e.target.value))
    };

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    };

    return (
        <div>
            <Link to='/character'>Crear personaje</Link>
            <h1>Aguante Breaking Bad</h1>
            <button onClick={e => { handleClick(e) } }>Volver a cargar todos los personajes</button>
        
            <div>
                <div>
                    <select onChange={ e => handleSort(e) }>
                        <option value="Ascendente">Ascendente</option>
                        <option value="Descendente">Descendente</option>
                    </select>
                    <select onChange={ e => handleFilterStatus(e) }>
                        <option value="All">Todos</option>
                        <option value="Alive">Vivo</option>
                        <option value="Deceased">Muerto</option>
                        <option value="Presumed dead">Desconocido</option>
                        <option value="Unknown">Probablemente muerto</option>
                    </select>
                    <select  onChange={ e => handleFilterCreated(e) }>
                        <option value="All">Todos</option>
                        <option value="Created">Creados</option>
                        <option value="Api">Existentes</option>
                    </select>

                    <Paginado
                        charactersPerPage={charactersPerPage}
                        allCharacters={allCharacters.length}
                        paginado={ paginado }     
                    />{/*Constante paginado */}

                    <Searchbar />

                    <Link to='/'>
                        <button>Volver</button>
                    </Link>
                </div>


                {currentCharacters?.map((el) => {
                    return (
                        <div>
                            <Link to={'/characters/' + el.id}>
                                <Card name={el.name} image={el.image} nickname={el.nickname} key={ el.id }/>
                            </Link>
                        </div>
                    );
                })};


                
            </div>
        </div>
    );
};