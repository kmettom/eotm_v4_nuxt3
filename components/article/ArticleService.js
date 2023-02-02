import axios from 'axios';
import {state} from "~/store/appStore";

if( process.env.NODE_ENV === 'development' ){
  axios.defaults.withCredentials = false;
}

console.log(process.env.NODE_ENV + ' ' + process.env.DEV_API + ' ' + process.env.PROD_API , state);

 class ArticleServiceClass {

  constructor(){
    this.getArticleURL = '/article/';
    // this.getArticleURL = store.backedAPI + '/article/';
    this.thumbsPage = 15;
  }

  getArticle(_articleHref){
        console.log(state)
    return axios.get( this.getArticleURL + _articleHref  ).then(  (response) =>  {
      return response.data;
    })
    .catch( (error) =>  {
      console.log(error);
      return error;
    });

  }

}

const ArticleService = new ArticleServiceClass();

export { ArticleService }
