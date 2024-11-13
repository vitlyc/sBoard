import { Rect } from './types'

export const drawRects = (context: CanvasRenderingContext2D, rects: Rect[]) => {
  context.fillStyle = '#ADD8E6'

  rects.forEach((rect) => {
    if (!rect) return
    context.fillRect(
      rect.position.x,
      rect.position.y,
      rect.size.width,
      rect.size.height
    )
  })
}

export const setCanvasSize = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  canvas.width = width * 2
  canvas.height = height * 2
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.getContext('2d')?.scale(2, 2)
}
export const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d')
  if (!context) {
    return
  }
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)
}
