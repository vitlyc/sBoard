import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { currentStrokeSelector } from './selector'
import { beginStroke, endStroke, updateStroke } from './actions'
import { drawStroke, clearCanvas, setCanvasSize } from './canvasUtils'
import { ColorPanel } from './ColorPanel'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentStroke = useSelector(currentStrokeSelector)
  const dispatch = useDispatch()

  const isDrawing = !!currentStroke.points.length

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') }
  }

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent
    dispatch(beginStroke(offsetX, offsetY))
  }

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    dispatch(updateStroke(offsetX, offsetY))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke())
    }
  }

  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context) {
      return
    }
    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    )
  }, [currentStroke])

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <ColorPanel />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  )
}

export default App
