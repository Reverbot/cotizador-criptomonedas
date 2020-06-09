import React, {Fragment, useState} from 'react'
import styled from '@emotion/styled'


const Label = styled.label`
    font-family : 'Bebas Neue', cursive;
    color : #fff;
    text-transform : uppercase;
    font-weight : bold;
    font-size : 2.4rem;
    margin-top : 2rem;
    display : block;
`
const Select = styled.select`
    width : 100%;
    display : block;
    padding : 1rem;
    -webkit-appearance : none;
    border-radius : 10px;
    border : none;
`


const useMoneda = (label, stateInicial, opciones) => {

    //state de nuestro custom hooks
    const [state, actualizarState] = useState(stateInicial);

    const Seleccionar = () => (

        <Fragment>
            <Label htmlFor="">{label}</Label>
                
                <Select name="" id="" onChange={e => actualizarState(e.target.value)} value={state}>

                    <option value="">-- Seleccione -- </option>
                    {opciones.map( opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                    ))}
                </Select>
        </Fragment>

    )

    //retornar state
    return [state, Seleccionar, actualizarState]

}

export default useMoneda;