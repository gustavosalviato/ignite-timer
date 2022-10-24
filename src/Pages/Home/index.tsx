import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StopButtonContainer, StartButtonContainer } from "./styles"
import { useContext } from "react"
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CountDown } from "./components/CountDown"
import { NewCycleForm } from "./components/NewCycleForm"
import { CycleContext } from "../../context/CycleContext"



const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})
export const Home = () => {

  const {
    createNewCycle,
    activeCycle,
    interruptCycle
  } = useContext(CycleContext)

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')

  const isSubmitDisabled = !task

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)

    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopButtonContainer type="button" onClick={interruptCycle}>
            <HandPalm size={24} />
            Interromper Tarefa
          </StopButtonContainer>
        ) : (
          <StartButtonContainer disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartButtonContainer>

        )}

      </form>
    </HomeContainer>

  )
}
