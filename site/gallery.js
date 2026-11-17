'use strict';
const photos = [...document.querySelectorAll('.shot')].map(figure => ({src:figure.querySelector('img').getAttribute('src').replace('-thumb.webp','.webp'),title:figure.querySelector('figcaption span').textContent}));
const viewer=document.getElementById('viewer'), full=document.getElementById('full');
let current=0, opener;
function show(index){current=(index+photos.length)%photos.length;full.src=photos[current].src;full.alt=photos[current].title;document.getElementById('caption').textContent=photos[current].title;document.getElementById('counter').textContent=`${String(current+1).padStart(2,'0')} / ${photos.length}`;}
document.querySelectorAll('[data-index]').forEach(button=>button.addEventListener('click',()=>{opener=button;show(Number(button.dataset.index));viewer.showModal();document.body.classList.add('viewing');document.getElementById('close').focus();}));
document.getElementById('close').addEventListener('click',()=>viewer.close());
document.getElementById('prev').addEventListener('click',()=>show(current-1));
document.getElementById('next').addEventListener('click',()=>show(current+1));
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}});
viewer.addEventListener('close',()=>{document.body.classList.remove('viewing');opener?.focus();});
let touchStart;
full.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX;},{passive:true});
full.addEventListener('touchend',event=>{if(touchStart===undefined)return;const dx=event.changedTouches[0].clientX-touchStart;if(Math.abs(dx)>60)show(current+(dx<0?1:-1));touchStart=undefined;},{passive:true});
