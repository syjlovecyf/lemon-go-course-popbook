// One coordinate system owns grid, stars, stones and teaching markers.
export const GRID = 19;
export const STEP = 15;
export const MARGIN = 22;
export const BOARD_SIZE = MARGIN * 2 + STEP * (GRID - 1);
export const coordinate = (index: number) => MARGIN + index * STEP;
export const stars = [3, 9, 15].flatMap(x => [3, 9, 15].map(y => [x, y]));
export const stones: {x:number; y:number; color:'black'|'white'}[] = [
  {x:3,y:3,color:'black'}, {x:15,y:15,color:'white'},
  {x:15,y:3,color:'black'}, {x:3,y:15,color:'white'},
  {x:9,y:9,color:'black'}, {x:10,y:9,color:'white'},
  {x:9,y:10,color:'black'}, {x:10,y:10,color:'white'},
  {x:8,y:9,color:'black'}, {x:11,y:9,color:'white'},
  {x:9,y:8,color:'black'}, {x:10,y:8,color:'white'},
];
