const btnMenuMob = document.querySelector ('#btn-menu-mob')
const line1 = document.querySelector('.line-menumob-1')
const line2 = document.querySelector('.line-menumob-2')
const menuMobile = document.querySelector('#menu-mobile')
const body = document.querySelector('body')
const links = document.querySelectorAll("#menu-mobile");

btnMenuMob.addEventListener("click", ()=>{
    line1.classList.toggle('ativo1')
    line2.classList.toggle('ativo2')
    menuMobile.classList.toggle('abrir')
    body.classList.toggle('no-overflow')
})



links.forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("menu-mobile").classList.remove("abrir");
    document.body.classList.remove("no-overflow");
    document.querySelector(".line-menumob-1").classList.remove("ativo1");
    document.querySelector(".line-menumob-2").classList.remove("ativo2");
  });
});



