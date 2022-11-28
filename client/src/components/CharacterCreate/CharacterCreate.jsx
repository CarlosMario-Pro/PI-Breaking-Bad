import React, { useState, useEffect, } from "react";   //useHistory
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postCharacter, getOccupations } from '../../redux/actions/index';


function validate (input) {                             //Función validadora, el 'input' es el Local State
    let errors = {};                                    //Creamos un objeto vacío para guardar temporalmente los errores
    if(!input.name) {                                   //'input' es el Local State, y 'name' es el atributo que tiene asignado los valores de name, nickname, image, birthday e image, 'name' toma el valores de acerdo con lo que el usuario selecciona. Entonces, si no hay input.name
        errors.name = 'Se requiere un nombre';          //En errors se guarda una propiedad 'name' cuyo valor es 'Se requiere un nombre'
    } else if (!input.nickname) {                       //Si no hay 'nickname'
        errors.nickname = 'Nickname debe ser completado'    //En errors se guarda una propiedad 'nickname' cuyo valor es 'Nickname debe ser completado'
    };
    return errors;                                      //Se retorna errors, esto muestra en pantalla el mensaje
};




export default function CharacterCreate() {
    const dispatch = useDispatch();                     //Traigo dispatch xq voy a despachar una action
    //const history = useHistory();                     //useHistory es un método del router que redirige al usuario a la ruta que se le indique
    const occupations = useSelector((state) => state.occupations);
    //console.log(occupations);
    const [ errors, setErrors ] = useState({});         //Se crea un estado local para guardar el valor de la validación, es un obj vacío

    const [ input, setInput ] = useState({              //Es el Local State
        name: '',
        nickname: '',
        birthday: '',
        status: '',
        occupation: []                                  //'occupation' va a ser un array, xq cada personaje puede tener varias ocupaciones
    });

    function handleChange(e) {                          //Es para el valor de los inputs que tienen los atributos del model 'Country'. Cada que se ejecute esta función
        setInput({                                      //LLamamos al estado input
            ...input,                                   //Tomamos todo lo que ya teniamos y además de lo que tiene...
            [e.target.name] : e.target.value            //Según lo que modifique el input, agrege ese '[e.target.value]' al [e.target.name], este 'name' en el 'e.target.name', es el atributo del 'input', y como en el input puse neme='name', name='nickname', name='birthday', etc, entonces modificará la propiedad respectiva del estado.
        });
        setErrors(validate({                            //Una vez hecho lo anterior, seteamos el estado 'errors' aplicando la variable 'validate'
            ...input,                                   //Hacemos una copia para no pisar el estado input
            [e.target.name] : e.target.value            //Con lo que llegue del [e.target.name] : e.target.value
        }));
        console.log(input);
    };

    function handleCheck(e) {                           //Como el status es un checkbox, usaremos el target.checked
        if (e.target.checked) {
            setInput({
                ...input,                               //Traemos todo lo que hasta el momento está guardado en el input
                status: e.target.value                  //Y seteamos el status con el e.target.value
            });
        };
    };

    function handleSelect(e) {                          //Como el status es un checkbox, usaremos el target.checked
        setInput({
            ...input,                                   //trae el todo del estado local 'input'
            occupation: [ ...input.occupation, e.target.value]  //Y setealo con el e.target.value
        });
    };

    function handleSubmit(e) {                          //Es para enviar el formulario cuando se le de click al botón
        e.preventDefault();                             //Como es un botón que enviará algo, recarga todo el formulario, con esto inpedimos que suceda eso
        //console.log(input);
        dispatch(postCharacter(input));                 //Despachamos la fn de la action que crea el personaje en la DB, pasamos todo lo contenido en el estado 'input'
        alert('Personaje creado')                       //Enviamos un mensaje de alguna manera que le indique que el personaje fue creado
        setInput({
            name: '',
            nickname: '',
            birthday: '',
            status: '',
            image: '',
            occupation: []
        });
        //history.push('/home'); //Después de que termine de hacer todo eso, llamamos al useHistory y hacemos un push para redirigir al usuario al /home
    };

    function handleDelete(el) {                                             //Se usa para eliminar el elemento seleccionado
        setInput({
            ...input,                                                       //Copia del estado anterior
            occupation: input.occupation.filter( occ => occ !== el)         //Y en el input.occupation, filtra todo lo que no sea ese elemento
        })
    };

    useEffect(() => {
        dispatch(getOccupations());
    }, [dispatch]);


    return (
        <div>
            <Link to='/home'> <button>Volver</button> </Link>
            <h1>Crea tu personaje!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type="text" value={ input.name } name='name' onChange={(e) => handleChange(e)} />
                    {errors.name && (
                        <p>{ errors.name }</p>
                    )};
                </div>{/*El handleChange se puede ejecutar solo o (e) => handleChange(e)*/}
                <div>
                    <label>Nickname</label>
                    <input type="text" value={ input.nickname } name='nickname' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Cumpleaños</label>
                    <input type="text" value={ input.birthday } name='birthday' onChange={(e) => handleChange(e)} />               </div>
                <div>
                    <label>Imagen</label>
                    <input type="text" value={ input.image } name='image' onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label>Status: </label>
                    <label><input type="checkbox" value='Alive' name='Alive' onChange={(e) => handleCheck(e)} />Alive</label>
                    <label> <input type="checkbox" value='Deceased' name='Deceased' onChange={(e) => handleCheck(e)} />Deceased</label>
                    <label> <input type="checkbox" value='Unknown' name='Unknown' onChange={(e) => handleCheck(e)} />Unknown</label>
                    <label> <input type="checkbox" value='Presumed dead' name='Presumed dead' onChange={(e) => handleCheck(e)} />Presumed dead</label>                </div>

                <select onChange={(e) => handleSelect(e)}>
                    {occupations.map((occ) => (
                        <option value={ occ.name }>{ occ.name }</option>
                    ))};
                </select>

                <button type='submit'>Crear personaje</button>
                {/*Este botón sin tener algún handler, activa el evento 'handleSubmit' del form*/}
            </form>
            {input.occupation.map(el => 
                <div>
                    <p> {el }</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                </div>
            )}
        </div>
    );
};