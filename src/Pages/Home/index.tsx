import { Play } from "phosphor-react"
import { HomeContainer, CountDownContainer, FormContainer, Separator, ButtonContainer } from "./styles"

export const Home = () => {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalher em</label>
          <input type="text" />

          <label htmlFor="task">durante</label>
          <input type="text" />

          <span>Minutos</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator></Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <ButtonContainer>
          <Play size={24} />
          Começar
        </ButtonContainer>

      </form>
    </HomeContainer>

  )
}
