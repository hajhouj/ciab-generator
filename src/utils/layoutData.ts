/**
 * Embedded layout data from the positions.json file
 */
import positionsData from '../../positions.json';

// Convert positions.json format to layout format
export const defaultLayoutData = Object.entries(positionsData).map(([column, positions]) => {
  const posArray = positions as Array<{from_left?: number, from_top?: number, from_right?: number}>;
  
  return {
    "Column": column,
    "Position 1 from the left in mm": posArray[0]?.from_left || null,
    "Position 1 From the top in mm": posArray[0]?.from_top || null,
    "Position 2 From the right  in mm": posArray[1]?.from_right || null,
    "Position 2 From the top in mm": posArray[1]?.from_top || null,
    "Position 3 From the left in mm": posArray.length > 1 && posArray[1]?.from_left ? posArray[1].from_left : null,
    "Position 3 from the top in mm": posArray.length > 1 && posArray[1]?.from_top ? posArray[1].from_top : null
  };
}); 