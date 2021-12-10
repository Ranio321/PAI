export default function isInRect(
    point: { x: number; y: number },
    rect: { x1: number; x2: number; y1: number; y2: number }
  ): boolean {
    if (
      point.x > rect.x1 &&
      point.x < rect.x2 &&
      point.y > rect.y1 &&
      point.y < rect.y2
    ) {
      return true;
    }
    return false;
  }
