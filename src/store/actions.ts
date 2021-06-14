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
        var data = context.state
        var fileName = 'myData.json';
        
        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(data)], {
            type: 'application/json'
        });
        
        // Save the file
        saveAs(fileToSave, fileName);
    }
}