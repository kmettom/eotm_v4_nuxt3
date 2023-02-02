import axios from 'axios';
import {state} from "~/store/appStore";

if(process.env.NODE_ENV === 'development'){
  axios.defaults.withCredentials = false;
}

class ThumbsServiceClass {

  constructor(){
    // this.getThumbsURL = '/articles/get/';
    this.getThumbsURL = state.backedAPI + '/articles/get/';
    // this.searchThumbsURL = '/articles/search/';
    this.searchThumbsURL = state.backedAPI + '/articles/search/';
    this.thumbsPage = 32;
  }
  getThumbsPage(_page){
    const isDev = false;
    let getThumbsURL =  isDev ?
     this.getThumbsURL + this.thumbsPage + '/' + _page + '?articlestatus=all' // get also test thumbs on development
     :
     this.getThumbsURL + this.thumbsPage + '/' + _page;

    return axios.get( getThumbsURL ).then(  (response) =>  { // add query  + '?articlestatus=all|ready|live , if query empty == life
      return response.data;
    })
    .catch( (error) =>  {
      console.log(error);
      return error;
    });
  }
  searchThumbsPage( _searchWord, _tags, _page ){

    return axios.get( this.searchThumbsURL + _searchWord + '?tags=' + _tags + '&page=' + _page + '&pagesize=' + this.thumbsPage ).then(  (response) =>  {  // add query  + '?articlestatus=all|ready|live , if query empty == life
      return response.data;
    })
    .catch( (error) =>  {
      console.log(error);
      return error;
    });
  }

}
const ThumbsService = new ThumbsServiceClass();
export { ThumbsService }
