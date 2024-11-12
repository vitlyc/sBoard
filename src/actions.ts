export const UPDATE_RECT_POSITION = 'UPDATE_RECT_POSITION'
export const UPDATE_RECT_DIMENSIONS = 'UPDATE_RECT_DIMENSIONS'

export type UpdateRectPositionAction = {
  type: typeof UPDATE_RECT_POSITION
  payload: {
    rectId: 'rect1' | 'rect2'
    position: { x: number; y: number }
  }
}

export type UpdateRectDimensionsAction = {
  type: typeof UPDATE_RECT_DIMENSIONS
  payload: {
    rectId: 'rect1' | 'rect2'
    x: number
    y: number
    width: number
    height: number
  }
}

// Экшен для обновления позиции прямоугольника
export const updateRectPosition = (
  rectId: 'rect1' | 'rect2',
  position: { x: number; y: number }
): UpdateRectPositionAction => ({
  type: UPDATE_RECT_POSITION,
  payload: { rectId, position },
})

// Экшен для обновления размеров и положения прямоугольника
export const updateRectDimensions = (
  rectId: 'rect1' | 'rect2',
  x: number,
  y: number,
  width: number,
  height: number
): UpdateRectDimensionsAction => ({
  type: UPDATE_RECT_DIMENSIONS,
  payload: { rectId, x, y, width, height },
})

export type Action = UpdateRectPositionAction | UpdateRectDimensionsAction
