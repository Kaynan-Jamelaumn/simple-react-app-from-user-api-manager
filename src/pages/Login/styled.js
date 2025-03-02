import styled from 'styled-components';

export const Title = styled.h1`
    color: ${props => (props.isRed ? 'red' : 'blue')};
    //background: red;

    small {
        font-size: 12pt;
        color: ${props => props.theme.textDark}; // Use the theme text color for small text
    }
`;
export const Paragrafo = styled.p`
`;