import ApiService,{UserServices} from "../common/api.service";
import JwtService from "../common/jwt.service";

const moduleUsers = {
    namespaced: true,
    state: {
        userData: {},
        isAuthenticated: JwtService.getToken()
    },
    mutations: {
        setUsersData(state, data){
            state.userData = data.user;
            state.isAuthenticated = true;
            JwtService.setToken(data.user.token);
            ApiService.setHeader();
        },
        logoutUser(state){
            state.userData = {};
            state.isAuthenticated = false;
            JwtService.destroyToken();
            ApiService.deleteHeader();
        }
    },
    actions: {
        login(context,data){
            return new Promise((resolve,reject) => {
                UserServices.login(data).then(response => {
                    context.commit('setUsersData',response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error.data);
                })
            })
        },
        logout(context){
          context.commit('logoutUser');
        },
        loginWith(context, data){
          context.commit('setUsersData',data);
        },
        registerUser(context, data){
            return new Promise((resolve,reject) => {
                UserServices.register(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error.data);
                })
            })
        },
        AuthCurrentUser(){
            return new Promise((resolve,reject) => {
                ApiService.setHeader();
                UserServices.get().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error.data);
                })
            })
        },
        updateUserData(context, data){
            return new Promise((resolve, reject) => {
                ApiService.setHeader();
                UserServices.updateUser(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error.data);
                })
            })
        }
    },
    getters: {
        getUserData(state){
            return state.userData;
        },
        getIsAuth(state){
            return state.isAuthenticated;
        }
    }
};

export default moduleUsers;