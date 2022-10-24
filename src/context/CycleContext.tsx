import { createContext, ReactNode, useReducer, useState } from "react";

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

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null

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

  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {

    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id
        }

      case 'INTERRUPT_CURRENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptDate: new Date() }
            } else {
              return cycle
            }
          }),

          activeCycleId: null
        }

      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),

          activeCycleId: null
        }

      default:
        return state
    }

  },
    {
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

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    setSecondsAmountPassed(0)

  }

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })

  }

  const interruptCycle = () => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })
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