import styled from "styled-components"


export const CountDownContainer = styled.div`
font-family: 'Roboto Mono', monospace;
font-size: 10rem;
color: ${props => props.theme["gray-100"]};

display: flex;
gap: 1rem;

span{
    background-color: red;
    border-radius: 8px;
    padding: 2.5rem 1rem;
    background: ${props => props.theme["gray-700"]};
}
`



export const Separator = styled.div`
padding: 2rem 0;
color: ${props => props.theme["green-500"]};
width: 4rem;

overflow: hidden;
display:flex;
justify-content: center;

`