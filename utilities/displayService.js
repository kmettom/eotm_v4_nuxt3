// import store from '../appStore.js';
// import {CanvasService} from  './canvas/canvasService.js';
class DisplayServiceClass {

  constructor(){
    this.mobileResBreak = 650;
  }

  isMobile(_windowWidth){
    return _windowWidth < this.mobileResBreak ;
    // return false;
  }

  init(_window) {

    _window.addEventListener('resize' , (_event) => {

      if( this.isMobile() ){
        // CanvasService.disableCanvas();
      }else {
        // CanvasService.resizeInProgress = true;
        setTimeout(() => {
          // CanvasService.resizeInProgress = false;
        }, 150);
        setTimeout(() => {
          // if(!CanvasService.resizeInProgress) {
          //   CanvasService.resetCanvasSize();
          // }
        }, 300);
      }
    });

  }

}

const DisplayService = new DisplayServiceClass();
export default  DisplayService
