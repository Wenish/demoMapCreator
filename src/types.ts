export enum ToolTypes {
    ERASER = 'Eraser',
    BLOCKS = 'Blocks',
    SPAWNS = ' Spawns',
    CAPTURE_POINTS = 'Capture Points',
    CAPTURE_FLAGS = 'Capture Flags'
}

export enum FloorBlockTypes {
    GRASS = 'Grass',
    DIRT = 'Dirt',
    SNOW = 'Snow',
    BRIDGE = 'Bridge'
}

export type Position = {
    x: number
    y: number
    z: number
}

export type FloorBlock = {
    type: FloorBlockTypes
    position: Position
}

export type CapturePoint = {
    position: Position
    radius: number
}

export type CaptureFlag = {
    position: Position
    teamId: string
}

export type Spawn  = {
    position: Position
}

export type Map = {
    name: string
    floorBlocks: FloorBlock[]
    capturePoints:  { [key: string]: CapturePoint; }
    captureFlags: { [key: string]: CaptureFlag; }
    spawns: { [key: string]: Spawn}
}

export type FileData = {
    map: Map
    grid: {
        width: number
        height: number
        cellSize: number
    }
}