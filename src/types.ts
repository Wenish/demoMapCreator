export enum ToolTypes {
    ERASER = 'Eraser',
    BLOCKS = 'Blocks',
    SPAWNS_TEAM = 'Spawns Team',
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
    id: string
    position: Position
    radius: number
}

export type CaptureFlag = {
    id: string
    position: Position
    teamId: string
}

export type Map = {
    name: string
    floorBlocks: FloorBlock[]
    capturePoints: CapturePoint[]
    captureFlags: CaptureFlag[]
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