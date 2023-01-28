// ==UserScript==
// @name        algerianmo.com progress display
// @namespace   Violentmonkey Scripts
// @include     http://www.algerianmo.com/*
// @include     http://algerianmo.com/*
// @downloadURL https://github.com/SpeedCode210/algerianmo-progress-display/raw/main/script.user.js
// @icon http://www.algerianmo.com/static/images/favicon.ico
// @version     1.0
// @author      Raouf Ould Ali / SpeedCode#0050
// @description 1/25/2023, 5:34:04 PM
// ==/UserScript==

if(window.location.href.match(/algerianmo.com\/problems\/(a|nt|g|b|c)\/(?![0-9])/g).length >= 1){
  let cards = document.getElementsByClassName("card");
  let title = document.getElementsByTagName("h1")[0];
  let goodOnes = 0;
  let pendingOnes = 0;
  let badOnes = 0;

  for(let i = 0; i < cards.length; i++){
    let header = cards[i].querySelector('.card-header');
    if(header.style.backgroundColor == "rgb(7, 38, 15)" || header.style.backgroundColor == "rgb(159, 249, 156)")
      goodOnes++;
    if(header.style.backgroundColor == "rgb(96, 63, 1)" || header.style.backgroundColor == "rgb(255, 228, 105)" || header.style.backgroundColor == "rgb(253, 255, 163)")
      pendingOnes++;
    if(header.style.backgroundColor == "rgb(86, 0, 0)" || header.style.backgroundColor == "rgb(237, 150, 158)")
      badOnes++;
  }
  title.innerHTML += " <span class='text-success' id='advancement'>"+goodOnes+"</span>"
    +"<span class='text-secondary' id='advancement'>.</span>"
    +"<span class='text-warning' id='advancement'>"+pendingOnes+"</span>"
    +"<span class='text-secondary' id='advancement'>.</span>"
    +"<span class='text-danger' id='advancement'>"+badOnes+"</span>"
    +"<span class='text-secondary' id='advancement'>/" + cards.length + "</span>";
  console.log(cards.length);

}
