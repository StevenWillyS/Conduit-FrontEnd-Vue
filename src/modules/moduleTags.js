import {TagsService} from "../common/api.service";

const moduleTags = {
    namespaced: true,
    state: {
        tagList: []
    },
    mutations: {
        setTags(state,data){
            state.tagList = data;
        }
    },
    actions: {
        getTags(context){
            return new Promise((resolve,reject) =>{
                TagsService.get().then(response => {
                    context.commit('setTags', response.data.tags);
                    resolve();
                }).catch(reason => {
                    reject(reason);
                })
            })
        }
    }
}

export default moduleTags;