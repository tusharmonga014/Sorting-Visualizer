(this["webpackJsonpsorting-visualizer"]=this["webpackJsonpsorting-visualizer"]||[]).push([[0],{16:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(3),i=n.n(a),o=n(4),s=n(5),c=n(8),l=n(6),d=window.screen.width<=600?100:200,u=d/1.5,h="MERGE_SORT",g=function(e){return e<=10?4:e<=50?2:1},f=function(e){return window.screen.width<=600?.8:e<=16?.5:.66},v=(n(16),n(1)),p=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(o.a)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).getMarginBetweenBars=function(e){return g(e)},e.getBarsDisplayAreaWidth=function(e){var t=window.screen.width;return Math.floor(t*f(e))},e.getBarWidth=function(e,t,n){return(t-n*e)/e},e.showBarHeight=function(e){var t=e.target.id,n="bar"+t,r=document.getElementById(t),a=document.getElementById(n);r.style.opacity=.5,a.removeAttribute("hidden"),a.style.zIndex=1},e.hideBarHeight=function(e){var t=e.target.id,n="bar"+t,r=document.getElementById(t),a=document.getElementById(n);r.style.opacity=1,a.setAttribute("hidden",!0),a.style.zIndex=0},e.enableInputs=function(){for(var e=document.getElementsByClassName("input-disable-when-running"),t=0;t<e.length;t++)e[t].removeAttribute("disabled")},e.enableTexts=function(){for(var e=document.getElementsByClassName("text-disable-when-running"),t=0;t<e.length;t++)e[t].classList.remove("text-muted"),e[t].classList.add("text-white")},e.enableControlbarFeaturesWhenArrayIsSorted=function(){var t=e.props,n=t.array,r=t.sortedArray;n.length===r.length&&(e.enableInputs(),e.enableTexts())},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.array,r=t.currentlyChecking,a=t.pivot,i=t.sortedArray,o=n.length,s=this.getBarsDisplayAreaWidth(o),c=this.getMarginBetweenBars(o),l=this.getBarWidth(o,s,c),d=window.screen.width>=500&&o<23;return Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{className:"bars",style:{width:s},children:n.length>0&&n.map((function(t,n){var o=r.includes(n)?"blue":"rgb(0, 204, 255)";o=n===a?"rgb(102, 255, 51)":o,o=i.includes(n)?"purple":o;var s="bar"+n;return e.enableControlbarFeaturesWhenArrayIsSorted(),Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{id:s,className:"bar-height-display",hidden:!0,children:t}),Object(v.jsx)("div",{id:n,className:"bar",style:{width:l,height:t,backgroundColor:o,marginLeft:c},onMouseOver:e.showBarHeight,onMouseLeave:e.hideBarHeight,children:d?t:""})]},n)}))}),Object(v.jsx)("div",{className:"base-block bg-dark text-center"})]})}}]),n}(r.Component),b=n(2),m=Object(b.b)((function(e){return{array:e.array,algorithm:e.algorithm,currentlyChecking:e.currentlyChecking,pivot:e.pivot,sortedArray:e.sortedArray}}),(function(){return function(e){return{}}}))(p),y=(n(22),function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(o.a)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).resetArray=function(t){e.props.generateArray(t)},e.changeArraySize=function(t){e.resetArray(t.target.value)},e.getAlgorithmNameInTitleCase=function(e){switch(e){case"BUBBLE_SORT":return"Bubble Sort";case"MERGE_SORT":return"Merge Sort";case"QUICK_SORT":return"Quick Sort";case"HEAP_SORT":return"Heap Sort";default:console.error("No algorithm provided for conversion to title case")}},e.changeAlgorithm=function(t){var n=t.target.value;e.props.changeAlgorithm(n);var r=e.getAlgorithmNameInTitleCase(n);document.getElementById("dropdown-algo-selector").innerText=r},e.changeSpeed=function(t){var n=Number(t.target.value);e.props.changeSpeed(n)},e.disableInputs=function(){for(var e=document.getElementsByClassName("input-disable-when-running"),t=0;t<e.length;t++)e[t].setAttribute("disabled",!0)},e.disableTexts=function(){for(var e=document.getElementsByClassName("text-disable-when-running"),t=0;t<e.length;t++)e[t].classList.remove("text-white"),e[t].classList.add("text-muted")},e.disableControlBarFeatures=function(){e.disableInputs(),e.disableTexts()},e.startSorting=function(){e.disableControlBarFeatures(),e.props.startSorting()},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.resetArray(u)}},{key:"render",value:function(){var e=this,t=this.props.array.length;return Object(v.jsxs)("div",{className:"nav navbar navbar-dark bg-dark text-center p-2",children:[Object(v.jsx)("div",{className:"navbar navbar-brand col-sm-12 col-md-6 col-lg-4 text-center m-0 p-0",children:Object(v.jsx)("h2",{children:"SORTING VISUALIZER"})}),Object(v.jsxs)("div",{className:"col-sm-12 col-md-6 col-lg-3 text-justify-end m-0 p-0 array-algo-buttons",children:[Object(v.jsx)("button",{className:"generate-array-button btn btn-white btn-round mt-1 mb-1 mr-2 input-disable-when-running",onClick:function(){e.resetArray(t)},children:"Generate New Array"}),Object(v.jsxs)("div",{className:"btn-group",children:[Object(v.jsx)("button",{type:"button",id:"dropdown-algo-selector",className:"btn btn-success dropdown-toggle input-disable-when-running","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",children:this.getAlgorithmNameInTitleCase(h)}),Object(v.jsxs)("div",{className:"dropdown-menu",children:[Object(v.jsx)("h1",{className:"dropdown-header text-large",children:"Select Algorithm"}),Object(v.jsx)("div",{className:"dropdown-divider"}),Object(v.jsx)("button",{className:"dropdown-item",value:"MERGE_SORT",onClick:this.changeAlgorithm,children:"Merge Sort"}),Object(v.jsx)("div",{className:"dropdown-divider"}),Object(v.jsx)("button",{className:"dropdown-item",value:"QUICK_SORT",onClick:this.changeAlgorithm,children:"Quick Sort"}),Object(v.jsx)("div",{className:"dropdown-divider"}),Object(v.jsx)("button",{className:"dropdown-item",value:"BUBBLE_SORT",onClick:this.changeAlgorithm,children:"Bubble Sort"}),Object(v.jsx)("div",{className:"dropdown-divider"}),Object(v.jsx)("button",{className:"dropdown-item",value:"HEAP_SORT",onClick:this.changeAlgorithm,children:"Heap Sort"})]})]})]}),Object(v.jsxs)("div",{className:"col-md-12 col-lg-3 row slider-controls text-justify-end",children:[Object(v.jsx)("div",{className:"text-white text-center text-disable-when-running slider-controls col-sm-3 col-md-6 col-lg-6 mt-1 mb-1",children:"Array Size :"}),Object(v.jsx)("input",{className:"input-disable-when-running text-center slider-controls slider-range col-sm-7 col-md-6 col-lg-6 mt-1 mb-1",type:"range",min:10,max:d,defaultValue:u,onChange:this.changeArraySize}),Object(v.jsx)("div",{className:"text-white text-center text-disable-when-running slider-controls col-sm-3 col-md-6 col-lg-6 mb-1",children:"Sorting Speed :"}),Object(v.jsx)("input",{className:"input-disable-when-running text-center slider-controls slider-range col-sm-7 col-md-6 col-lg-6 mb-1",type:"range",min:"1",max:100,defaultValue:100,onChange:this.changeSpeed})]}),Object(v.jsx)("div",{className:"col-sm-12 col-md-12 col-lg-2 text-center mt-1 mb-1",children:Object(v.jsx)("button",{className:"btn btn-success btn-sort input-disable-when-running",onClick:this.startSorting,children:"START SORTING"})})]})}}]),n}(r.Component)),x=n(7);function j(e,t){return(e<0||e>=t)&&(console.error(e+" passed for swapping is out of bounds for "+t+", can't swap values."),!0)}function O(e,t){if(2!==t.length)return console.error("An array of 2 indices required for swapping instead recieved "+t.length+" values , can't swap values"),e;var n=e.length,r=t[0],a=t[1];if(j(r,n)||j(a,n))return e;for(var i=null,o=null,s=[],c=0;c<n;c++)c===r?i=e[c]:c===a&&(o=e[c]),s.push(e[c]);return s[r]=o,s[a]=i,s}function S(e,t,n,r){return e.splice(t,n,r),e}var w=Object(x.a)({array:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ARRAY":return t.payload;case"SWAP_VALUES":return O(e,t.payload);case"SET_VALUE":return S(e,t.payload.id,1,t.payload.data);default:return e}},algorithm:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ALGORITHM":return t.payload;default:return e}},speed:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SPEED":return t.payload;default:return e}},currentlyChecking:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENTLYCHECKING":return t.payload;default:return e}},pivot:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PIVOT":return t.payload;default:return e}},sortedArray:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SORTEDARRAY":return t.payload;case"ADD_TO_SORTEDARRAY":return e.concat(t.payload);default:return e}}}),A=Object(x.b)(w,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),T=function(e){return{type:"SWAP_VALUES",payload:e}},E=function(e){return{type:"SET_VALUE",payload:{id:e.index,data:e.value}}},I=function(e){return{type:"SET_CURRENTLYCHECKING",payload:e}},N=function(e){return{type:"ADD_TO_SORTEDARRAY",payload:e}};function R(){return 100-A.getState().speed}function _(e,t){A.dispatch(t(e))}function B(e,t,n,r,a,i){setTimeout((function(){var o=[t,t+1];_(o,I),r&&_(o,T),setTimeout((function(){_([],I)}),R()*(i-1)),a&&(_(t+1,N),e===n-2&&_(0,N))}),R()*i)}var C=function(){for(var e=A.getState(),t=0,n=e.array.slice(),r=e.array.length,a=0;a<r-1;a++)for(var i=0;i<r-a-1;i++){var o=!1,s=!1;if(n[i]>n[i+1]){var c=n[i];n[i]=n[i+1],n[i+1]=c,o=!0}i===r-a-2&&(s=!0),B(a,i,r,o,s,t),t+=2}},k=[];function L(e,t){setTimeout((function(){var n=e.k,r=e.value;_([e.firstIdx,e.secondIdx],I),setTimeout((function(){_([],I)}),R()*(t-1)),_({index:n,value:r},E)}),R()*t)}function D(e,t,n){if(!(t>=n)){var r=t+parseInt((n-t)/2);D(e,t,r),D(e,r+1,n),function(e,t,n,r){for(var a=n-t+1,i=r-n,o=new Array(a),s=new Array(i),c=0;c<a;c++)o[c]=e[[t+c]];for(var l=0;l<i;l++)s[l]=e[n+1+l];for(var d=0,u=0,h=t;d<a&&u<i;)o[d]<=s[u]?(e[h]=o[d],k.push({k:h,value:o[d],firstIdx:t+d,secondIdx:n+1+u}),d++):(e[h]=s[u],k.push({k:h,value:s[u],firstIdx:t+d,secondIdx:n+1+u}),u++),h++;for(;d<a;)e[h]=o[d],k.push({k:h,value:o[d],firstIdx:t+d,secondIdx:-1}),d++,h++;for(;u<i;)e[h]=s[u],k.push({k:h,value:s[u],firstIdx:-1,secondIdx:n+1+u}),u++,h++}(e,t,r,n)}}var M=function(){var e=A.getState(),t=e.array.slice();k=[],D(t,0,e.array.length-1);for(var n=0;n<k.length;n++)L(k[n],n+2),n===k.length-1&&setTimeout((function(){for(var e=0;e<t.length;e++)_(e,N)}),R()*(n+2))},U=function(e){return{type:"SET_PIVOT",payload:e}},H=[];function G(e,t){setTimeout((function(){var n=e.firstIdx,r=e.secondIdx,a=e.pivot,i=[n,r];_(i,I),_(a,U),setTimeout((function(){_([],I)}),R()*(t-1)),_(i,T)}),R()*t)}function V(e,t,n){if(!(t>=n)){var r=function(e,t,n){for(var r=e[n],a=t,i=t;i<n;i++)if(e[i]<r){var o=[e[a],e[i]];e[i]=o[0],e[a]=o[1],a++,H.push({firstIdx:i,secondIdx:a-1,pivot:n})}var s=[e[n],e[a]];return e[a]=s[0],e[n]=s[1],H.push({firstIdx:a,secondIdx:n,pivot:-1}),a}(e,t,n);V(e,t,r-1),V(e,r+1,n)}}var P=function(){var e=A.getState().array.slice();H=[],V(e,0,e.length-1);for(var t=0;t<H.length;t++)G(H[t],t+2),t===H.length-1&&setTimeout((function(){for(var t=0;t<e.length;t++)_(t,N)}),R()*(t+2))},W=[];function Y(e,t){setTimeout((function(){var n=e.firstIdx,r=e.secondIdx,a=e.nodeIndex,i=e.largest;_([n,r],I),setTimeout((function(){_([],I)}),R()*(t-1)),a!==i&&(_([a,i],T),null===n&&null===r&&_(i,N)),0===i&&_(0,N)}),R()*t)}function z(e,t,n){var r=t,a=2*t+1,i=2*t+2;if(a<n&&e[a]>e[r]&&(r=a),i<n&&e[i]>e[r]&&(r=i),W.push({firstIdx:a<n?a:null,secondIdx:i<n?i:null,nodeIndex:t,largest:r}),r!==t){var o=e[t];e[t]=e[r],e[r]=o,z(e,r,n)}}var K=function(){var e=A.getState().array.slice();W=[],function(e){for(var t=e.length,n=Math.floor(t/2)-1;n>=0;n--)z(e,n,t);for(var r=t-1;r>0;r--){var a=e[0];e[0]=e[r],e[r]=a,W.push({firstIdx:null,secondIdx:null,nodeIndex:0,largest:r}),z(e,0,r)}}(e);for(var t=0;t<W.length;t++)Y(W[t],t+2)};var Q=function(e,t){return Math.floor(Math.random()*(t+1))+e},F=function(e){e(I([])),e({type:"SET_SORTEDARRAY",payload:[]})},X=Object(b.b)((function(e){return{array:e.array,algorithm:e.algorithm}}),(function(){return function(e){return{generateArray:function(t){var n=function(e){for(var t=[],n=0;n<e;n++)t.push(Q(40,425));return t}(t);e({type:"SET_ARRAY",payload:n}),F(e)},changeAlgorithm:function(t){F(e),e({type:"SET_ALGORITHM",payload:t})},changeSpeed:function(t){F(e),e({type:"SET_SPEED",payload:t})},startSorting:function(){F(e),function(){switch(A.getState().algorithm){case"BUBBLE_SORT":C();break;case"MERGE_SORT":M();break;case"QUICK_SORT":P();break;case"HEAP_SORT":K();break;default:console.error("No sorting algorithm selected, can't sort")}}()}}}}))(y);var J=function(){return Object(v.jsxs)("div",{children:[Object(v.jsx)(X,{}),Object(v.jsx)(m,{})]})};var q=function(){return Object(v.jsx)(J,{})};i.a.render(Object(v.jsx)(b.a,{store:A,children:Object(v.jsx)(q,{})}),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.7201950c.chunk.js.map