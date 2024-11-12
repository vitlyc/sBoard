import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { rect1Selector, rect2Selector } from './selector'
import { drawRects, setCanvasSize, clearCanvas } from './canvasUtils'
import { updateRectPosition } from './actions'
import { Point } from './types'
import { getConnectionLine } from './connectionUtils'
import RectanglePanel from './RectanglePanel'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dispatch = useDispatch()

  const rect1 = useSelector(rect1Selector)
  const rect2 = useSelector(rect2Selector)

  const WIDTH = 1024
  const HEIGHT = 768

  const [isDragging, setIsDragging] = useState(false)
  const [draggingRect, setDraggingRect] = useState<'rect1' | 'rect2' | null>(
    null
  )
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') }
  }

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()
    if (!canvas || !context) return

    setCanvasSize(canvas, WIDTH, HEIGHT)
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineWidth = 5
    context.strokeStyle = 'black'
    clearCanvas(canvas)
  }, [])

  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context) return

    clearCanvas(canvasRef.current!)

    // Отрисовка прямоугольников
    drawRects(context, [rect1, rect2])

    // Построение соединительной линии между прямоугольниками
    const linePoints = getConnectionLine(rect1, rect2)
    drawLine(context, linePoints)
  }, [rect1, rect2])

  const drawLine = (context: CanvasRenderingContext2D, points: Point[]) => {
    context.beginPath()
    context.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y)
    }
    context.stroke()
  }

  // Проверка, находится ли точка внутри прямоугольника
  const isPointInRect = (x: number, y: number, rect: any) => {
    return (
      x >= rect.position.x &&
      x <= rect.position.x + rect.size.width &&
      y >= rect.position.y &&
      y <= rect.position.y + rect.size.height
    )
  }

  // Проверка на пересечение прямоугольников
  const areRectanglesOverlapping = (rect1: any, rect2: any): boolean => {
    return !(
      rect1.position.x + rect1.size.width < rect2.position.x ||
      rect1.position.x > rect2.position.x + rect2.size.width ||
      rect1.position.y + rect1.size.height < rect2.position.y ||
      rect1.position.y > rect2.position.y + rect2.size.height
    )
  }

  // Обработчик перемещения мыши
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !draggingRect) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    // Определяем текущий прямоугольник и второй прямоугольник
    const currentRect = draggingRect === 'rect1' ? rect1 : rect2
    const otherRect = draggingRect === 'rect1' ? rect2 : rect1
    const rectWidth = currentRect.size.width
    const rectHeight = currentRect.size.height

    // Ограничиваем движение по границам холста
    let newX = mouseX - offset.x
    let newY = mouseY - offset.y

    // Проверка выхода за границы холста
    if (newX < 0) newX = 0
    if (newY < 0) newY = 0
    if (newX + rectWidth > WIDTH) newX = WIDTH - rectWidth
    if (newY + rectHeight > HEIGHT) newY = HEIGHT - rectHeight

    // Проверка пересечения с другим прямоугольником
    const newRect = {
      ...currentRect,
      position: { x: newX, y: newY },
    }

    if (areRectanglesOverlapping(newRect, otherRect)) {
      return // Если прямоугольники пересекаются, не обновляем положение
    }

    // Обновляем положение прямоугольника в состоянии Redux
    dispatch(
      updateRectPosition(draggingRect, {
        x: newX,
        y: newY,
      })
    )
  }

  // Обработчик нажатия мыши
  const handleMouseDown = (event: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    if (isPointInRect(mouseX, mouseY, rect1)) {
      setDraggingRect('rect1')
      setOffset({ x: mouseX - rect1.position.x, y: mouseY - rect1.position.y })
      setIsDragging(true)
    } else if (isPointInRect(mouseX, mouseY, rect2)) {
      setDraggingRect('rect2')
      setOffset({ x: mouseX - rect2.position.x, y: mouseY - rect2.position.y })
      setIsDragging(true)
    }
  }

  // Обработчик отпускания мыши
  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggingRect(null)
  }

  return (
    <div className="window">
      <RectanglePanel />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="canvas"
      />
    </div>
  )
}

export default App
