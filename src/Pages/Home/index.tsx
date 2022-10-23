import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StopButtonContainer, StartButtonContainer } from "./styles"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext, useEffect, useState } from "react"
import { differenceInSeconds } from 'date-fns'
import { CountDown } from "./components/CountDown/indext"


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void

}


export const CyclesContext = createContext({} as CyclesContextType)

export const Home = () => {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    })

  }

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const { handleSubmit, register, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  // const handleCreateNewCycle = (data: NewCycleFormData) => {
  //   const id = crypto.randomUUID()

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date()
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setSecondsAmountPassed(0)

  //   reset()
  // }

  const task = watch('task')

  const isSubmitDisabled = !task

  const hasCycleActived = !!activeCycle


  const handleInterruptCycle = () => {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      })
    })

    setActiveCycleId(null)
  }

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/>
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
          {/* <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
              type="text"
              placeholder="Dê um nome para seu projeto"
              {...register('task')}
              disabled={hasCycleActived}
            />

            <label htmlFor="task">durante</label>
            <MinutesAmoutInput
              type="number"
              min={1}
              max={60}
              placeholder="00"
              {...register('minutesAmount', { valueAsNumber: true })}
              disabled={hasCycleActived}
            />

            <span>Minutos</span>
          </FormContainer> */}
          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopButtonContainer type="button" onClick={handleInterruptCycle}>
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
