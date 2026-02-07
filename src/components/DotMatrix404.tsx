import { useMemo } from 'react';
import type { ReactElement } from 'react';

// 404 pattern - taller characters (7 wide, 11 tall)
const FOUR_PATTERN = [
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
];

const ZERO_PATTERN = [
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
];

function create404Pattern(): number[][] {
  const rows = 11;
  const pattern: number[][] = [];
  
  for (let row = 0; row < rows; row++) {
    pattern.push([
      ...FOUR_PATTERN[row],
      0, 0,
      ...ZERO_PATTERN[row],
      0, 0,
      ...FOUR_PATTERN[row],
    ]);
  }
  return pattern;
}

const PATTERN_404 = create404Pattern();
const PATTERN_WIDTH = 25;
const PATTERN_HEIGHT = 11;
const GRID_COLS = 50;
const GRID_ROWS = 22;

export default function DotMatrix404() {
  // Pre-calculate dot grid as static HTML string for performance
  const gridContent = useMemo(() => {
    const startRow = Math.floor((GRID_ROWS - PATTERN_HEIGHT) / 2);
    const startCol = Math.floor((GRID_COLS - PATTERN_WIDTH) / 2);
    
    const dots: ReactElement[] = [];
    
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const patternRow = row - startRow;
        const patternCol = col - startCol;
        
        let is404 = false;
        if (patternRow >= 0 && patternRow < PATTERN_HEIGHT && patternCol >= 0 && patternCol < PATTERN_WIDTH) {
          is404 = PATTERN_404[patternRow][patternCol] === 1;
        }
        
        const delay = row * 0.04 + col * 0.02;
        
        dots.push(
          <div
            key={`${row}-${col}`}
            className={is404 ? 'dot dot-main' : 'dot dot-bg'}
            style={{ animationDelay: `${delay}s` }}
          />
        );
      }
    }
    
    return dots;
  }, []);
  
  return (
    <div className="dot-matrix-container">
      <div className="dot-grid">
        {gridContent}
      </div>
      
      <style>{`
        .dot-matrix-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        
        .dot-grid {
          display: grid;
          grid-template-columns: repeat(${GRID_COLS}, 1fr);
          grid-template-rows: repeat(${GRID_ROWS}, 1fr);
          gap: 4px;
          width: 100%;
          height: 100%;
          padding: 8px;
        }
        
        @media (min-width: 640px) {
          .dot-grid {
            gap: 6px;
            padding: 16px;
          }
        }
        
        @media (min-width: 768px) {
          .dot-grid {
            gap: 8px;
          }
        }
        
        .dot {
          border-radius: 50%;
          margin: auto;
          will-change: transform, opacity;
        }
        
        .dot-main {
          width: 10px;
          height: 10px;
          background-color: #171717;
          animation: pulse404 2.5s ease-in-out infinite;
        }
        
        .dot-bg {
          width: 6px;
          height: 6px;
          background-color: rgba(23, 23, 23, 0.35);
          animation: waveBg 4s ease-in-out infinite;
        }
        
        @media (min-width: 640px) {
          .dot-main {
            width: 12px;
            height: 12px;
          }
          .dot-bg {
            width: 8px;
            height: 8px;
          }
        }
        
        @media (min-width: 768px) {
          .dot-main {
            width: 16px;
            height: 16px;
          }
          .dot-bg {
            width: 10px;
            height: 10px;
          }
        }
        
        /* Dark mode colors */
        :root.dark .dot-main {
          background-color: #ffffff;
        }
        
        :root.dark .dot-bg {
          background-color: rgba(255, 255, 255, 0.15);
        }
        
        @keyframes pulse404 {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.6; 
            transform: scale(0.8);
          }
        }
        
        @keyframes waveBg {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.5);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}