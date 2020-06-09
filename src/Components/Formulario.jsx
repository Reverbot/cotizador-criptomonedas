import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useCriptomoneda from '../Hooks/useCriptomoneda'
import useMoneda from '../Hooks/useMoneda'
import Axios from 'axios'
import Error from './Error'


const Boton = styled.button`
    margin-top : 20px;
    font-weight : bold;
    font-size : 20px;
    padding : 10px;
    background-color : #66a2fe;
    border : none;
    width : 100%;
    border-radius : 10px;
    color : #fff;
    transition : background-color .3s ease;

    &:hover{
        background-color : #326ac0;
        cursor: pointer;
    }
`

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    //state del listado de critomonedas
    const [listaCripto, guardarCripto] = useState([])

    //state error
    const [error, guardarError] = useState(false)

    const MONEDAS = [
        {codigo : 'USD', nombre : 'Dolar de Estados Unidos'},
        {codigo : 'MXN', nombre : 'Moneda de Mexico'},
        {codigo : 'COR', nombre : 'Cordoba de Nicaragua'},
        {codigo : 'EUR', nombre : 'Euro de Europa'},
    ]

    //utlizar el custom hooks
    const [moneda, SelectMoneda] = useMoneda('Elige la moneda', "", MONEDAS)

    //utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto)

    useEffect( () => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const resultado = await Axios.get(url)
            console.log(resultado.data.Data) 
            guardarCripto(resultado.data.Data)
        }

        consultarAPI()
    }, [criptomoneda])

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault()

        //validar si ambos campos estan vacios
        if(moneda === "" || criptomoneda === ""){
            guardarError(true);
            return;
        }
        
        //pasar el resultado al componente principal
        guardarError(false)
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)
    }

    return ( 
        <form action="" onSubmit={cotizarMoneda}>

            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMoneda />
            <SelectCripto />

            <Boton type="submit">Calcular</Boton>
        </form>
     );
}
 
export default Formulario;