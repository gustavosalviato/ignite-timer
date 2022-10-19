import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const ButtonColors = {
  primary: 'purple',
  danger: 'red',
  success: 'green',

}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 50px;


  ${props => {
    return css`
      background-color: ${ButtonColors[props.variant]};
    `
  }}
`