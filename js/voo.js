// O voo: a fachada real em camadas, a câmara entra pelo vidro e o stock já lá estava. Não há corte nenhum.
(function(){
var d=document,root=d.documentElement;
if(root.classList.contains('calma'))return;
try{if(localStorage.getItem('calmo')==='1')return}catch(e){}
var TOPO_LETREIRO=2860,W=7873,H=5249,F={x:3893,y:4135},PANE={h:874,w:1760};
var voo=d.getElementById('voo'),palco=d.getElementById('palco'),tela=d.getElementById('tela'),ctx=tela.getContext('2d',{alpha:true}),poster=d.getElementById('poster'),interior=d.getElementById('interior'),carril=d.getElementById('carril'),luz=d.getElementById('luz'),rumo=d.getElementById('rumo'),entrada=d.getElementById('entrada'),abre=d.getElementById('abre'),pil=d.getElementById('pilula'),barra=d.getElementById('barra');
root.classList.add('voa');
var lay={};
// descodifica fora do fio principal: a primeira pintura de cada camada nunca trava o scroll
// a fachada e o vidro entram juntos por cima do poster, que é a mesma fotografia: nunca se vê a montagem a meio
var revelada=false;function revela(){if(revelada||!lay.fachada||!lay.reflexo)return;revelada=true;agora=-1;quadro();tela.style.opacity=1;setTimeout(function(){interior.style.visibility='visible';poster.style.visibility='hidden'},520)}
function pronta(n,im,box,w){lay[n]={i:im,b:box,w:w,t:n.indexOf('det')===0?performance.now():0};revela();corre()}
function porImagem(n,src,box){var i=new Image();i.decoding='async';i.src=src;(i.decode?i.decode():Promise.resolve()).catch(function(){}).then(function(){if(i.naturalWidth)pronta(n,i,box,i.naturalWidth);else i.onload=function(){pronta(n,i,box,i.naturalWidth)}})}
function carrega(n,src,box){if(!window.createImageBitmap||!window.fetch)return porImagem(n,src,box);fetch(src,{priority:'low'}).then(function(r){return r.blob()}).then(createImageBitmap).then(function(b){pronta(n,b,box,b.width)}).catch(function(){porImagem(n,src,box)})}
var todo={x:0,y:0,w:W,h:H},detBox={x:2400,y:3100,w:2800,h:1600};
// a frente e o pormenor chegam depois da primeira pintura
var maisTarde=false;function resto(){if(maisTarde)return;maisTarde=true;carrega('fachada','/autogenial-demo/img/h/fachada.webp',todo);carrega('reflexo','/autogenial-demo/img/h/reflexo.webp',todo);carrega('det','/autogenial-demo/img/h/det.webp',detBox);carrega('detref','/autogenial-demo/img/h/detref.webp',detBox)}
addEventListener('load',function(){setTimeout(resto,1300)});addEventListener('scroll',resto,{once:true,passive:true});
var vw,vh,dpr,s0,s1,c0,railW,vooPx,railPx,top0,x0=0,percurso=0,medidoW=0,medidoH=0,fimLogo=0;
function mede(){
 // a barra do browser a esconder-se no telemóvel não muda o palco: não se refaz nada
 if(palco.clientWidth===medidoW&&palco.clientHeight===medidoH&&carril.scrollWidth===railW)return;medidoW=palco.clientWidth;medidoH=palco.clientHeight;
 vw=palco.clientWidth;vh=palco.clientHeight||innerHeight;dpr=Math.min(devicePixelRatio||1,vw<700?1.75:1.5);tela.width=Math.round(vw*dpr);tela.height=Math.round(vh*dpr);
 s0=Math.max(vw/W,vh/H);s1=Math.max(vh/PANE.h,vw/PANE.w);
 var cx=Math.min(W-vw/(2*s0),Math.max(vw/(2*s0),F.x)),ti=d.getElementById('titulo'),fl=abre.parentNode===entrada?(fimLogo=abre.offsetTop+abre.offsetHeight):fimLogo,fimT=Math.max(ti.offsetTop+ti.offsetHeight,fl),cy=H-vh/(2*s0);
 // o letreiro fica sempre abaixo do título: em ecrãs largos a câmara mostra mais céu
 cy=Math.max(vh/(2*s0),Math.min(cy,TOPO_LETREIRO-(fimT+20-vh/2)/s0));c0={x:cx,y:cy};
 var fx=W-vw/s0,fy=H-vh/s0;poster.style.objectPosition=(fx>1?(cx-vw/(2*s0))/fx*100:50)+'% '+(fy>1?(cy-vh/(2*s0))/fy*100:50)+'%';
 railW=carril.scrollWidth;var ant=carril.querySelectorAll('.sala-antes'),pri=carril.querySelector('.sala:not(.sala-antes)');x0=pri.offsetLeft+pri.offsetWidth/2-vw/2;percurso=Math.max(0,railW-x0-vw);vooPx=vh*2.9;railPx=percurso*.85;voo.style.height=(vh+vooPx+railPx+vh*.15)+'px';top0=voo.offsetTop;yv=alvoY();agora=-1;quadro()}
function bola(a,b,t){t=Math.min(1,Math.max(0,(t-a)/(b-a)));return t*t*(3-2*t)}
// a aproximação: arranca e pousa com velocidade zero, sem correria a meio, e a travagem é mais longa do que o arranque
function curva(p){var u=Math.pow(p,.85);return u*u*(3-2*u)}
// o carril arranca de velocidade zero, não de repente
var RAMPA=.12;function anda(q){return q<RAMPA?q*q/(2*RAMPA)/(1-RAMPA/2):(q-RAMPA/2)/(1-RAMPA/2)}
function andaInv(v){var c=RAMPA/(2-RAMPA);return v<c?Math.sqrt(v*2*RAMPA*(1-RAMPA/2)):v*(1-RAMPA/2)+RAMPA/2}
function desenha(L,sc,c,al){if(!L||al<=0)return;if(L.t){var f=(ag-L.t)/380;if(f<1){al*=Math.max(0,f);aFundir=true}else L.t=0}var b=L.b,dx=(b.x-c.x)*sc+vw/2,dy=(b.y-c.y)*sc+vh/2,dw=b.w*sc,dh=b.h*sc;if(dx>vw||dy>vh||dx+dw<0||dy+dh<0)return;
 // só a parte que se vê, para o telemóvel não sofrer
 var ix=L.w/b.w,sx0=Math.max(0,-dx/sc),sy0=Math.max(0,-dy/sc),sx1=Math.min(b.w,(vw-dx)/sc),sy1=Math.min(b.h,(vh-dy)/sc);
 ctx.globalAlpha=al;ctx.drawImage(L.i,sx0*ix,sy0*ix,(sx1-sx0)*ix,(sy1-sy0)*ix,dx+sx0*sc,dy+sy0*sc,(sx1-sx0)*sc,(sy1-sy0)*sc)}
var P=0,agora=-1,yv=0,aFundir=false,ag=0,antesT=0,aCorrer=false,perto=null,TAU=matchMedia('(pointer:coarse)').matches?75:125;
function alvoY(){return (window.scrollY||0)-top0}
// o scroll continua nativo; só a câmara o segue com inércia, para um toque seco da roda não dar um salto
function ciclo(t){
 var dt=Math.min(64,t-antesT||16);antesT=t;
 var total=vooPx+railPx,alvo=Math.max(-1,Math.min(total+1,alvoY())),dif=alvo-yv;
 yv=Math.abs(dif)<.15?alvo:yv+dif*(1-Math.exp(-dt/TAU));
 if(aFundir)agora=-1;
 quadro();
 if(yv!==alvo||aFundir)requestAnimationFrame(ciclo);else aCorrer=false;
}
function corre(){agora=-1;if(aCorrer)return;aCorrer=true;antesT=performance.now();requestAnimationFrame(ciclo)}
function quadro(){
 var y=yv,p=Math.max(0,Math.min(1,y/vooPx)),q=railPx?Math.max(0,Math.min(1,(y-vooPx)/railPx)):0,chave=p+q*7;
 if(chave===agora)return;agora=chave;ag=performance.now();aFundir=false;
 // voo a direito para o centro do vidro: sem desvio de lado nem inclinação
 var e=curva(p),s=s0*Math.pow(s1/s0,e),k=(s0/s)*(1-bola(0,.8,e)),cx=F.x+(c0.x-F.x)*k,cy=F.y+(c0.y-F.y)*k;
 var scr={x:vw/2+(F.x-cx)*s,y:vh/2+(F.y-cy)*s};
 if(p<1){
  tela.style.visibility='visible';ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,vw,vh);
  // uma fotografia só, com um zoom só: o vidro apaga-se e a sala já lá estava; a moldura sai no fim, à beira do ecrã
  var c={x:cx,y:cy},refl=1-bola(.2,.9,e),det=bola(1.25,1.7,s*W/3600),fa=1-bola(.93,1,e);
  desenha(lay.reflexo,s,c,refl);desenha(lay.detref,s,c,refl*det);
  desenha(lay.fachada,s,c,fa);desenha(lay.det,s,c,fa*det);
  ctx.globalAlpha=1;
 }else tela.style.visibility='hidden';
 var ki=Math.min(1,s/s1);interior.style.transform='translate('+(scr.x-vw/2)+'px,'+(scr.y-vh/2)+'px) scale('+ki+')';
 luz.style.opacity=(.62*(1-bola(.26,.99,e))).toFixed(3);
 carril.style.transform='translate3d('+(-(x0+anda(q)*percurso))+'px,0,0)';
 entrada.style.transform='translateY('+(-Math.min(1,p*7)*vh*.36)+'px)';entrada.style.opacity=(1-Math.min(1,p*7)).toFixed(3);
 rumo.style.opacity=p>.03?0:1;var mp=palco.querySelector('.marca-prop');if(mp)mp.style.opacity=p>.03?0:1;
 tela.style.pointerEvents=p<1?'auto':'none';
 var pp=p>.9;if(pp!==perto){perto=pp;carril.lastElementChild.style.visibility=pp?'visible':'hidden';carril.classList.toggle('perto',pp)}
 P=p;
}
addEventListener('scroll',corre,{passive:true});addEventListener('resize',mede);
// arrastar o carril com o rato anda no scroll
var ar=null;palco.addEventListener('pointerdown',function(ev){if(ev.pointerType==='mouse'&&P>=1)ar={x:ev.clientX,y:scrollY,m:false}});addEventListener('pointermove',function(ev){if(!ar)return;var dx=ar.x-ev.clientX;if(Math.abs(dx)>4)ar.m=true;if(ar.m)scrollTo(0,ar.y+dx*railPx/Math.max(1,percurso))});addEventListener('pointerup',function(){if(ar&&ar.m){var pa=function(e){e.preventDefault();e.stopPropagation();carril.removeEventListener('click',pa,true)};carril.addEventListener('click',pa,true)}ar=null});
// o gesto lateral do trackpad também empurra
palco.addEventListener('wheel',function(ev){if(P>=1&&Math.abs(ev.deltaX)>Math.abs(ev.deltaY)){scrollBy(0,ev.deltaX*.85)}},{passive:true});
carril.addEventListener('focusin',function(ev){var a=ev.target.closest('.sala');if(!a)return;var alvo=top0+vooPx+railPx*andaInv(Math.min(1,Math.max(0,a.offsetLeft-x0)/Math.max(1,percurso)));scrollTo(0,alvo)});
mede();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){medidoW=0;mede()});
// abertura: a curva do logótipo forma-se no céu e voa para a pílula
function fimAbre(){root.classList.add('titulo');abre.style.display='none';d.getElementById('noite').style.display=d.getElementById('rasto').style.display='none';pil.classList.remove('oculta')}
if(scrollY>10){fimAbre();return}
pil.classList.add('oculta');
// o logótipo sai para o corpo da página para voar por cima da pílula (por baixo dela apagava-se e reaparecia de repente); a cor muda num fundido de duas camadas, sem pintar nada durante o voo
setTimeout(function(){var a=abre.getBoundingClientRect(),b=pil.querySelector('.pil-logo .logo').getBoundingClientRect(),br=abre.firstElementChild.cloneNode(true);abre.classList.add('a-voar');abre.style.cssText='position:fixed;left:'+a.left+'px;top:'+a.top+'px;width:'+a.width+'px;translate:none;margin:0;z-index:60;pointer-events:none';br.classList.add('abre-br');abre.appendChild(br);d.body.appendChild(abre);var feito=false,go=function(){if(feito)return;feito=true;fimAbre()};requestAnimationFrame(function(){requestAnimationFrame(function(){abre.style.transition='transform .6s cubic-bezier(.7,0,.2,1)';abre.style.transform='translate('+(b.left-a.left)+'px,'+(b.top-a.top)+'px) scale('+b.width/a.width+')';br.style.opacity=1;abre.addEventListener('transitionend',go,{once:true});setTimeout(go,800)})})},1850);
})();
