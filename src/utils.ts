export const areRectanglesOverlapping = (rect1: any, rect2: any): boolean => {
  return !(
    rect1.position.x + rect1.size.width < rect2.position.x ||
    rect1.position.x > rect2.position.x + rect2.size.width ||
    rect1.position.y + rect1.size.height < rect2.position.y ||
    rect1.position.y > rect2.position.y + rect2.size.height
  )
}

export const isPointInRect = (x: number, y: number, rect: any) => {
  return (
    x >= rect.position.x &&
    x <= rect.position.x + rect.size.width &&
    y >= rect.position.y &&
    y <= rect.position.y + rect.size.height
  )
}
