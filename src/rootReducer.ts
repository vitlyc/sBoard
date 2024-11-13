import { produce } from 'immer'
import { Action, UPDATE_RECT_POSITION, UPDATE_RECT_DIMENSIONS } from './actions'
import { RootState } from './types'

const initialState: RootState = {
  rect1: {
    position: { x: 150, y: 150 },
    size: { width: 90, height: 90 },
  },
  rect2: {
    position: { x: 400, y: 300 },
    size: { width: 90, height: 100 },
  },
}

export const rootReducer = produce((draft: RootState, action: Action) => {
  switch (action.type) {
    case UPDATE_RECT_POSITION: {
      const { rectId, position } = action.payload
      draft[rectId].position = position
      break
    }
    case UPDATE_RECT_DIMENSIONS: {
      const { rectId, x, y, width, height } = action.payload
      draft[rectId].position = { x, y }
      draft[rectId].size = { width, height }
      break
    }
    default:
      break
  }
}, initialState)
