// O voo: a fachada real em camadas, a câmara entra pelo vidro e o stock já lá estava. Não há corte nenhum.
(function(){
var d=document,root=d.documentElement;
if(root.classList.contains('calma'))return;
try{if(localStorage.getItem('calmo')==='1')return}catch(e){}
var W=7873,H=5249,F={x:3885,y:4025},PANE={h:500,w:1720};
var voo=d.getElementById('voo'),palco=d.getElementById('palco'),tela=d.getElementById('tela'),ctx=tela.getContext('2d',{alpha:true}),poster=d.getElementById('poster'),interior=d.getElementById('interior'),carril=d.getElementById('carril'),luz=d.getElementById('luz'),rumo=d.getElementById('rumo'),entrada=d.getElementById('entrada'),abre=d.getElementById('abre'),pil=d.getElementById('pilula'),barra=d.getElementById('barra');
root.classList.add('voa');
var lay={};function carrega(n,src,box){var i=new Image();i.decoding='async';i.src=src;i.onload=function(){lay[n]={i:i,b:box};pinta()};i.onerror=function(){};}
var todo={x:0,y:0,w:W,h:H},detBox={x:2400,y:3100,w:2800,h:1400};
carrega('fachada','/autogenial-demo/img/h/fachada.webp',todo);carrega('reflexo','/autogenial-demo/img/h/reflexo.webp',todo);
// a frente e o pormenor chegam depois da primeira pintura
var maisTarde=false;function resto(){if(maisTarde)return;maisTarde=true;carrega('frente','/autogenial-demo/img/h/frente.webp',todo);carrega('det','/autogenial-demo/img/h/det.webp',detBox);carrega('detref','/autogenial-demo/img/h/detref.webp',detBox);carrega('detfr','/autogenial-demo/img/h/detfr.webp',detBox)}
addEventListener('load',function(){setTimeout(resto,900)});addEventListener('scroll',resto,{once:true,passive:true});
var vw,vh,dpr,s0,s1,c0,railW,vooPx,railPx,top0,x0=0,percurso=0;
function mede(){vw=palco.clientWidth;vh=palco.clientHeight||innerHeight;dpr=Math.min(devicePixelRatio||1,vw<700?1.75:1.5);tela.width=Math.round(vw*dpr);tela.height=Math.round(vh*dpr);
 s0=Math.max(vw/W,vh/H);s1=Math.max(vh/PANE.h,vw/PANE.w);
 var cy=H-vh/(2*s0),cx=Math.min(W-vw/(2*s0),Math.max(vw/(2*s0),F.x));c0={x:cx,y:cy};
 railW=carril.scrollWidth;var ant=carril.querySelectorAll('.sala-antes'),pri=carril.querySelector('.sala:not(.sala-antes)');x0=pri.offsetLeft+pri.offsetWidth/2-vw/2;percurso=Math.max(0,railW-x0-vw);vooPx=vh*2.4;railPx=percurso*.85;voo.style.height=(vh+vooPx+railPx+vh*.15)+'px';top0=voo.offsetTop;agora=-1;quadro()}
function bola(a,b,t){t=Math.min(1,Math.max(0,(t-a)/(b-a)));return t*t*(3-2*t)}
function emb(t){return t<.5?2*t*t*t*2:1-Math.pow(-2*t+2,3)/2}
function desenha(L,sc,c,al){if(!L)return;var b=L.b,dx=(b.x-c.x)*sc+vw/2,dy=(b.y-c.y)*sc+vh/2,dw=b.w*sc,dh=b.h*sc;if(dx>vw||dy>vh||dx+dw<0||dy+dh<0)return;
 // só a parte que se vê, para o telemóvel não sofrer
 var ix=L.i.naturalWidth/b.w,sx0=Math.max(0,-dx/sc),sy0=Math.max(0,-dy/sc),sx1=Math.min(b.w,(vw-dx)/sc),sy1=Math.min(b.h,(vh-dy)/sc);
 ctx.globalAlpha=al;ctx.drawImage(L.i,sx0*ix,sy0*ix,(sx1-sx0)*ix,(sy1-sy0)*ix,dx+sx0*sc,dy+sy0*sc,(sx1-sx0)*sc,(sy1-sy0)*sc)}
var P=0,agora=-1,posterOff=false;
function pinta(){agora=-1;quadro()}
function quadro(){
 var y=(window.scrollY||0)-top0,p=Math.max(0,Math.min(1,y/vooPx)),q=railPx?Math.max(0,Math.min(1,(y-vooPx)/railPx)):0,chave=p+q*7;
 if(chave===agora)return;agora=chave;
 var e=(p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2)*.72+p*.28,s=s0*Math.pow(s1/s0,e),k=(s0/s)*(1-bola(.15,1,e)),cx=F.x+(c0.x-F.x)*k,cy=F.y+(c0.y-F.y)*k,arco=Math.sin(Math.PI*e),incl=(1-e)*arco*.012;
 cx+=arco*.018*vw/s;var scr={x:vw/2+(F.x-cx)*s,y:vh/2+(F.y-cy)*s};
 if(p<1){
  tela.style.visibility='visible';ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,vw,vh);ctx.translate(vw/2,vh/2);ctx.rotate(incl);ctx.translate(-vw/2,-vh/2);
  var c={x:cx,y:cy},refl=1-bola(.3,.86,p),usaDet=s*W/2880>1.25;
  desenha(lay.reflexo,s,c,refl*.9);if(usaDet)desenha(lay.detref,s,c,refl*.9);
  desenha(lay.fachada,s,c,1);if(usaDet&&lay.det)desenha(lay.det,s,c,1);
  var fs=s*(1+.85*e*e),fk=(s0/fs)*(1-bola(.15,1,e)),fc={x:F.x+(c0.x-F.x)*fk,y:F.y+(c0.y-F.y)*fk};if(arco)fc.x+=arco*.04*vw/fs;
  var alf=1-bola(.74,.98,p);if(alf>0){desenha(lay.frente,fs,fc,alf);if(fs*W/2880>1.25)desenha(lay.detfr,fs,fc,alf)}
  ctx.globalAlpha=1;
 }else tela.style.visibility='hidden';
 if(lay.fachada&&!posterOff){posterOff=true;poster.style.visibility='hidden'}
 var ki=Math.min(1,s/s1);interior.style.transform='translate('+(scr.x-vw/2)+'px,'+(scr.y-vh/2)+'px) scale('+ki+') rotate('+incl+'rad)';
 luz.style.opacity=(.62*(1-bola(.38,.94,p))).toFixed(3);
 carril.style.transform='translate3d('+(-(x0+q*percurso))+'px,0,0)';
 entrada.style.transform='translateY('+(-Math.min(1,p*7)*vh*.36)+'px)';entrada.style.opacity=(1-Math.min(1,p*7)).toFixed(3);
 rumo.style.opacity=p>.03?0:1;var mp=palco.querySelector('.marca-prop');if(mp)mp.style.opacity=p>.03?0:1;
 palco.style.pointerEvents='';tela.style.pointerEvents=p<1?'auto':'none';
 carril.lastElementChild.style.visibility=p>.9?'visible':'hidden';
 P=p;
}
var pedido=false;function agenda(){if(pedido)return;pedido=true;requestAnimationFrame(function(){pedido=false;quadro()})}
addEventListener('scroll',agenda,{passive:true});addEventListener('resize',mede);
// arrastar o carril com o rato anda no scroll
var ar=null;palco.addEventListener('pointerdown',function(ev){if(ev.pointerType==='mouse'&&P>=1)ar={x:ev.clientX,y:scrollY,m:false}});addEventListener('pointermove',function(ev){if(!ar)return;var dx=ar.x-ev.clientX;if(Math.abs(dx)>4)ar.m=true;if(ar.m)scrollTo(0,ar.y+dx*railPx/Math.max(1,percurso))});addEventListener('pointerup',function(){if(ar&&ar.m){var pa=function(e){e.preventDefault();e.stopPropagation();carril.removeEventListener('click',pa,true)};carril.addEventListener('click',pa,true)}ar=null});
// o gesto lateral do trackpad também empurra
palco.addEventListener('wheel',function(ev){if(P>=1&&Math.abs(ev.deltaX)>Math.abs(ev.deltaY)){scrollBy(0,ev.deltaX*.85)}},{passive:true});
carril.addEventListener('focusin',function(ev){var a=ev.target.closest('.sala');if(!a)return;var alvo=top0+vooPx+railPx*Math.min(1,Math.max(0,a.offsetLeft-x0)/Math.max(1,percurso));scrollTo(0,alvo)});
mede();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(mede);
// abertura: a curva do logótipo forma-se no céu e voa para a pílula
function fimAbre(){root.classList.add('titulo');abre.style.display='none';pil.classList.remove('oculta')}
if(scrollY>10){fimAbre();return}
pil.classList.add('oculta');
setTimeout(function(){var a=abre.getBoundingClientRect(),b=pil.querySelector('.pil-logo .logo').getBoundingClientRect();abre.style.transition='transform .85s cubic-bezier(.7,0,.2,1)';abre.style.transform='translate('+(b.left-a.left)+'px,'+(b.top-a.top)+'px) scale('+b.width/a.width+')';abre.style.color='#fff';var feito=false,go=function(){if(feito)return;feito=true;fimAbre()};abre.addEventListener('transitionend',go,{once:true});setTimeout(go,1000);setTimeout(function(){root.classList.add('titulo')},380)},1900);
})();
