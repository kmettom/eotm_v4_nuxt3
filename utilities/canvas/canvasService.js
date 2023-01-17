//
// import * as THREE from 'three';
// import Scroll from './scroll.js';
//
// import gsap from 'gsap';
//
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//
// import imageGalleryFragment from './shaders/imageGalleryFragment.glsl';
// import imageGalleryVertex from './shaders/imageGalleryVertex.glsl';
// import galleryFragment from './shaders/galleryFragment.glsl';
// import galleryVertex from './shaders/galleryVertex.glsl';
// import thumbFragment from './shaders/thumbFragment.glsl';
// import thumbVertex from './shaders/thumbVertex.glsl';
// import scrollFragment from './shaders/scrollFragment.glsl';
// import scrollVertex from './shaders/scrollVertex.glsl';
//
//
// // import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// // import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// // import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// // import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
//
// // import {DisplayService} from '../displayService.js';
// // import store from '../../appStore.js'
//
// class canvasServiceClass{
//   constructor(options){
//
//     this.scrollInProgress = false;
//     this.galleryActive = {value:0}; // false
//     this.thumbToArticleAnimation = false;
//     this.resizeInProgress = false;
//     this.hoverInProgress = true;
//     this.container = options.dom;
//     this.pointer = {cursor: null , intersects: null };
//     this.saveScrollPosition = 0;
//     this.container = options.dom;
//
//     this.time = 0;
//     this.scene = new THREE.Scene();
//
//     this.materials = [];
//     this.imageStore = [];
//
//     this.options = {
//       gallery: {
//         fragmentShader: galleryFragment,
//         vertexShader: galleryVertex,
//       },
//       thumb: {
//         fragmentShader: thumbFragment,
//         vertexShader: thumbVertex,
//       },
//       imagegallery: {
//         fragmentShader: imageGalleryFragment,
//         vertexShader: imageGalleryVertex,
//       },
//
//     }
//
//   }
//   canvasInit(){
//
//     this.width = this.container.offsetWidth;
//     this.height = this.container.offsetHeight;
//
//     this.camera = new THREE.PerspectiveCamera( 70, this.width/this.height, 100, 2000 );
//     this.camera.position.z = 600; // 600
//
//     this.camera.fov = 2*Math.atan( (this.height/2)/600 )* (180/Math.PI);
//
//     this.renderer = new THREE.WebGLRenderer({
//       // antialias: true,
//       alpha: true
//     });
//     this.renderer.setPixelRatio(Math.min(window.devicePixelRatio , 1.5));
//
//     // SHADOW
//     this.renderer.shadowMap.enabled = true;
//     this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//
//     this.container.appendChild( this.renderer.domElement );
//
//     // this.controls = new OrbitControls( this.camera, this.renderer.domElement );
//
//     this.currentScroll = 0;
//     this.raycaster = new THREE.Raycaster();
//     this.pointer.cursor = new THREE.Vector2();
//
//     this.setSize();
//
//     this.scroll = new Scroll({
//       // dom: document.getElementById('scrollContainer'),
//     });
//
//     this.setLight()
//
//     this.composerPass()
//
//     this.render();
//
//     window.addEventListener('pointermove', (event) => {
//       this.pointer.cursor.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//       this.pointer.cursor.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//     });
//   }
//   checkGalleryImageHovers(){
//     if(this.galleryActive.value !== 0){
//
//       this.raycaster.setFromCamera( this.pointer.cursor , this.camera );
//       this.pointer.intersects = this.raycaster.intersectObjects( this.scene.children ).filter(i => {return !i.object.name.includes("imagegallery")} );
//       const inter = this.raycaster.intersectObjects( this.scene.children );
//       let materialHovered = { name: false };
//
//       if(this.pointer.intersects.length > 0) {
//         this.hoverInProgress = true;
//
//         materialHovered = this.materials.filter(m => {return m.name == this.pointer.intersects[0].object.name})[0];
//         gsap.to( materialHovered.uniforms.hoverState, {
//           duration: 0.5,
//           value:1
//         })
//
//       }
//       else {
//         this.hoverInProgress = false;
//       }
//
//       for (var i = 0; i < this.materials.length; i++) {
//         if( this.materials[i].name != materialHovered.name && this.materials[i].uniforms.hoverState.value > 0  ){
//           gsap.to( this.materials[i].uniforms.hoverState, {
//             duration: 0.35,
//             value:0
//           })
//         }
//       }
//
//     }
//   }
//   resetCanvasSize(){
//
//     this.setSize();
//
//     store.commit("gallery" , false );
//
//     for (var i = 0; i < this.imageStore.length; i++) {
//       if(this.imageStore[i].name.includes('imagegallery')){
//         this.removeImageMesh("imagegallery" , this.imageStore[i].name);
//         // let removeImage = this.scene.getObjectByName(this.imageStore[i].name);
//         // this.scene.remove(removeImage);
//       }
//     }
//
//     this.resetImageMeshPosition();
//
//     if(this.imageStore.length == 0){
//       window.location.reload(false);
//     }
//
//   }
//   setSize(){
//     this.width = this.container.offsetWidth;
//     this.height = this.container.offsetHeight;
//
//     this.camera.aspect = this.width/this.height;
//     this.camera.updateProjectionMatrix();
//
//     this.renderer.setSize( this.width,this.height );
//     this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//     this.renderer.render(this.scene, this.camera); // -> Also needed
//   }
//   setLight(){
//     let light = new THREE.PointLight( 0xffffff, 1 );
//     light.position.set( 0, 0.5, 0 );
//     light.castShadow = true;
//     // console.log("light" , light);
//     this.scene.add( light );
//
//     let ambientLight = new THREE.AmbientLight(0xffffff, 5);
//     // console.log("ambientLight" , ambientLight);
//     this.scene.add(ambientLight);
//   }
//   meshAniIn(_mesh, _material, _type) {
//     const min = 1;
//     const max = _type == "gallery" ? 1000:500;
//     const randomize = Math.floor(Math.random() * (max - min + 1) + min);
//     setTimeout( () => {
//       gsap.to(_material.uniforms.aniIn , {
//         duration: _type == "gallery" ? 2 : 1.25,
//         value: 1
//       })
//     } , randomize)
//
//   }
//
//   meshMouseListeners(_mesh, _material) {
//
//     // _mesh.img.addEventListener('mousemove',(event)=>{
//     //   this.hoverInProgress = true;
//     //
//     //   gsap.to(_material.uniforms.cursorPositionX,{
//     //     duration: 0,
//     //     value: event.layerX
//     //   })
//     //   gsap.to(_material.uniforms.cursorPositionY,{
//     //     duration: 0,
//     //     value: event.layerY
//     //   })
//     //
//     // })
//
//     _mesh.img.addEventListener('mouseenter',(event)=>{
//       _mesh.mesh.renderOrder = 1;
//       this.hoverInProgress = true;
//
//       gsap.to(_material.uniforms.hoverState, {
//         duration: 0.5,
//         value:1
//       })
//     })
//
//     _mesh.img.addEventListener('mouseout',()=>{
//       _mesh.mesh.renderOrder = 0;
//
//       this.hoverInProgress = false;
//
//       // gsap.to(_material.uniforms.cursorPositionX,{
//       //   duration: 0.5,
//       //   value:0
//       // })
//       // gsap.to(_material.uniforms.cursorPositionY,{
//       //   duration: 0.5,
//       //   value:0
//       // })
//       gsap.to(_material.uniforms.hoverState,{
//         duration: 0.5,
//         value:0
//       })
//     })
//
//   }
//   addImageMesh( _type , _id , _img){
//     let fragmentShader;
//     let vertexShader;
//     let geometry;
//     let bounds = _img.getBoundingClientRect();
//     let position = { top : bounds.top , left: bounds.left};
//     position.top += this.currentScroll;
//
//     if(_type === "thumb"){
//       geometry = new THREE.CircleGeometry( bounds.width*0.58 , 6 , 11);
//       if(DisplayService.isMobile()){
//         geometry = new THREE.PlaneGeometry( 375 , 250 );
//       }
//     }else if (_type === "gallery") {
//       geometry = new THREE.PlaneGeometry( bounds.width , bounds.height );
//     }
//     else if (_type === "imagegallery") {
//       geometry = new THREE.PlaneGeometry( bounds.width , bounds.height );
//       position.top += this.currentScroll ;
//     }
//
//     let texture = new THREE.Texture(_img);
//     texture.needsUpdate = true;
//
//     let material = new THREE.ShaderMaterial({
//       uniforms:{
//         time: {value:0},
//         uImage: {value: texture},
//         vectorVNoise: {value: new THREE.Vector2( 1.5 , 1.5 )}, // 1.5
//         vectorWave: {value: new THREE.Vector2( 0.5 , 0.5 )}, // 0.5
//         hoverState: {value: 0},
//         cursorPositionX: {value: 0},
//         cursorPositionY: {value: 0},
//         aniIn: {value: 0},
//         aniOut: {value: 0},
//         aniOutToArticle: {value: 0},
//         aniInImageGallery: {value: 0},
//         aniOutImageGallery: {value: 0},
//         galleryActive: {value: 0},
//       },
//       fragmentShader: this.options[_type].fragmentShader,
//       vertexShader: this.options[_type].vertexShader,
//       transparent: true,
//       name: _id,
//       // opacity: 0.1,
//       // side: THREE.DoubleSide,
//       // wireframe: true
//     });
//
//     this.materials.push(material);
//
//     let mesh = new THREE.Mesh( geometry, material );
//     mesh.name =  _id;
//
//     mesh.castShadow = true;
//     mesh.receiveShadow = true;
//     this.scene.add(mesh);
//
//     const newMesh = {
//       name:_id,
//       img: _img,
//       mesh: mesh,
//       top: position.top,
//       left: position.left,
//       width: bounds.width,
//       height: bounds.height,
//       thumbOutAction: {value: 0},
//     }
//
//     this.imageStore.push(newMesh);
//     this.meshMouseListeners(newMesh, material);
//     this.meshAniIn(newMesh, material, _type);
//     this.scroll.setSize();
//
//     let meshIndex = this.imageStore.length -1;
//
//     this.setImageMeshPositions();
//
//   }
//   resetImageMeshPosition(){
//     for (var i = 0; i < this.imageStore.length; i++) {
//       const newBounds = this.imageStore[i].img.getBoundingClientRect();
//
//       if(this.galleryActive.value === 0){
//
//         this.imageStore[i].left = newBounds.left;
//         this.imageStore[i].top = newBounds.top;
//         this.imageStore[i].width = newBounds.width;
//         this.imageStore[i].height = newBounds.height;
//         this.imageStore[i].mesh.position.x = this.imageStore[i].left - this.width/2 + this.imageStore[i].width/2;
//         this.imageStore[i].mesh.position.y =  - this.imageStore[i].top + this.height/2 - this.imageStore[i].height/2;
//
//       }
//
//     }
//
//   }
//   setImageMeshPositions(){
//     const imgMargin = 20;
//
//     if(!this.imageStore) return;
//
//     for (var i = 0; i < this.imageStore.length ; i++) {
//
//       if(this.imageStore[i].mesh.name.includes("imagegallery") ){
//         this.imageStore[i].mesh.position.x = this.imageStore[i].left - this.width/2 + this.imageStore[i].width/2 ;
//       }else {
//
//         if(
//           this.currentScroll < this.imageStore[i].top + this.imageStore[i].height
//           && this.imageStore[i].top  < this.currentScroll + this.height
//           || this.galleryActive.value !== 0
//         ){
//
//           let thumbOut = ( 1 - this.imageStore[i].thumbOutAction.value/1.5);
//           this.imageStore[i].mesh.position.x = imgMargin * this.galleryActive.value + ( this.imageStore[i].left * ( 1 - this.galleryActive.value ) - this.width/2 + this.imageStore[i].width/2) * thumbOut;
//
//           let galleryImgCoef = store.state.galleryHeight / 1000 ;
//           // let galleryImgCoef = store.state.galleryHeight / document.body.offsetHeight ;
//           galleryImgCoef = galleryImgCoef >= 1 ? (this.currentScroll * galleryImgCoef) : ( - this.currentScroll * ( 1 - galleryImgCoef))
//
//           let thumbOutScrollCounter = 0 ;
//           // console.log("saveScrollPosition" , this.saveScrollPosition, this.currentScroll);
//           // if( this.imageStore[i].thumbOutAction.value !== 0 ){
//           //    thumbOutScrollCounter = this.saveScrollPosition;
//           // }
//           let galleryImgPos = (  ( galleryImgCoef ) - this.height/2 +  this.imageStore[i].top  - ( this.imageStore[i].height * i ) - imgMargin - ( imgMargin * i ) ) * this.galleryActive.value;
//           this.imageStore[i].mesh.position.y =  ( this.currentScroll + galleryImgPos - this.imageStore[i].top + this.height/2 - this.imageStore[i].height/2) * thumbOut + thumbOutScrollCounter;
//
//         }
//         else {
//           this.imageStore[i].mesh.position.y = this.height*2;
//         }
//
//       }
//
//     }
//   }
//   removeImageMesh(_type , _id ){
//     const selectedObject = this.scene.getObjectByName(_id);
//     if (selectedObject && selectedObject.material.uniforms.aniOut.value) {
//       setTimeout(() => {
//         requestAnimationFrame( () => {this.removeImageMesh(_type , _id)} )
//       } , 10);
//     }
//     else if(selectedObject && !selectedObject.material.uniforms.aniOut.value) {
//       this.scene.remove( selectedObject )
//       this.imageStore = this.imageStore.filter((mesh) => {
//         return mesh.name != _id;
//       });
//       this.materials = this.materials.filter((material) => {
//         return material.name != _id;
//       });
//       //xxx to do - remove from materials and imagestore!
//     };
//   }
//   thumbToArticle(_meshId){
//
//     return new Promise( ( resolve, reject ) => {
//
//       this.thumbToArticleAnimation = true;
//       this.saveScrollPosition = this.currentScroll;
//
//       const aniTOutAll = 1; //0.5
//       const aniTOutThumb = 1.25; //1.5
//       // const routeChangeDelay = aniTOutAll + aniTOutThumb;
//       const routeChangeDelay = aniTOutAll;
//       const selectedObject = this.scene.getObjectByName(_meshId);
//
//       for (var i = 0; i < this.imageStore.length; i++) {
//         if(this.imageStore[i].name == _meshId){
//           gsap.to( this.imageStore[i].thumbOutAction , {
//             duration: aniTOutThumb,
//             value:1,
//             onComplete: () => {
//               this.thumbToArticleAnimation = false;
//             },
//           })
//         }
//       }
//
//       gsap.to(selectedObject.material.uniforms.hoverState, {
//         duration: aniTOutAll + aniTOutThumb,
//         value:0
//       })
//
//       gsap.to( selectedObject.material.uniforms.aniOut , {
//         delay:  0,
//         duration: aniTOutThumb,
//         ease: "Power2.easeOut",
//         value:1,
//         onComplete: () => {
//           selectedObject.material.uniforms.aniOut.value = 0;
//           selectedObject.material.uniforms.aniIn.value = 0;
//         },
//       })
//
//       const min = 1;
//       const max = 500;
//
//       for (var i = 0; i < this.materials.length; i++) { // animate out all thumbs
//         if(this.materials[i].name != selectedObject.name){
//           const randomize = Math.floor(Math.random() * (max - min + 1) + min);
//
//           this.materials[i].uniforms.aniIn.value = 1;
//           gsap.to(this.materials[i].uniforms.aniIn , {
//             duration: aniTOutAll + randomize / 1000,
//             value:0
//           })
//
//         }
//       }
//
//       setTimeout(()=>{
//         resolve('');
//       }, (routeChangeDelay)*1000);
//
//     });
//
//   }
//   scrollToTop(){
//     this.scroll.render("0", false);
//   }
//   scrollTo(_position){
//     this.scroll.render(_position, true);
//   }
//   scrollToMesh(_name){
//     let scrollToMesh = this.scene.getObjectByName(_name);
//     let scrollTo = - Number(scrollToMesh.position.y) / 2;
//     this.scroll.render(scrollTo, true);
//   }
//   openGalleryCanvas(_galleryData){
//     const galleryStateTo = _galleryData == false ? 0 : 1;
//     const galleryAniTime = 0.5;
//     this.container.style.zIndex = _galleryData == false ? -1 : 37;
//
//     gsap.to( this.galleryActive , {
//       duration: galleryAniTime,
//       value: galleryStateTo,
//       ease: "sine.inOut",
//       onComplete: () => {
//         if(_galleryData == false){
//           let firstGalleryMesh = this.scene.children.find((i) => { return i.name.includes("gallery")});
//           if(!firstGalleryMesh) return;
//           this.scrollToMesh( firstGalleryMesh.name );
//         }else {
//           this.scrollToMesh( "gallery" + _galleryData.articleHref + '_' + _galleryData.picIndex );
//         }
//       }
//     })
//
//   }
//   composerPass(){
//     this.composer = new EffectComposer(this.renderer);
//     this.renderPass = new RenderPass(this.scene, this.camera);
//     this.composer.addPass(this.renderPass);
//
//     //custom shader pass
//     // var counter = 0.0;
//     this.myEffect = {
//       uniforms: {
//         "tDiffuse": { value: null },
//         "scrollSpeed": { value: null },
//       },
//       vertexShader: scrollVertex,
//       fragmentShader: scrollFragment,
//     }
//
//     this.customPass = new ShaderPass(this.myEffect);
//     this.customPass.renderToScreen = true;
//
//     this.composer.addPass(this.customPass);
//   }
//   render(){
//     this.time+=0.05;
//
//     this.scroll.render();
//     this.scrollInProgress = this.currentScroll != this.scroll.scrollToRender ;
//     this.currentScroll = this.scroll.scrollToRender;
//
//     // if(this.resizeInProgress ) {
//     //   this.resetImageMeshPosition();
//     // }
//
//     //animate on scroll
//     if(
//       this.scrollInProgress
//       || ( 0 < this.galleryActive.value && this.galleryActive.value < 1)
//       || this.thumbToArticleAnimation
//     ){
//       this.customPass.uniforms.scrollSpeed.value = this.scroll.speedTarget;
//       this.setImageMeshPositions();
//     }
//
//     //animate on hover
//     for (var i = 0; i < this.materials.length; i++) {
//       this.materials[i].uniforms.time.value = this.time;
//     }
//
//     this.checkGalleryImageHovers()
//
//     this.composer.render()
//
//     window.requestAnimationFrame(this.render.bind(this));
//
//   }
//   disableCanvas(){
//
//     // this.removeAllMeshes();
//     //
//     // let $imgs = document.getElementsByTagName('img');
//     // for (var i = 0; i < $imgs.length; i++) {
//     //   if( !$imgs[i].classList.contains('logo') ){
//     //     $imgs[i].style.opacity = '1';
//     //   }
//     // }
//   }
//   removeAllMeshes(){
//     if(this.scene.children.length > 0){
//       for (var i = 0; i <   this.imageStore.length; i++) {
//         const selectedObject = this.scene.getObjectByName(  this.imageStore[i].name);
//         this.scene.remove( selectedObject )
//       }
//       this.imageStore = [];
//       this.materials = [];
//     }
//   }
//
// }
//
// const CanvasService = new canvasServiceClass({
//   // dom: document.getElementById('eotmAnimationContainer')
// });
//
// // export default { CanvasService };
