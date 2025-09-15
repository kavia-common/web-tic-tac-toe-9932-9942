# Neon Cyber Tic Tac Toe (React)

A bold, high-contrast Tic Tac Toe experience themed in Neon Cyber: dark surfaces with neon green and yellow accents. Two-player local play with win/tie detection, undo, and reset.

## Features
- 2-player local gameplay (X starts)
- Win and tie detection with animated highlighting of the winning line
- Current player highlighting with badges
- Reset and Undo controls
- Bold, rounded, neon-styled UI strictly following the Neon Cyber theme

## Theme
- Background: `#0F172A`
- Surface: `#1F2937`
- Primary (neon green): `#10B981`
- Secondary (yellow): `#F59E0B`
- Text: `#FFFFFF`
- Error: `#EF4444`

All tokens are defined in `src/App.css` and applied consistently.

## Layout
- Player indicators above the 3x3 board
- Centered grid board
- Status and controls below the board
- Responsive down to small screens

## Scripts

### `npm start`
Starts development server at http://localhost:3000

### `npm test`
Runs the test suite.

### `npm run build`
Builds production assets.

## Notes
No UI frameworks are used; styling is implemented via vanilla CSS for performance and control. Adjust sizes by modifying the CSS variables and board sizing in `src/App.css`.
