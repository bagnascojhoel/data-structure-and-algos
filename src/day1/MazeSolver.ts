export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    return findPath(maze, wall, start, end, []);
}

function findPath(maze: string[], wall: string, start: Point, end: Point, path: Point[]): Point[] {
    console.log(`
        Maze: ${maze.reduce((acc, row) => acc + `\n${row}`, '')}
        Start: {y: ${start.y}, x: ${start.x}},
        End: {y: ${end.y}, x: ${end.x}}
        Path: ${path.map(point => `{${point.y}, ${point.x}}`)}
    `);
    
    if (isOutside(maze, start) || isWall(maze, wall, start) || hasBeenHere(path,start) || start === end) {
        return path;
    }

    const newPath = [...path, start];
    
    const up = {y: start.y -1, x: start.x};
    const pathGoingUp = findPath(maze, wall, up, end, newPath);
    if (hasBeenHere(pathGoingUp,end)) {
        return pathGoingUp;
    }

    const right = {y: start.y, x: start.x +1};
    const pathGoingRight = findPath(maze, wall, right, end, newPath);
    if (hasBeenHere(pathGoingRight,end)) {
        return pathGoingRight;
    }

    const down = {y: start.y + 1, x: start.x};
    const pathGoingDown = findPath(maze, wall, down, end, newPath);
    if (hasBeenHere(pathGoingDown,end)) {
        return pathGoingDown;
    }

    const left = {y: start.y, x: start.x -1};
    const pathGoingLeft = findPath(maze, wall, left, end, newPath);
    if (hasBeenHere(pathGoingLeft,end)) {
        return pathGoingLeft;
    }

    return path;
}

function isOutside(maze: string[], point: Point): boolean {
    const row = maze[point.y]; 
    return row === undefined || row[point.x] === undefined;
}

function isWall(maze: string[], wall: string, point: Point): boolean {
    return maze[point.y][point.x] === wall;
}

function hasBeenHere(path: Point[], point: Point): boolean {
    return path.some(({x, y}) => point.x === x && point.y === y);
}
