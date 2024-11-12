import { Rect } from './types'

export const getRelativePosition = (rect1: Rect, rect2: Rect): string => {
  const top1 = rect1.position.y
  const bottom1 = rect1.position.y + rect1.size.height

  const top2 = rect2.position.y
  const bottom2 = rect2.position.y + rect2.size.height

  const left1 = rect1.position.x
  const right1 = rect1.position.x + rect1.size.width

  const left2 = rect2.position.x
  const right2 = rect2.position.x + rect2.size.width

  if (bottom1 < top2) {
    return 'rect1 выше rect2'
  } else if (bottom2 < top1) {
    return 'rect2 выше rect1'
  }

  if (right1 < left2) {
    return 'rect1 левее rect2'
  } else if (right2 < left1) {
    return 'rect2 левее rect1'
  }

  return 'rectы перекрываются'
}
