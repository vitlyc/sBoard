import { Rect } from './types'

export const getRelativePosition = (rect1: Rect, rect2: Rect): string => {
  const [top1, bottom1, left1, right1] = [
    rect1.position.y,
    rect1.position.y + rect1.size.height,
    rect1.position.x,
    rect1.position.x + rect1.size.width,
  ]

  const [top2, bottom2, left2, right2] = [
    rect2.position.y,
    rect2.position.y + rect2.size.height,
    rect2.position.x,
    rect2.position.x + rect2.size.width,
  ]

  if (right1 < left2) return 'rect1 левее rect2'
  if (right2 < left1) return 'rect2 левее rect1'
  if (bottom1 < top2) return 'rect1 выше rect2'
  if (bottom2 < top1) return 'rect2 выше rect1'

  return 'rectы перекрываются'
}
