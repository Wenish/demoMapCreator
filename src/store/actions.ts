import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { State } from "./state";
import { saveAs } from 'file-saver';

export enum ActionTypes {
    SaveToJson = 'SAVE_TO_JSON'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.SaveToJson](context: ActionAugments): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.SaveToJson](context) {
        const data = context.state.data
        const mapName = context.state.data.map.name
        const fileName = `${mapName.replaceAll(' ', '_')}.json`;

        // Create a blob of the data
        const fileToSave = new Blob([JSON.stringify(data, undefined, 2)], {
            type: 'application/json'
        });

        // Save the file
        saveAs(fileToSave, fileName);
    }
}