import axios from 'axios';
if(window._eotmConfig.mode === 'development'){
  axios.defaults.withCredentials = false;
}

 class ArticleServiceClass {

  constructor(){
    this.getArticleURL = window._eotmConfig[window._eotmConfig.mode].apiURL + '/article/';
    this.thumbsPage = 15;
  }

  getArticle(_articleHref){
    
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
