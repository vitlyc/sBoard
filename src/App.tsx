import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { rect1Selector, rect2Selector } from './selector'
import { drawRects, setCanvasSize, clearCanvas } from './canvasUtils'
import { updateRectPosition } from './actions'
import { getRelativePosition } from './positionUtils'

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

  // Инициализация Canvas
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

  // Отрисовка прямоугольников при изменении их положения
  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context) return

    clearCanvas(canvasRef.current!)
    requestAnimationFrame(() => {
      drawRects(context, [rect1, rect2])
    })
  }, [rect1, rect2])

  // Проверка, находится ли точка внутри прямоугольника
  const isPointInRect = (x: number, y: number, rect: any) => {
    return (
      x >= rect.position.x &&
      x <= rect.position.x + rect.size.width &&
      y >= rect.position.y &&
      y <= rect.position.y + rect.size.height
    )
  }

  // Обработчик нажатия мыши
  const handleMouseDown = (event: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    // Проверяем, попадает ли курсор на прямоугольник
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

  // Обработчик перемещения мыши
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !draggingRect) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    // Обновляем положение перетаскиваемого прямоугольника
    dispatch(
      updateRectPosition(draggingRect, {
        x: mouseX - offset.x,
        y: mouseY - offset.y,
      })
    )
  }

  // Обработчик отпускания мыши
  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggingRect(null)
  }
  const positionInfo = getRelativePosition(rect1, rect2)

  console.log(positionInfo)

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Rectangles</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
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
