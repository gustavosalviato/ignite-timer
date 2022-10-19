import { ButtonContainer, ButtonSizes, ButtonVariant } from "./Button.styles"

interface ButtonProps {
  variant: ButtonVariant
  size?: ButtonSizes
}

export const Button = ({ variant, size = 'sm' }: ButtonProps) => {
  return (
    <ButtonContainer variant={variant} size={size}>
      Click Here
    </ButtonContainer>
  )
}