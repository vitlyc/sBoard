export const UPDATE_RECT_POSITION = 'UPDATE_RECT_POSITION'

export type UpdateRectPositionAction = {
  type: typeof UPDATE_RECT_POSITION
  payload: {
    rectId: 'rect1' | 'rect2'
    position: { x: number; y: number }
  }
}

export const updateRectPosition = (
  rectId: 'rect1' | 'rect2',
  position: { x: number; y: number }
): UpdateRectPositionAction => ({
  type: UPDATE_RECT_POSITION,
  payload: { rectId, position },
})

export type Action = UpdateRectPositionAction
