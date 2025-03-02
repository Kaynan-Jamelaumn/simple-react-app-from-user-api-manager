import { createGlobalStyle, styled} from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body {
        font-family: sans-serif;
        background-color: ${(props) => props.theme.backgroundDark};
    }
    html, body #root{
        height: 100%;

    }
    button {
        cursor: pointer;
        background: ${(props) => props.theme.backgroundPrimary};
        border: none;
        color: ${(props) => props.theme.buttonPrimaryColor};
        padding: 10px 20px;
    }
    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .text-center {
        text-align: center;
    }

    .text-right {
        text-align: right;
    }

    .text-left {
        text-align: left;
    }
`;

export const Container = styled.section`

    max-width: auto;
`