export const state = () => ({
  "backedAPI": "https://eotm-app.herokuapp.com",
  "noScroll": true,
  "isAdminMode": false,
  "currentUser": false,
  "enterAnimationDone": false,
  "thumbsLoaded": false,
  "gallery": false,
  "galleryHeight": 0,
  "cursorHover": {size: 65 , opacity: 0.3 },
})

export const actions = {
}
export const mutations = {
  gallery( state, galleryData ){
    state.gallery = galleryData;
    // CanvasService.openGalleryCanvas(galleryData);
    if(galleryData){
      state.galleryHeight = state.gallery.pictures.length * 175;
    }
  },
  enterAnimationDone (state, _newStatus) {
    state.enterAnimationDone =  _newStatus;
  },
  thumbsLoaded (state, _newStatus) {
    state.thumbsLoaded =  _newStatus;
  },
  noScrollState (state, _newStatus) {
    state.noScroll =  _newStatus;
  }
}
export const getters = {
}
