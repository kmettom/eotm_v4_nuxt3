// import Vue from 'vue';
// import {CanvasService}  from './canvas/canvasService.js';
// import {DisplayService} from './displayService.js';


//**********************************
// Types: thumb, gallery, article
//**********************************

const imgLoader = {
  inserted: function (el, binding, vnode) {

    const isWebGlImage = binding.modifiers.webgl;

    el.style.opacity = '0';

    const addImageToWebGl = () => {

      if(el.getBoundingClientRect().width > 0){
        let timeout = binding.value.includes('thumb') ? 400 : 250;
        setTimeout(() => {
          CanvasService.addImageMesh(binding.arg, binding.value , el);
        }, timeout);
      }else {
        setTimeout(() => {
          addImageToWebGl();
        }, 100);
      }

    };

    el.addEventListener('load' , function(){
      if( isWebGlImage && !DisplayService.isMobile() ){
        addImageToWebGl();
      }else{
        el.style.opacity = '1';
      }
    });

  },
  unbind: (el, binding, vnode) => {
    if(binding.value){
      if(binding.arg == "imagegallery") return;
      if(DisplayService.isMobile()) return;
      CanvasService.removeImageMesh(binding.arg, binding.value );
    }
  }

};

export default {imgLoader};
