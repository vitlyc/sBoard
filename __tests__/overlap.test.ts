import { Rect, Point } from '../src/types'
import { areRectanglesOverlapping } from '../src/utils'
import { isPointInRect } from '../src/utils'
import { getRelativePosition } from '../src/positionUtils'
import { getConnectionLine } from '../src/connectionUtils'

describe('areRectanglesOverlapping', () => {
  it('должна возвращать true, если прямоугольники пересекаются', () => {
    const rect1 = {
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
    }
    const rect2 = {
      position: { x: 80, y: 80 },
      size: { width: 100, height: 100 },
    }

    expect(areRectanglesOverlapping(rect1, rect2)).toBe(true)
  })

  it('должна возвращать false, если прямоугольники не пересекаются', () => {
    const rect1 = {
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
    }
    const rect2 = {
      position: { x: 200, y: 200 },
      size: { width: 100, height: 100 },
    }

    expect(areRectanglesOverlapping(rect1, rect2)).toBe(false)
  })
})

describe('isPointInRect', () => {
  const rect = { position: { x: 50, y: 50 }, size: { width: 100, height: 100 } }

  it('должна возвращать true, если точка находится внутри прямоугольника', () => {
    expect(isPointInRect(60, 60, rect)).toBe(true)
  })

  it('должна возвращать false, если точка находится вне прямоугольника', () => {
    expect(isPointInRect(200, 200, rect)).toBe(false)
  })
})

describe('getRelativePosition', () => {
  const rect1: Rect = {
    position: { x: 50, y: 50 },
    size: { width: 100, height: 100 },
  }
  const rect2: Rect = {
    position: { x: 200, y: 200 },
    size: { width: 100, height: 100 },
  }

  it('должна определить, что rect1 выше rect2', () => {
    const rect2Above: Rect = {
      position: { x: 50, y: 200 },
      size: { width: 100, height: 100 },
    }
    expect(getRelativePosition(rect1, rect2Above)).toBe('rect1 выше rect2')
  })

  it('должна определить, что rect1 левее rect2', () => {
    expect(getRelativePosition(rect1, rect2)).toBe('rect1 левее rect2')
  })

  it('должна определить, что прямоугольники перекрываются', () => {
    const overlappingRect: Rect = {
      position: { x: 80, y: 80 },
      size: { width: 100, height: 100 },
    }
    expect(getRelativePosition(rect1, overlappingRect)).toBe(
      'rectы перекрываются'
    )
  })
})

describe('getConnectionLine', () => {
  const rect1: Rect = {
    position: { x: 50, y: 50 },
    size: { width: 100, height: 100 },
  }
  const rect2: Rect = {
    position: { x: 200, y: 200 },
    size: { width: 100, height: 100 },
  }

  it('должна построить правильную ломаную линию для соединения прямоугольников', () => {
    const points: Point[] = getConnectionLine(rect1, rect2)
    expect(points.length).toBeGreaterThan(1)
  })
})
