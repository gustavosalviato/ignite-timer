import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, addNewCycleAction, interrupCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string
  minutesAmount: number
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

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

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

    dispatch(addNewCycleAction(newCycle))
    setSecondsAmountPassed(0)

  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())

  }

  const interruptCycle = () => {
    dispatch(interrupCurrentCycleAction())
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