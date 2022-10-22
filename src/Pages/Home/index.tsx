import { Play } from "phosphor-react"
import { HomeContainer, CountDownContainer, FormContainer, Separator, ButtonContainer, MinutesAmoutInput, TaskInput } from "./styles"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react"
import { differenceInSeconds } from 'date-fns'


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export const Home = () => {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPass] = useState(0)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)


  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPass(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }

    return () => clearInterval(interval)

  }, [activeCycle])

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const { handleSubmit, register, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id = crypto.randomUUID()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPass(0)

    reset()
  }



  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(totalSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')

  const isSubmitDisabled = !task

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <ButtonContainer disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </ButtonContainer>

      </form>
    </HomeContainer>

  )
}
