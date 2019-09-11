import {API_URL} from "./config";
import Axios from "axios";
import JwtService from "./jwt.service";

const ApiService = {
    get(link, param=''){
        let url = API_URL+link+param;
        return Axios.get(url).then(response => {return response})
            .catch(reason => {return reason});
    },
    post(link, data=''){
        let url = API_URL+link;
        return Axios.post(url,data).then(response => {return response})
            .catch(reason => {return Promise.reject(reason.response)});
    },
    put(link, data){
        let url = API_URL+link;
        return Axios.put(url,data).then(response => {return response})
            .catch(reason => {return Promise.reject(reason.response)});
    },
    delete(link){
        let url = API_URL+link;
        return Axios.delete(url).then( response => {return response})
            .catch(reason => {return Promise.reject(reason.response)})
    },
    setHeader(){
        Axios.defaults.headers.common[
            "Authorization"
            ] = "Token "+ JwtService.getToken();
    },
    deleteHeader(){
        delete Axios.defaults.headers.common["Authorization"];
    }
};

export default ApiService;

export const TagsService = {
    get(){
         return ApiService.get('tags');
    }
};

export const ArticleServices = {
    get(param=''){
        return ApiService.get('articles',param);
    },
    post(data){
      return ApiService.post('articles',data);
    },
    put(slug, data){
        return ApiService.put('articles/'+slug, data);
    },
    favArticle(slug){
        let link = 'articles/'+slug+'/favorite';
        return ApiService.post(link)
            .then(response =>{
                return response;
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    unfavArticle(slug){
        let link = 'articles/'+slug+'/favorite';
        return ApiService.delete(link)
            .then(response =>{
                return response;
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
};

export const UserServices = {
    register(data){
        return ApiService.post('users',data)
            .then(response =>{
                return response;
            })
            .catch(error => {
                return Promise.reject(error);
        });
    },
    login(data){
        return ApiService.post('users/login',data)
            .then(response =>{
                return response;
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    updateUser(data){
      return ApiService.put('user', data)
          .then(response =>{
              return response;
          })
          .catch(error =>{
              return Promise.reject(error);
          })
    },
    get(){
        return ApiService.get('user')
            .then(response =>{
                return response;
            })
            .catch(error => {
                return Promise.reject(error);
            })
    }
};


