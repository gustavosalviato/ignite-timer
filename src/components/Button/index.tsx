import { ButtonContainer, ButtonVariant } from "./Button.styles"

interface ButtonProps {
  variant: ButtonVariant
}

export const Button = ({ variant }: ButtonProps) => {
  return (
    <ButtonContainer variant={variant}>
      Click Here
    </ButtonContainer>
  )
}