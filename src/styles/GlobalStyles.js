import { createGlobalStyle, styled } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body {
        font-family: sans-serif;
        background-color: ${(props) => props.theme.bodyBackgroundColor};
    }
    html, body, #root {
        height: 100%;
    }
    button {
        cursor: pointer;
        background: ${(props) => props.theme.buttonBackgroundColor};
        border: none;
        color: ${(props) => props.theme.buttonTextColor};
        padding: 10px 20px;
        &:hover {
            background: ${(props) => props.theme.buttonHoverBackgroundColor};
        }
    }
    a {
        text-decoration: none;
        color: inherit;
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

    /* Tag Styles */
    .tag {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    .tag-primary {
        background-color: ${(props) => props.theme.tagPrimary};
        color: white;
    }
    .tag-secondary {
        background-color: ${(props) => props.theme.tagSecondary};
        color: white;
    }
    .tag-tertiary {
        background-color: ${(props) => props.theme.tagTertiary};
        color: white;
    }
    .tag-success {
        background-color: ${(props) => props.theme.success};
        color: white;
    }
    .tag-warning {
        background-color: ${(props) => props.theme.warning};
        color: black;
    }
    .tag-error {
        background-color: ${(props) => props.theme.error};
        color: white;
    }
    .tag-info {
        background-color: ${(props) => props.theme.info};
        color: white;
    }
`;

export const Container = styled.section`
    max-width: auto;
`;