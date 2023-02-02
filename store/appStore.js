export const state = () => ({
  backedAPI: process.env.NODE_ENV === 'development' ? process.env.DEV_API : process.env.PROD_API,
  // isMobileRes : false,
  // isMobileRes : DisplayService.isMobile(),
  // searchNoResult: false,
  noScroll: true,
  isAdminMode: false,
  currentUser: false,
  enterAnimationDone: false,
  thumbsLoaded: false,
  gallery: false,
  galleryHeight: 0,
  cursorHover: {size: 65 , opacity: 0.3 },
})

// contains your actions
export const actions = {
}
// contains your mutations
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
// your root getters
export const getters = {
}
