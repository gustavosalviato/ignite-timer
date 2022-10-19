import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'danger' | 'success'

export type ButtonSizes = 'sm' | 'md' | 'lg'

interface ButtonContainerProps {
  variant: ButtonVariant
  size: ButtonSizes
}

const ButtonColors = {
  primary: 'purple',
  danger: 'red',
  success: 'green',

}

const ButtonSizes = {
  sm: '25px',
  md: '50px',
  lg: '100px',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 10px;
  height: 50px;

  ${props => {
    return css`
      background-color: ${props => props.theme.colors.secondary};
      width: ${ButtonSizes[props.size]} ;
    `
  }}
  /* ${props => {
    return css`
      background-color: ${ButtonColors[props.variant]};
      
    `
  }} */
  
`