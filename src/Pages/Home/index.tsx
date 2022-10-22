import { Play } from "phosphor-react"
import { HomeContainer, CountDownContainer, FormContainer, Separator, ButtonContainer, BasicInput, MinutesAmoutInput, TaskInput } from "./styles"

export const Home = () => {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" placeholder="Dê um nome para seu projeto" />

          <label htmlFor="task">durante</label>
          <MinutesAmoutInput type="text" placeholder="00" />

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
