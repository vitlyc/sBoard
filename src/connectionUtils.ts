import { Point, Rect } from './types'
import { getRelativePosition } from './positionUtils'

export const getConnectionLine = (rect1: Rect, rect2: Rect): Point[] => {
  const relativePosition = getRelativePosition(rect1, rect2)

  const getRectConnectionPoint = (
    rect: Rect,
    side: 'top' | 'bottom' | 'left' | 'right'
  ): Point => {
    switch (side) {
      case 'top':
        return { x: rect.position.x + rect.size.width / 2, y: rect.position.y }
      case 'bottom':
        return {
          x: rect.position.x + rect.size.width / 2,
          y: rect.position.y + rect.size.height,
        }
      case 'left':
        return { x: rect.position.x, y: rect.position.y + rect.size.height / 2 }
      case 'right':
        return {
          x: rect.position.x + rect.size.width,
          y: rect.position.y + rect.size.height / 2,
        }
    }
  }

  let startPoint: Point
  let endPoint: Point
  const points: Point[] = []

  switch (relativePosition) {
    case 'rect1 выше rect2':
      startPoint = getRectConnectionPoint(rect1, 'bottom')
      endPoint = getRectConnectionPoint(rect2, 'top')
      points.push(
        startPoint,
        { x: startPoint.x, y: (startPoint.y + endPoint.y) / 2 },
        { x: endPoint.x, y: (startPoint.y + endPoint.y) / 2 },
        endPoint
      )
      break

    case 'rect2 выше rect1':
      startPoint = getRectConnectionPoint(rect2, 'bottom')
      endPoint = getRectConnectionPoint(rect1, 'top')
      points.push(
        startPoint,
        { x: startPoint.x, y: (startPoint.y + endPoint.y) / 2 },
        { x: endPoint.x, y: (startPoint.y + endPoint.y) / 2 },
        endPoint
      )
      break

    case 'rect1 левее rect2':
      startPoint = getRectConnectionPoint(rect1, 'right')
      endPoint = getRectConnectionPoint(rect2, 'left')
      points.push(
        startPoint,
        { x: (startPoint.x + endPoint.x) / 2, y: startPoint.y },
        { x: (startPoint.x + endPoint.x) / 2, y: endPoint.y },
        endPoint
      )
      break

    case 'rect2 левее rect1':
      startPoint = getRectConnectionPoint(rect2, 'right')
      endPoint = getRectConnectionPoint(rect1, 'left')
      points.push(
        startPoint,
        { x: (startPoint.x + endPoint.x) / 2, y: startPoint.y },
        { x: (startPoint.x + endPoint.x) / 2, y: endPoint.y },
        endPoint
      )
      break

    default:
      startPoint = getRectConnectionPoint(rect1, 'right')
      endPoint = getRectConnectionPoint(rect2, 'left')
      points.push(
        startPoint,
        { x: (startPoint.x + endPoint.x) / 2, y: startPoint.y },
        { x: (startPoint.x + endPoint.x) / 2, y: endPoint.y },
        endPoint
      )
      break
  }

  return points
}
