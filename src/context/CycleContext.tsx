import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsAmountPassed: number
  setSecondsPassed: (seconds: number) => void
  markCurrentCycleAsFinished: () => void
  interruptCycle: () => void
  createNewCycle: (data: CreateCycleData) => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const setSecondsPassed = (seconds: number) => {
    setSecondsAmountPassed(seconds)
  }

  const createNewCycle = (data: CreateCycleData) => {
    const id = crypto.randomUUID()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setSecondsAmountPassed(0)

  }

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

  const interruptCycle = () => {
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
    <CycleContext.Provider value={{
      cycles,
      activeCycleId,
      activeCycle,
      secondsAmountPassed,
      setSecondsPassed,
      markCurrentCycleAsFinished,
      createNewCycle,
      interruptCycle
    }}
    >
      {children}
    </CycleContext.Provider>
  )
}