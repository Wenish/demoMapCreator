export enum ToolTypes {
    ERASER = 'Eraser',
    BLOCKS = 'Blocks',
    TEAM_SPAWNS = ' Team Spawns',
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

export type Map = {
    name: string
    floorBlocks: FloorBlock[]
    capturePoints:  { [key: string]: CapturePoint; }
    captureFlags: { [key: string]: CaptureFlag; }
}

export type Team = {
    id: string
    color: string
}

export type FileData = {
    map: Map
    teams: Team[]
    grid: {
        width: number
        height: number
        cellSize: number
    }
}