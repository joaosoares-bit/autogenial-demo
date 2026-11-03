// Vídeos só quando se veem, filas com setas, o vídeo do YouTube só ao clique e a moldura que se abre ao scroll.
(function(){
var d=document,calma=d.documentElement.classList.contains('calma');
if('IntersectionObserver'in window){
 var rv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');rv.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
 d.querySelectorAll('.sobe').forEach(function(x){rv.observe(x)});
 if(!calma){var vs=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;var p=v.play();if(p)p.catch(function(){})}else if(v.src)v.pause()})},{rootMargin:'120px'});
  addEventListener('load',function(){d.querySelectorAll('video[data-src]').forEach(function(v){vs.observe(v)})})}
}else d.querySelectorAll('.sobe').forEach(function(x){x.classList.add('vis')});
d.querySelectorAll('[data-seta]').forEach(function(b){b.addEventListener('click',function(){var f=d.getElementById(b.dataset.seta),c=f.firstElementChild,passo=c.offsetWidth+16,dir=+b.dataset.d,max=f.scrollWidth-f.clientWidth;
 if(dir>0&&f.scrollLeft>=max-4)f.scrollTo({left:0,behavior:'smooth'});else if(dir<0&&f.scrollLeft<=4)f.scrollTo({left:max,behavior:'smooth'});else f.scrollBy({left:dir*passo,behavior:'smooth'})})});
function setas(){d.querySelectorAll('[data-seta]').forEach(function(b){var f=d.getElementById(b.dataset.seta);b.parentElement.hidden=f.scrollWidth<=f.clientWidth+2})}setas();addEventListener('resize',setas);addEventListener('load',setas);
var dlg=d.getElementById('yt-dlg'),cx=d.getElementById('yt-caixa');
function fecha(){if(dlg.open)dlg.close()}
dlg.addEventListener('close',function(){cx.innerHTML=''});d.getElementById('yt-fecha').addEventListener('click',fecha);dlg.addEventListener('click',function(ev){if(ev.target===dlg)fecha()});
d.querySelectorAll('[data-yt]').forEach(function(b){b.addEventListener('click',function(){var i=d.createElement('iframe');i.src='https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1&rel=0';i.title='Vídeo da AutoGenial no YouTube';i.allow='autoplay; encrypted-media; picture-in-picture';i.allowFullscreen=true;cx.innerHTML='';cx.appendChild(i);dlg.showModal()})});
var m=d.getElementById('p-mold');if(m&&!calma){var pedido=false,pinta=function(){pedido=false;var r=m.parentElement.getBoundingClientRect(),vh=innerHeight,k=Math.max(0,Math.min(1,(vh-r.top)/(vh*.85))),e=k*k*(3-2*k);m.style.transform='scale('+(.84+.16*e)+')';m.style.borderRadius=(28*(1-e)).toFixed(1)+'px'};addEventListener('scroll',function(){if(!pedido){pedido=true;requestAnimationFrame(pinta)}},{passive:true});pinta()}
})();
