import { Action, UPDATE_RECT_POSITION, UPDATE_RECT_DIMENSIONS } from './actions'
import { RootState } from './types'

const initialState: RootState = {
  rect1: {
    position: { x: 150, y: 150 },
    size: { width: 80, height: 60 },
  },
  rect2: {
    position: { x: 400, y: 300 },
    size: { width: 100, height: 80 },
  },
}

export const rootReducer = (
  state: RootState = initialState,
  action: Action
): RootState => {
  switch (action.type) {
    case UPDATE_RECT_POSITION:
      const { rectId, position } = action.payload
      return {
        ...state,
        [rectId]: {
          ...state[rectId],
          position,
        },
      }
    case UPDATE_RECT_DIMENSIONS:
      const { x, y, width, height } = action.payload
      return {
        ...state,
        [action.payload.rectId]: {
          position: { x, y },
          size: { width, height },
        },
      }
    default:
      return state
  }
}
