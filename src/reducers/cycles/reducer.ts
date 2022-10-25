import { produce } from 'immer'
import { DRAFTABLE } from 'immer/dist/internal'
import { Cylinder } from 'phosphor-react'
import { ActionTypes } from './actions'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}


export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id
      // }
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {

        draft.activeCycleId = null

        draft.cycles[currentCycleIndex].interruptDate = new Date()
      })

      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),

      //   activeCycleId: null
      // }
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {

      return produce(state, (draft) => {

        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId
        })

        if (currentCycleIndex < 0) {
          return state
        }

        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),

      //   activeCycleId: null
      // }
    }

    default:
      return state
  }
}