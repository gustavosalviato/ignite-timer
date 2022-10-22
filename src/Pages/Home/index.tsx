import { Play } from "phosphor-react"
import { HomeContainer, CountDownContainer, FormContainer, Separator, ButtonContainer, MinutesAmoutInput, TaskInput } from "./styles"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

export const Home = () => {

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const { handleSubmit, register, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

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
            type="number"
            min={5}
            max={60}
            placeholder="00"
            {...register('minutesAmount', { valueAsNumber: true })}
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
