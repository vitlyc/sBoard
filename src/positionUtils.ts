import { Rect } from './types'

/**
 * Функция для определения относительного положения двух прямоугольников.
 * @param rect1 - Первый прямоугольник
 * @param rect2 - Второй прямоугольник
 * @returns Строка с результатом сравнения
 */
export const getRelativePosition = (rect1: Rect, rect2: Rect): string => {
  // Верхняя и нижняя границы прямоугольников
  const top1 = rect1.position.y
  const bottom1 = rect1.position.y + rect1.size.height

  const top2 = rect2.position.y
  const bottom2 = rect2.position.y + rect2.size.height

  // Левая и правая границы прямоугольников
  const left1 = rect1.position.x
  const right1 = rect1.position.x + rect1.size.width

  const left2 = rect2.position.x
  const right2 = rect2.position.x + rect2.size.width

  // Определяем, какой прямоугольник выше
  if (bottom1 < top2) {
    return 'rect1 выше rect2'
  } else if (bottom2 < top1) {
    return 'rect2 выше rect1'
  }

  // Если прямоугольники перекрываются по вертикали, проверяем их положение по горизонтали
  if (right1 < left2) {
    return 'rect1 левее rect2'
  } else if (right2 < left1) {
    return 'rect2 левее rect1'
  }

  // Если прямоугольники перекрываются и по вертикали, и по горизонтали
  return 'rectы перекрываются'
}
