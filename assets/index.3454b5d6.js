var L=Object.defineProperty;var x=(a,e,t)=>e in a?L(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var n=(a,e,t)=>(x(a,typeof e!="symbol"?e+"":e,t),t);const w=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}};w();const o=class{constructor(){n(this,"observers");n(this,"currentPlayer");n(this,"board");n(this,"scores");n(this,"finished");this.observers=[],this.scores=[0,0,0]}isValid(e){return this.board[e]===""?(this.board[e]=this.currentPlayer,!0):!1}isWinner(){const e=Math.pow(o.size,2);let t,r,s;t=0,s=this.board.map(i=>i);for(let i=0;i<e;i++){if(this.board[i]===this.currentPlayer&&(s[i]=`${this.board[i]}!`,t++),t===o.size)return this.board=s,!0;(i+1)%o.size===0&&(t=0,s=this.board.map(c=>c))}t=0,s=this.board.map(i=>i);for(let i=0;i<o.size;i++){let c=0;for(;c<e;){if(this.board[c+i]===this.currentPlayer&&(s[c+i]=`${this.board[c+i]}!`,t++),t===o.size)return this.board=s,!0;c+=o.size}t=0,s=this.board.map(h=>h)}t=0,r=0,s=this.board.map(i=>i);for(let i=0;i<o.size;i++){if(this.board[r+i]===this.currentPlayer&&(s[r+i]=`${this.board[r+i]}!`,t++),t===o.size)return this.board=s,!0;r+=o.size}t=0,r=e-o.size,s=this.board.map(i=>i);for(let i=0;i<o.size;i++){if(this.board[r+i]===this.currentPlayer&&(s[r+i]=`${this.board[r+i]}!`,t++),t===o.size)return this.board=s,!0;r-=o.size}return!1}changePlayer(){this.currentPlayer=this.currentPlayer==="X"?"O":"X"}isTie(){return this.board.every(e=>e!=="")}play(e){this.finished.finished||this.isValid(e)&&(this.isWinner()?(this.currentPlayer==="X"?this.scores[0]++:this.scores[1]++,this.finished={finished:!0,type:"player"}):this.isTie()&&(this.scores[2]++,this.finished={finished:!0,type:"draw"}),this.changePlayer(),this.notify())}reset(){this.scores=[0,0,0],this.initialize()}initialize(){const e=Math.random();this.board=[],this.currentPlayer=e>=.5?"X":"O",this.finished={finished:!1,type:""};const t=Math.pow(o.size,2);for(let r=0;r<t;r++)this.board.push("");this.notify()}getCurrentPlayer(){return this.currentPlayer}getScores(){return this.scores}getFinished(){return this.finished}getBoard(){return this.board}notify(){this.observers.forEach(e=>e.refresh(this))}register(e){this.observers.push(e)}static getTriqui(){return this.triqui}};let l=o;n(l,"size",3),n(l,"triqui"),(()=>{o.triqui=new o})();class f{constructor(){n(this,"panel")}getPanel(){return this.panel}}class z{constructor(){}actionPerformed(e){e.source.processEvent()}}class O{constructor(e){n(this,"e");this.e=e}processEvent(){this.e.preventDefault(),l.getTriqui().reset()}}const v="/assets/x.a59e88e5.svg",T="/assets/o.7e375642.svg",k="/assets/x-grey.f7156358.svg",B="/assets/o-grey.73e5d3fd.svg",S="/assets/restart-icon.f09e91f1.svg";class p{constructor(e){n(this,"button");this.button=document.createElement("div"),this.button.classList.add("button",e.className),this.button.innerText=e.desc,this.button.onclick=e.onClick}getButton(){return this.button}}class y{constructor(e){n(this,"modal");n(this,"actions");n(this,"app");this.app=document.querySelector("#app"),this.modal=document.createElement("div");const t=document.createElement("div");if(t.classList.add("modal-content"),e.player){const r=document.createElement("p");r.innerText=`${e.player} WINS!`,t.append(r);const s=document.createElement("label"),i=document.createElement("img"),c=document.createElement("span");i.src=e.playerImg,c.innerText=e.desc,s.append(i,c),s.classList.add(e.player),t.append(s)}else{const r=document.createElement("label"),s=document.createElement("span");s.innerText=e.desc,r.append(s),t.append(r)}this.actions=document.createElement("div"),this.actions.classList.add("actions"),t.append(this.actions),this.modal.append(t),this.modal.classList.add("modal"),this.app.append(this.modal)}addActions(...e){this.actions.append(...e.map(t=>t.getButton()))}present(){setTimeout(()=>this.modal.classList.add("present"),400)}dismiss(){this.modal.ontransitionend=()=>this.app.removeChild(this.modal),this.modal.classList.remove("present")}}class X{constructor(e){n(this,"e");this.e=e}processEvent(){const{type:e,target:t}=this.e,r=l.getTriqui(),s=t,i=r.getCurrentPlayer();if(e==="mouseenter")s.classList.add(`preview-${i}`);else if(e==="mouseleave")s.classList.remove(`preview-${i}`);else if(e==="click"){const{index:c}=s.dataset;r.play(parseInt(c||"0"));const h=new p({className:"grey",onClick:()=>{console.log("quit")},desc:"QUIT"}),{finished:E,type:P}=r.getFinished();if(E)if(P==="draw"){const d=new y({desc:"DRAW"}),m=new p({className:i==="X"?"green":"yellow",onClick:()=>{r.initialize(),d.dismiss()},desc:"RESTART"});d.addActions(h,m),d.present()}else{const d=new y({player:i==="X"?"P1":"P2",desc:"TAKES THE ROUND",playerImg:i==="X"?v:T}),m=new p({className:i==="X"?"green":"yellow",onClick:()=>{r.initialize(),d.dismiss()},desc:"RESTART"});d.addActions(h,m),d.present()}}}}class R extends f{constructor(){super(...arguments);n(this,"buttonReset");n(this,"imageTurn")}create(){this.panel=document.createElement("div");const t=document.createElement("div");t.innerHTML=`<img src="${v}">`,t.innerHTML+=`<img src="${T}">`,t.classList.add("logo"),this.imageTurn=document.createElement("img");const r=document.createElement("span");r.innerText="TURN";const s=document.createElement("div");s.append(this.imageTurn),s.append(r),s.classList.add("turn"),this.buttonReset=document.createElement("div"),this.buttonReset.innerHTML=`<img src="${S}">`,this.buttonReset.classList.add("btn-reset"),this.panel.append(t,s,this.buttonReset)}initialize(){this.imageTurn.src="",this.panel.classList.add("game-header")}setValues(...t){this.imageTurn.src=t[0]==="X"?k:B}setInvoker(t){this.buttonReset.onclick=r=>{t.actionPerformed({source:new O(r)})}}}class I extends f{constructor(){super(...arguments);n(this,"boxes");n(this,"board")}create(){this.panel=document.createElement("div");const t=Math.pow(l.size,2);this.boxes=[];for(let r=0;r<t;r++){const s=document.createElement("div");s.classList.add("box","blank"),s.setAttribute("data-index",`${r}`),this.boxes.push(s)}}initialize(){this.panel.append(...this.boxes),this.panel.classList.add("game-board")}setValues(...t){this.board=t,this.boxes.forEach((r,s)=>{if(this.board[s]!==""){r.className="";const i=this.board[s].split("");r.classList.add("box","active",i[0]),i[1]&&r.classList.add("match-3")}else this.board[s]===""&&!r.classList.contains("blank")&&(r.className="",r.classList.add("box","blank"))})}setInvoker(t){this.boxes.forEach(r=>{const s=i=>{t.actionPerformed({source:new X(i)})};r.onmouseenter=s,r.onmouseleave=s,r.onclick=s})}}class $ extends f{constructor(){super(...arguments);n(this,"scoreX");n(this,"scoreTies");n(this,"scoreO")}createScorePanel(t,r){const s=document.createElement("div");return s.innerHTML=`<label>${r}</label>`,s.classList.add("game-scores",t),s}create(){this.panel=document.createElement("div");const t=this.createScorePanel("X","X (P1)");this.scoreX=document.createElement("b"),t.append(this.scoreX);const r=this.createScorePanel("ties","TIES");this.scoreTies=document.createElement("b"),r.append(this.scoreTies);const s=this.createScorePanel("O","O (P2)");this.scoreO=document.createElement("b"),s.append(this.scoreO),this.panel.append(t,r,s)}initialize(){this.panel.classList.add("score"),this.scoreX.innerText=this.scoreTies.innerText=this.scoreO.innerText=""}setInvoker(t){}setValues(...t){this.scoreX.innerText=t[0],this.scoreO.innerText=t[1],this.scoreTies.innerText=t[2]}}class M{static getBuilder(e){return e==="header"?new R:e==="board"?new I:new $}}class N{constructor(e){n(this,"builder");this.builder=e}build(){this.builder.create(),this.builder.initialize()}}class b{constructor(e,t){n(this,"component");n(this,"subject");this.component=e,this.subject=t}}class q extends b{refresh(e){e===this.subject&&this.component.setValues(e.getCurrentPlayer())}}class A extends b{refresh(e){e===this.subject&&this.component.setValues(...e.getBoard())}}class H extends b{refresh(e){e===this.subject&&this.component.setValues(...e.getScores().map(t=>`${t}`))}}class V{static getObserver(e,t,r){return e==="header"?new q(t,r):e==="board"?new A(t,r):new H(t,r)}}const g=class{static main(...e){const t=new z,r=l.getTriqui();e.forEach(s=>{const i=M.getBuilder(s);new N(i).build(),i.setInvoker(t);const h=V.getObserver(s,i,r);r.register(h),this.gameScene.append(i.getPanel())}),r.initialize()}};let u=g;n(u,"gameScene"),(()=>{g.gameScene=document.querySelector(".game-scene")})();u.main("header","board","score");
