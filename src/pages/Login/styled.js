import styled from 'styled-components';

export const Title = styled.h1`
    color: ${props => (props.isRed ? 'red' : 'blue')};
    background: red;

    small {
        font-size: 12pt;
    }
`;
export const Paragrafo = styled.p`
`;