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
    drawRects(context, [rect1, rect2])

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

  const isPointInRect = (x: number, y: number, rect: any) => {
    return (
      x >= rect.position.x &&
      x <= rect.position.x + rect.size.width &&
      y >= rect.position.y &&
      y <= rect.position.y + rect.size.height
    )
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const touch = event.touches[0]
    const mouseX = touch.clientX - rect.left
    const mouseY = touch.clientY - rect.top

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

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!isDragging || !draggingRect) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const touch = event.touches[0]
    const mouseX = touch.clientX - rect.left
    const mouseY = touch.clientY - rect.top

    dispatch(
      updateRectPosition(draggingRect, {
        x: mouseX - offset.x,
        y: mouseY - offset.y,
      })
    )
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setDraggingRect(null)
  }

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

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !draggingRect) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    dispatch(
      updateRectPosition(draggingRect, {
        x: mouseX - offset.x,
        y: mouseY - offset.y,
      })
    )
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggingRect(null)
  }

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Rectangles</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
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
