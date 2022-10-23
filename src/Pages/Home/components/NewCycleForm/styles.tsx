import styled from "styled-components"

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
