// import {getUserAgent} from './useragent.js';
// import Vue from 'vue';
//
// Vue.directive('smoothScroll', {
//   inserted: function ( el, binding, vnode ) {
//     window.addEventListener( "resize", function() {
//       get_doc_height();
//     });
//
//     let scrl_element = null;
//     let Y_pos = 0;
//     let Y_dest = 0;
//     let slow = getUserAgent.isFirefox ? 1.6 : 2;
//     let moz_balancing = getUserAgent.isFirefox ? 20 : 1;
//     let key_scroll_size = 120; //80
//     let touchScrollSize = 20;
//     let is_disable = false;
//     let reachEnd = false;
//     let touchStartPos = 0;
//     let touchMovePos = 0;
//     let scrollPosition = 0;
//
//     binding.modifiers.max_scroll = null
//
//     const init  = (_el) => {
//       refresh(_el);
//       init_events_handlers();
//       render();
//     }
//
//     const scroll_top  = () => {
//       Y_dest = 0;
//     };
//
//     const scroll_top_instant  = () => {
//       Y_dest = 0;
//       Y_pos = 0;
//       el.style.transform = 'translate3d(0px, -' + Y_pos + 'px, 0px)';
//     };
//
//     binding.modifiers.scroll_top = scroll_top;
//
//     binding.modifiers.scroll_top_instant = scroll_top_instant;
//
//     const Y_dest_update = (_scrollTo) => {
//       Y_dest = _scrollTo;
//     }
//     const refresh = (_el) => {
//       init_elements(_el)
//       get_doc_height()
//     };
//     const init_elements = (_el) => {
//       scrl_element = _el;
//       Y_dest = 0, Y_pos = 0;
//     };
//     const get_doc_height = () => {
//       binding.modifiers.max_scroll = el.offsetHeight - window.innerHeight;
//     }
//     binding.modifiers.get_doc_height = get_doc_height;
//     const  wheel_handler = (_event) => {
//       // _event.preventDefault();
//
//       if (!is_disable) {
//         // getUserAgent.isSafari && _event.preventDefault();
//         let scrollSpeed = _event.deltaY * moz_balancing;
//         // let scrollSpeed = _event.deltaY ;
//         if( 0 <= Y_dest + scrollSpeed && Y_dest + scrollSpeed <= binding.modifiers.max_scroll ){
//           Y_dest += scrollSpeed / slow;
//         }else {
//           if( 0 >  scrollSpeed){
//             Y_dest = 0;
//           }else {
//             if(  scrollSpeed > binding.modifiers.max_scroll ){
//               Y_dest = binding.modifiers.max_scroll ;
//               reachEnd = true;
//             }
//           }
//         }
//       }
//     };
//     const keyboard_handler = (_event) => {
//
//       if(!is_disable){
//         if ("ArrowDown" == _event.key && Y_dest + key_scroll_size <= binding.modifiers.max_scroll) {
//           Y_dest += key_scroll_size
//         }else {
//           if ( "ArrowDown" == _event.key && Y_dest + key_scroll_size > binding.modifiers.max_scroll) {
//             Y_dest = binding.modifiers.max_scroll
//             reachEnd = true
//           }
//           else {
//             if("ArrowUp" == _event.key && 0 <= Y_dest - key_scroll_size){
//               Y_dest -= key_scroll_size
//             }else {
//               if("ArrowUp" == _event.key && 0 > Y_dest - key_scroll_size ){
//                 Y_dest = 0
//               }else {
//                 if ("Space" == _event.code && Y_dest + 300 <= binding.modifiers.max_scroll) {
//                   // Y_dest += 300
//                 }else {
//                   if ("Space" == _event.code && Y_dest + 300 > binding.modifiers.max_scroll ) {
//                     // Y_dest = binding.modifiers.max_scroll
//                     // reachEnd = true
//                   }
//                 }
//               }
//
//             }
//           }
//         }
//       }
//     };
//     const  touch_start_handler = (_event) => {
//       _event.preventDefault();
//       if(!is_disable){
//         touchStartPos = _event.touches[0].clientY;
//         scrollPosition = Y_dest;
//       }
//     };
//     const  touch_move_handler = (_event) => {
//       _event.preventDefault();
//
//       touchMovePos = _event.changedTouches[0].clientY;
//
//       if(0 < touchStartPos - touchMovePos){
//         if(scrollPosition <= binding.modifiers.max_scroll){
//           scrollPosition += 2.2 * (touchStartPos - touchMovePos)
//           touchStartPos = touchMovePos + 0
//           Y_dest = scrollPosition
//         }else {
//           if(  Y_dest + touchScrollSize > binding.modifiers.max_scroll){
//             Y_dest = binding.modifiers.max_scroll
//             reachEnd = true
//           }
//         }
//       }else {
//         if(  0 > touchStartPos - touchMovePos){
//           if(0 <= Y_dest - touchScrollSize){
//             scrollPosition += 2.2 * (touchStartPos - touchMovePos)
//             touchStartPos = touchMovePos - 0
//             Y_dest = scrollPosition
//           }else {
//             0 > Y_dest - touchScrollSize && (Y_dest = 0)
//           }
//         }
//       }
//
//     };
//     const init_events_handlers = () => {
//       window.addEventListener("scroll", function(_event) {
//         _event.preventDefault()
//       }),
//       window.addEventListener("wheel", wheel_handler ),
//       window.addEventListener("keydown", keyboard_handler ),
//       window.addEventListener("touchstart", touch_start_handler ),
//       window.addEventListener("touchmove", touch_move_handler )
//     }
//     const positionNumConvert = (_yPos,_yDest, _coef) => {
//       return (1 - _coef) * _yPos + _coef * _yDest
//     }
//     const transform_elements = () => {
//       if (!is_disable) {
//         Y_pos = positionNumConvert(Y_pos, Y_dest, .08);
//         Y_pos = Math.floor(100 * Y_pos) / 100;
//         el.style.transform = 'translate3d(0px, -' + Y_pos + 'px, 0px)';
//       }
//     }
//     const render = () => {
//       transform_elements();
//       try {
//         requestAnimationFrame(render.bind(this));
//       } catch (_) {
//         setImmediate(render.bind(this));
//       }
//     }
//
//     init(el);
//
//   },
//   update: function(el, binding, vnode){
//
//     if(binding.value.scrollTop != binding.oldValue.scrollTop){
//       binding.modifiers.scroll_top();
//       // binding.modifiers.scroll_top_instant();
//     }
//     else if (binding.value.scrollSetTop != binding.oldValue.scrollSetTop) {
//       binding.modifiers.scroll_top_instant();
//     }
//     else if (binding.value.updateHeight != binding.oldValue.updateHeight) {
//       binding.modifiers.get_doc_height();
//     }
//
//   },
//   componentUpdated: function( el , binding , vnode ){
//     setTimeout(() => {
//       binding.modifiers.get_doc_height()
//     }, 300);
//
//   }
// })
