import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { state, State } from "./state";
import { saveAs } from 'file-saver';
import { Getters } from "./getters";
import { CaptureFlag, CapturePoint, FileData, Spawn, ToolTypes } from "../types";

export enum ActionTypes {
    SaveToJson = 'SAVE_TO_JSON',
    LoadFromJsonFile = 'LOAD_FROM_JSON_FILE',
    PaintToIndex = 'PAINT_TO_INDEX',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit' | 'getters'> & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    },
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.SaveToJson](context: ActionAugments): void
    [ActionTypes.LoadFromJsonFile](context: ActionAugments, file: File): void
    [ActionTypes.PaintToIndex](context: ActionAugments, index: number): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.SaveToJson](context) {
        const data = context.getters.getFileData
        console.log(data)
        const mapName = data.map.name
        const fileName = `${mapName.replaceAll(' ', '_')}.json`;

        // Create a blob of the data
        const fileToSave = new Blob([JSON.stringify(data, undefined, 2)], {
            type: 'application/json'
        });

        // Save the file
        saveAs(fileToSave, fileName);
    },
    [ActionTypes.LoadFromJsonFile](context, file) {
        context.commit(MutationType.ResetState, null)
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const json: FileData = JSON.parse(e.target.result);
            context.commit(MutationType.LoadFileData, json)
        }
        reader.readAsText(file)
    },
    [ActionTypes.PaintToIndex](context: ActionAugments, index: number): void {
        const axis = context.getters.getSelectedAxis
        if (!axis) return
        const key = `${axis.x}0${axis.z}`;
        const toolSelected = context.state.tools.toolSelected
        const floorBlockSelected = context.state.tools.floorBlockSelected

        switch (toolSelected) {
            case ToolTypes.ERASER: {
                context.commit(MutationType.FloorBlockRemove, [key]);
                context.commit(MutationType.CapturePointsRemove, [key])
                context.commit(MutationType.CaptureFlagsRemove, [key])
                context.commit(MutationType.SpawnsRemove, [key])
                break;
            }
            case ToolTypes.BLOCKS: {
                const floorBlock = {
                    type: floorBlockSelected,
                    position: {
                        x: axis.x,
                        y: 0,
                        z: axis.z,
                    },
                };
                context.commit(MutationType.FLoorBlockAdd, [floorBlock]);
                break;
            }
            case ToolTypes.SPAWNS: {
                const spawn: Spawn = {
                    position: {
                        x: axis.x,
                        y: 0,
                        z: axis.z,
                    }
                }
                context.commit(MutationType.SpawnsAdd, [spawn])
                break;
            }
            case ToolTypes.CAPTURE_POINTS: {
                const capturePoint: CapturePoint = {
                    position: {
                        x: axis.x,
                        y: 0,
                        z: axis.z,
                    },
                    radius: 3
                }
                context.commit(MutationType.CapturePointsAdd, [capturePoint])
                break;
            }
            case ToolTypes.CAPTURE_FLAGS: {
                const captureFlag: CaptureFlag = {
                    position: {
                        x: axis.x,
                        y: 0,
                        z: axis.z,
                    },
                    teamId: ''
                }
                context.commit(MutationType.CaptureFlagsAdd, [captureFlag])
                break;
            }
            default: {
                console.log('not handled tool:', toolSelected)
                break;
            }
        }
    }
}