import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png'
import Formulario from './Components/Formulario'
import Axios from 'axios';
import Cotizacion from './Components/Cotizacion'
import Spinner from './Components/Spinner';


const Contenedor = styled.div`
  max-width : 900px;
  margin : 0 auto;

  @media (min-width: 992px){
    display : grid;
    grid-template-columns : repeat(2, 1fr);
    column-gap : 2rem;
  }
`

const Imagen = styled.img`
  max-width : 100%;
  margin-top : 5rem;
`

const Header = styled.h1`
  font-family : 'Bebas Neue', cursive;
  color : #fff;
  text-align : left;
  font-weight : 700;
  font-size : 50px;
  margin-bottom : 50px;
  margin-top : 80px;

  &::after{
    content : "";
    width: 100px;
    height : 6px;
    background-color : #66a2fe;
    display : block;
  }
`


function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptomoneda] = useState('')
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false)

  useEffect( () => {

    const consultarAPI = async () => {
        if(moneda === '') return;

      //consultar el api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
      const resultado = await Axios.get(url);

      //mostrar el Spinner
      guardarCargando(true);

      //ocultar el Spinner
      setTimeout(() =>{
        guardarCargando(false)
        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda])
      }, 2000)
      
    }
    consultarAPI();
  }, [moneda, criptoMoneda])

  //consultar cargando
  const Componente = (cargando) ? <Spinner/> :  <Cotizacion resultado = {resultado} />

  return (
    <Contenedor >
      <div>
      <Imagen 
        src={imagen}
      />
      </div>
      <div>
        <Header>
          Cotiza Criptomonedas al instante
        </Header>
        <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
        />
        {Componente}
      </div>
    </Contenedor>
  );
}

export default App;
