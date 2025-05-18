/**
 * Position Adjustment Utilities
 * 
 * This module provides utilities for adjusting text element positions
 * based on the positions.json file.
 */

// Adjustment units are in millimeters
export interface PositionAdjustment {
  xOffset: number;
  yOffset: number;
}

// Default adjustments - no adjustment by default
const DEFAULT_VERSO_ADJUSTMENT: PositionAdjustment = {
  xOffset: 0,
  yOffset: 0,
};

const DEFAULT_RECTO_ADJUSTMENT: PositionAdjustment = {
  xOffset: 0,
  yOffset: 0,
};

/**
 * Get position adjustment for a specific text element
 * @param pageType 'verso' for odd pages, 'recto' for even pages
 * @param fieldName Name of the field/column being positioned
 * @returns Position adjustment in millimeters
 */
export function getPositionAdjustment(
  pageType: 'verso' | 'recto',
  fieldName: string
): PositionAdjustment {
  // Use default adjustments based on page type
  const defaultAdjustment = pageType === 'verso' 
    ? DEFAULT_VERSO_ADJUSTMENT 
    : DEFAULT_RECTO_ADJUSTMENT;
  
  // Field-specific adjustments can be added here if needed
  return defaultAdjustment;
}

/**
 * Apply position adjustment to coordinates
 * @param x Original X coordinate in mm
 * @param y Original Y coordinate in mm
 * @param adjustment Position adjustment to apply
 * @returns Adjusted coordinates in mm
 */
export function applyPositionAdjustment(
  x: number,
  y: number,
  adjustment: PositionAdjustment
): [number, number] {
  return [
    x + adjustment.xOffset,
    y + adjustment.yOffset
  ];
}

/**
 * Get debug information about position adjustments
 * Useful for development and testing
 */
export function getAdjustmentInfo(): { verso: PositionAdjustment, recto: PositionAdjustment } {
  return {
    verso: DEFAULT_VERSO_ADJUSTMENT,
    recto: DEFAULT_RECTO_ADJUSTMENT
  };
} 