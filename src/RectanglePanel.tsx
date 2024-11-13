import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { rect1Selector, rect2Selector } from './selector'
import { updateRectDimensions } from './actions'

const RectanglePanel: React.FC = () => {
  const dispatch = useDispatch()
  const rect1 = useSelector(rect1Selector)
  const rect2 = useSelector(rect2Selector)

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

  const renderInputField = (
    label: string,
    value: number,
    onChange: (value: number) => void
  ) => (
    <div>
      <label>{label}:</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </div>
  )

  const renderInputFields = (rectId: 'rect1' | 'rect2', rect: any) => (
    <div className="rectangle-panel">
      <h3>{rectId.toUpperCase()}</h3>
      {renderInputField('X', rect.position.x, (value) =>
        handleInputChange(rectId, 'x', value)
      )}
      {renderInputField('Y', rect.position.y, (value) =>
        handleInputChange(rectId, 'y', value)
      )}
      {renderInputField('Width', rect.size.width, (value) =>
        handleInputChange(rectId, 'width', value)
      )}
      {renderInputField('Height', rect.size.height, (value) =>
        handleInputChange(rectId, 'height', value)
      )}
    </div>
  )

  return (
    <div className="window rectangle-panels">
      <div className="title-bar">
        <div className="title-bar-text">Panel</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="rectangle-panel">
        {renderInputFields('rect1', rect1)}
        {renderInputFields('rect2', rect2)}
      </div>
    </div>
  )
}

export default RectanglePanel
