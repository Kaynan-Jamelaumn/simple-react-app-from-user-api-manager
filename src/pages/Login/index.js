import React,  { useContext } from 'react'

import { Title } from './styled';
import { ThemeContext } from '../../config/ThemeContext';
import {Container} from '../../styles/GlobalStyles'
export default function Login(){
    return(
        <React.Fragment>
            <Container>
                <Title isRed={false}>
                    <h1> Login </h1>;
                    <small>
                        é pequeno
                    </small>
                </Title>
                
                    </Container>
        </React.Fragment>

    );
}
