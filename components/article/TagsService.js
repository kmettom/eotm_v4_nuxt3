import axios from 'axios';

if(window._eotmConfig.mode === 'development'){
  axios.defaults.withCredentials = false;
}

class TagsServiceClass {
  constructor(){
    this.getURL = window._eotmConfig[window._eotmConfig.mode].apiURL + '/tags/all';
    this.searchURL = window._eotmConfig[window._eotmConfig.mode].apiURL + '/tags/search/';
  }
  getTags(){
     return axios.get(this.getURL).then( (response) => {
      return response.data;
    }).catch( (error) =>  {
      console.log(error);
      return {};
    });
  }
  search(_query){
    // console.log('search FRONT -> ', _query);
    return axios.get( this.searchURL + _query).then( (response) => {
     return response.data;
   }).catch( (error) =>  {
     console.log(error);
     return {};
   });
  }

}

const TagsService = new TagsServiceClass();

export {TagsService};
