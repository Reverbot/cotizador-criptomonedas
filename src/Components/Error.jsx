import React from 'react';
import styled from '@emotion/styled'


const MensajeError = styled.div`
    background-color: #b7322c;
    padding : 1rem;
    color : #fff;
    font-size : 20px;
    text-transform : uppercase;
    font-weight : bold;
    text-align : center;
    font-family : 'Babes Neue', cursive;
`

const Error = ({mensaje}) => {
    return ( <MensajeError>
                {mensaje}
            </MensajeError> );
}
 
export default Error;