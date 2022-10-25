import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useReducer, useState, useEffect } from "react";
import { json } from "react-router-dom";
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

  }, () => {
    const storedStateAsJson = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

    if (storedStateAsJson) {
      return JSON.parse(storedStateAsJson)
    }

    return {
      cycles: [],
      activeCycleId: null
    }
  })

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])


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