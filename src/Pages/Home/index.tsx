import { Play } from "phosphor-react"
import { HomeContainer, CountDownContainer, FormContainer, Separator, ButtonContainer, MinutesAmoutInput, TaskInput } from "./styles"
import { useForm } from 'react-hook-form'
export const Home = () => {

  const { handleSubmit, register, watch } = useForm()

  const handleCreateNewCycle = (data: any) => {
    console.log(data)
  }

  const task = watch('task')

  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />

          <label htmlFor="task">durante</label>
          <MinutesAmoutInput
            type="text"
            placeholder="00"
            {...register('minutesAmount')}
          />

          <span>Minutos</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <ButtonContainer disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </ButtonContainer>

      </form>
    </HomeContainer>

  )
}
