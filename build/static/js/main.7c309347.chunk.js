(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var c=a(1),r=a.n(c),n=a(10),s=a.n(n),i=a(2),o=a(3),l=a(5),h=a(4),d=(a(15),a(0)),u=function(){return Object(d.jsxs)("header",{className:"app__header",children:[Object(d.jsx)("h1",{className:"app__title",children:Object(d.jsxs)("a",{href:"#",children:[Object(d.jsx)("span",{children:"Marvel"})," information portal"]})}),Object(d.jsx)("nav",{className:"app__menu",children:Object(d.jsxs)("ul",{children:[Object(d.jsx)("li",{children:Object(d.jsx)("a",{href:"#",children:"Characters"})}),"/",Object(d.jsx)("li",{children:Object(d.jsx)("a",{href:"#",children:"Comics"})})]})})]})},j=(a(17),function(){return Object(d.jsxs)("div",{id:"circularG",children:[Object(d.jsx)("div",{id:"circularG_1",className:"circularG"}),Object(d.jsx)("div",{id:"circularG_2",className:"circularG"}),Object(d.jsx)("div",{id:"circularG_3",className:"circularG"}),Object(d.jsx)("div",{id:"circularG_4",className:"circularG"}),Object(d.jsx)("div",{id:"circularG_5",className:"circularG"}),Object(d.jsx)("div",{id:"circularG_6",className:"circularG"}),Object(d.jsx)("div",{id:"circularG_7",className:"circularG"}),Object(d.jsx)("div",{id:"circularG_8",className:"circularG"})]})}),m=a.p+"static/media/error.42292aa1.gif",b=function(){return Object(d.jsx)("img",{src:m,alt:"Error",style:{margin:" 0 auto",height:"250px"}})},f=a(6),O=a.n(f),v=a(7),p=function e(){var t=this;Object(i.a)(this,e),this._apiBase="https://gateway.marvel.com:443/v1/public/",this._apiKey="apikey=ee5953dc31f3d6f456feeaafb26f8003",this._baseOffset=180,this.getResource=function(){var e=Object(v.a)(O.a.mark((function e(t){var a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if((a=e.sent).ok){e.next=5;break}throw new Error("Could not fetch".concat(t,", status ").concat(a.status));case 5:return e.next=7,a.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.getAllCharacters=Object(v.a)(O.a.mark((function e(){var a,c,r=arguments;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>0&&void 0!==r[0]?r[0]:t._baseOffset,e.next=3,t.getResource("".concat(t._apiBase,"characters?limit=9&offset=").concat(a,"&").concat(t._apiKey));case 3:return c=e.sent,e.abrupt("return",c.data.results.map(t._transformCharacter));case 5:case"end":return e.stop()}}),e)}))),this.getCharacter=function(){var e=Object(v.a)(O.a.mark((function e(a){var c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getResource("".concat(t._apiBase,"/characters/").concat(a,"?").concat(t._apiKey));case 2:return c=e.sent,e.abrupt("return",t._transformCharacter(c.data.results[0]));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this._transformCharacter=function(e){var t=e.description?e.description:"Unfortunately, we can't find the description of this character";return t.length>=200&&(t=t.slice(0,200)+"..."),{comics:e.comics.items,id:e.id,name:e.name,description:t,thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,homepage:e.urls[0].url,wiki:e.urls[1].url}}},_=(a(19),a.p+"static/media/mjolnir.61f31e18.png"),x=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var c=arguments.length,r=new Array(c),n=0;n<c;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).state={char:{},loading:!0,error:!1},e.marvelService=new p,e.onCharLoaded=function(t){e.setState({char:t,loading:!1})},e.onError=function(){e.setState({error:!0,loading:!1})},e.getRandomCharacter=function(){e.setState({loading:!0});var t=Math.floor(400*Math.random()+1011e3);e.marvelService.getCharacter(t).then((function(t){e.onCharLoaded(t)})).catch(e.onError)},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getRandomCharacter()}},{key:"render",value:function(){var e=this.state,t=e.char,a=e.loading,c=e.error,r=a?Object(d.jsx)(j,{}):null,n=c?Object(d.jsx)(b,{}):null,s=a||c?null:Object(d.jsx)(g,{char:t});return Object(d.jsxs)("div",{className:"randomchar",children:[r,n,s,Object(d.jsxs)("div",{className:"randomchar__static",children:[Object(d.jsxs)("p",{className:"randomchar__title",children:["Random character for today!",Object(d.jsx)("br",{}),"Do you want to get to know him better?"]}),Object(d.jsx)("p",{className:"randomchar__title",children:"Or choose another one"}),Object(d.jsx)("button",{className:"button button__main",children:Object(d.jsx)("div",{className:"inner",onClick:this.getRandomCharacter,children:"try it"})}),Object(d.jsx)("img",{src:_,alt:"mjolnir",className:"randomchar__decoration"})]})]})}}]),a}(c.Component),g=function(e){var t=e.char,a=t.name,c=t.description,r=t.thumbnail,n=t.homepage,s=t.wiki,i={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===r&&(i={objectFit:"contain"}),Object(d.jsxs)("div",{className:"randomchar__block",children:[Object(d.jsx)("img",{src:r,alt:"Random character",className:"randomchar__img",style:i}),Object(d.jsxs)("div",{className:"randomchar__info",children:[Object(d.jsx)("p",{className:"randomchar__name",children:a}),Object(d.jsx)("p",{className:"randomchar__descr",children:c}),Object(d.jsxs)("div",{className:"randomchar__btns",children:[Object(d.jsx)("a",{href:n,className:"button button__main",children:Object(d.jsx)("div",{className:"inner",children:"homepage"})}),Object(d.jsx)("a",{href:s,className:"button button__secondary",children:Object(d.jsx)("div",{className:"inner",children:"Wiki"})})]})]})]})},N=x,C=a(9),y=(a(20),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var c=arguments.length,r=new Array(c),n=0;n<c;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).state={chars:[],loading:!0,error:!1,offset:180,loadingNewChars:!1,charsCapReached:!1,bottomReached:!1},e.service=new p,e.newCharsOnScroll=function(){var t=e.state,a=t.bottomReached,c=t.loadingNewChars,r=t.charsCapReached;!a||c||r||e.requestCharacters(e.state.offset)},e.checkIfBottom=function(){window.scrollY+document.documentElement.clientHeight>=document.body.scrollHeight&&e.setState({bottomReached:!0})},e.onLoading=function(){e.setState({loadingNewChars:!0})},e.onFinishedLoading=function(t){var a=!1;t.length<9&&(a=!0),e.setState((function(e){var c=e.chars,r=e.offset;return{chars:[].concat(Object(C.a)(c),Object(C.a)(t)),loading:!1,offset:r+9,loadingNewChars:!1,charsCapReached:a,bottomReached:!1}}))},e.onError=function(){e.setState({error:!0,loading:!1})},e.refsItems=[],e.setRef=function(t){e.refsItems.push(t)},e.focusOnItem=function(t){e.refsItems.forEach((function(e){e.classList.remove("char__item_selected")})),e.refsItems[t].classList.add("char__item_selected"),e.refsItems[t].focus()},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.requestCharacters(),window.addEventListener("scroll",this.checkIfBottom),window.addEventListener("scroll",this.newCharsOnScroll)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.newCharsOnScroll),window.removeEventListener("scroll",this.newCharsOnScroll)}},{key:"requestCharacters",value:function(e){var t=this;this.onLoading(),this.service.getAllCharacters(e).then((function(e){return t.onFinishedLoading(e)})).catch(this.onError)}},{key:"createContent",value:function(){var e=this,t=this.state.chars.map((function(t,a){var c={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===t.thumbnail&&(c={objectFit:"unset"}),Object(d.jsxs)("li",{className:"char__item",tabIndex:0,ref:e.setRef,onClick:function(){e.props.onSelectChar(t.id),e.focusOnItem(a)},onKeyPress:function(c){" "!==c.key&&"Enter"!==c.key||(e.props.onSelectChar(t.id),e.focusOnItem(a))},children:[Object(d.jsx)("img",{src:t.thumbnail,alt:t.name,style:c}),Object(d.jsx)("div",{className:"char__name",children:t.name})]},t.id)}));return Object(d.jsx)("ul",{className:"char__grid",children:t})}},{key:"render",value:function(){var e=this,t=this.state,a=t.loading,c=t.error,r=t.offset,n=t.loadingNewChars,s=t.charsCapReached,i=a?Object(d.jsx)(j,{}):null,o=c?Object(d.jsx)(b,{}):null,l=a||c?null:this.createContent();return Object(d.jsxs)("div",{className:"char__list",children:[i,o,l,Object(d.jsx)("button",{className:"button button__main button__long",onClick:function(){return e.requestCharacters(r)},disabled:n,style:{display:s?"none":"block"},tabIndex:0,children:Object(d.jsx)("div",{className:"inner",children:"load more"})})]})}}]),a}(c.Component)),k=(a(21),function(){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("p",{className:"char__select",children:"Please select a character to see information"}),Object(d.jsxs)("div",{className:"skeleton",children:[Object(d.jsxs)("div",{className:"pulse skeleton__header",children:[Object(d.jsx)("div",{className:"pulse skeleton__circle"}),Object(d.jsx)("div",{className:"pulse skeleton__mini"})]}),Object(d.jsx)("div",{className:"pulse skeleton__block"}),Object(d.jsx)("div",{className:"pulse skeleton__block"}),Object(d.jsx)("div",{className:"pulse skeleton__block"})]})]})}),w=(a(22),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var c=arguments.length,r=new Array(c),n=0;n<c;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).state={char:null,loading:!1,error:!1},e.service=new p,e.onFinishedLoading=function(t){e.setState({loading:!1,char:t})},e.onError=function(){e.setState({error:!0,loading:!1})},e.onLoading=function(){e.setState({loading:!0})},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.createCharacter()}},{key:"componentDidUpdate",value:function(e){this.props.id!==e.id&&this.createCharacter()}},{key:"createCharacter",value:function(){var e=this,t=this.props.id;t&&(this.onLoading(),this.service.getCharacter(t).then((function(t){return e.onFinishedLoading(t)})).catch(this.onError))}},{key:"render",value:function(){var e=this.state,t=e.loading,a=e.char,c=e.error,r=t||a||c?null:Object(d.jsx)(k,{}),n=c?Object(d.jsx)(b,{}):null,s=t?Object(d.jsx)(j,{}):null,i=t||c||!a?null:Object(d.jsx)(S,{char:this.state.char});return Object(d.jsxs)("div",{className:"char__info",children:[r,i,n,s]})}}]),a}(c.Component)),S=function(e){var t=e.char,a=t.name,c=t.description,r=t.thumbnail,n=t.homepage,s=t.wiki,i=t.comics,o={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===r&&(o={objectFit:"contain"}),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("div",{className:"char__basics",children:[Object(d.jsx)("img",{src:r,alt:a,style:o}),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"char__info-name",children:a}),Object(d.jsxs)("div",{className:"char__btns",children:[Object(d.jsx)("a",{href:n,className:"button button__main",children:Object(d.jsx)("div",{className:"inner",children:"homepage"})}),Object(d.jsx)("a",{href:s,className:"button button__secondary",children:Object(d.jsx)("div",{className:"inner",children:"Wiki"})})]})]})]}),Object(d.jsx)("div",{className:"char__descr",children:c}),Object(d.jsx)("div",{className:"char__comics",children:"Comics:"}),Object(d.jsxs)("ul",{className:"char__comics-list",children:[i.length>0?null:"Unfortunately, we can't find the comics for this character",i.map((function(e,t){return t<10?Object(d.jsx)("li",{className:"char__comics-item",children:e.name},t):null}))]})]})},R=w,G=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var c=arguments.length,r=new Array(c),n=0;n<c;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).state={error:!1},e}return Object(o.a)(a,[{key:"componentDidCatch",value:function(e,t){console.log(e,t),this.setState({error:!0})}},{key:"render",value:function(){return this.state.error?Object(d.jsx)(b,{}):this.props.children}}]),a}(c.Component),E=a.p+"static/media/vision.067d4ae1.png",I=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var c=arguments.length,r=new Array(c),n=0;n<c;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).state={charSelectedId:null},e.onSelectChar=function(t){e.setState({charSelectedId:t})},e}return Object(o.a)(a,[{key:"render",value:function(){return Object(d.jsxs)("div",{className:"app",children:[Object(d.jsx)(u,{}),Object(d.jsxs)("main",{children:[Object(d.jsx)(G,{children:Object(d.jsx)(N,{})}),Object(d.jsxs)("div",{className:"char__content",children:[Object(d.jsx)(G,{children:Object(d.jsx)(y,{onSelectChar:this.onSelectChar})}),Object(d.jsx)(G,{children:Object(d.jsx)(R,{id:this.state.charSelectedId})})]}),Object(d.jsx)("img",{className:"bg-decoration",src:E,alt:"vision"})]})]})}}]),a}(c.Component);a(23);s.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(I,{})}),document.getElementById("root"))}],[[24,1,2]]]);
//# sourceMappingURL=main.7c309347.chunk.js.map