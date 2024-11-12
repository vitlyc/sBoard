import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { rect1Selector, rect2Selector } from './selector'
import { updateRectDimensions } from './actions'

const RectanglePanel: React.FC = () => {
  const dispatch = useDispatch()
  const rect1 = useSelector(rect1Selector)
  const rect2 = useSelector(rect2Selector)

  // Обработчик изменения значений для прямоугольников
  const handleInputChange = (
    rectId: 'rect1' | 'rect2',
    field: 'x' | 'y' | 'width' | 'height',
    value: number
  ) => {
    const currentRect = rectId === 'rect1' ? rect1 : rect2
    const updatedValue = {
      x: field === 'x' ? value : currentRect.position.x,
      y: field === 'y' ? value : currentRect.position.y,
      width: field === 'width' ? value : currentRect.size.width,
      height: field === 'height' ? value : currentRect.size.height,
    }

    dispatch(
      updateRectDimensions(
        rectId,
        updatedValue.x,
        updatedValue.y,
        updatedValue.width,
        updatedValue.height
      )
    )
  }

  const renderInputFields = (rectId: 'rect1' | 'rect2', rect: any) => (
    <div className="rectangle-panel">
      <h3>{rectId.toUpperCase()}</h3>
      <div>
        <label>X:</label>
        <input
          type="number"
          value={rect.position.x}
          onChange={(e) =>
            handleInputChange(rectId, 'x', parseInt(e.target.value))
          }
        />
      </div>
      <div>
        <label>Y:</label>
        <input
          type="number"
          value={rect.position.y}
          onChange={(e) =>
            handleInputChange(rectId, 'y', parseInt(e.target.value))
          }
        />
      </div>
      <div>
        <label>Width:</label>
        <input
          type="number"
          value={rect.size.width}
          onChange={(e) =>
            handleInputChange(rectId, 'width', parseInt(e.target.value))
          }
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          value={rect.size.height}
          onChange={(e) =>
            handleInputChange(rectId, 'height', parseInt(e.target.value))
          }
        />
      </div>
    </div>
  )

  return (
    <div className="window rectangle-panels">
      <div className="title-bar">
        <div className="title-bar-text">Rectangles</div>
      </div>
      <div className="rectangle-panel">
        {renderInputFields('rect1', rect1)}
        {renderInputFields('rect2', rect2)}
      </div>
    </div>
  )
}

export default RectanglePanel
