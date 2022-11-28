import React from 'react';

export default function Paginado ({ charactersPerPage, allCharacters, paginado }) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allCharacters / charactersPerPage); i++) {
        pageNumbers.push(i + 1);
    }
    return (
        <nav>
            <ul className="paginado">{/**pageNumbers && Se fija si en pageNumbers hay algo */}
                {pageNumbers &&             
                    pageNumbers.map(number => (
                        <li className="number" key= { number }>
                            <button onClick={() => paginado(number)}>{ number }</button>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};