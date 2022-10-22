import { PersonSimple } from "phosphor-react";
import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    form{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 3.5rem;
    }
`



export const FormContainer = styled.div`
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 0.5rem;
    
    color: ${props => props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: 700;
    flex-wrap: wrap;
`



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

export const ButtonContainer = styled.button`
    display: flex;    
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem 0;

    color: ${props => props.theme.white};
    background: ${props => props.theme["green-500"]};
    outline: none;
    border: none;
    border-radius: 8px;
    
`


export const BasicInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border:0;
    font-weight: 700;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    transition: 0.3s;
    
    border-bottom: 2px solid ${props => props.theme["gray-500"]};
    color: ${props => props.theme["gray-100"]};

    &:focus{
        box-shadow: none;
        border-color: ${props => props.theme["green-500"]};
    }

    &::placeholder{
    color: ${props => props.theme["gray-500"]};
}
`

export const MinutesAmoutInput = styled(BasicInput)`
    width: 4rem;
    text-align: center;
`

export const TaskInput = styled(BasicInput)`
    flex: 1;
`