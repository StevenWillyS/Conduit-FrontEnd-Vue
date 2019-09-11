import ApiService from "../common/api.service";
// import JwtService from "../common/jwt.service"

const moduleProfile = {
    namespaced: true,
    state: {
        profile: [],
    },
    mutations: {
        setProfile(state, data){
            state.profile = data;
        }
    },
    actions: {
        fetchProfile(context, payload){
            const {username} = payload;
            return new Promise((resolve, reject) => {
                ApiService.get('profiles/'+username).then(response => {
                    context.commit('setProfile', response.data.profile);
                    resolve(response);
                }).catch(reason => {
                    reject(reason);
                })
            })
        },
        followUser(context, payload){
            const {username} = payload;
            return new Promise((resolve, reject) => {
                ApiService.post('profiles/'+username+'/follow').then(response => {
                    context.commit('setProfile', response.data.profile);
                    resolve(response);
                }).catch(reason => {
                    reject(reason);
                })
            })
        },
        unfollowUser(context, payload){
            const {username} = payload;
            return new Promise((resolve, reject) => {
                ApiService.delete('profiles/'+username+'/follow').then(response => {
                    context.commit('setProfile', response.data.profile);
                    resolve(response);
                }).catch(reason => {
                    reject(reason);
                })
            })
        }
    },
    getters: {
        getProfile(state){
            return state.profile;
        }
    }
}

export default moduleProfile;