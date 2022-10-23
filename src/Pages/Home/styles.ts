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

export const BasicButton = styled.button`
    display: flex;    
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem 0;

    color: ${props => props.theme["gray-100"]};
    
    outline: none;
    border: none;
    border-radius: 8px;
    transition: 0.4;

`


export const StopButtonContainer = styled(BasicButton)`
    background: ${props => props.theme["red-500"]};
    
    &:not(:disabled):hover{
        background: ${props => props.theme["red-700"]};
    }
`



export const StartButtonContainer = styled(BasicButton)`
    background: ${props => props.theme["green-500"]};
    
    &:not(:disabled):hover{
        background: ${props => props.theme["green-700"]};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
    
`