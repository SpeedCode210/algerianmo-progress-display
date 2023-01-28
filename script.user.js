// ==UserScript==
// @name        algerianmo.com progress display
// @namespace   Violentmonkey Scripts
// @include     http://www.algerianmo.com/*
// @include     http://algerianmo.com/*
// @downloadURL https://github.com/SpeedCode210/algerianmo-progress/raw/main/script.user.js
// @icon http://www.algerianmo.com/static/images/favicon.ico
// @version     1.2.1
// @author      Raouf Ould Ali / SpeedCode#0050
// @description 1/25/2023, 5:34:04 PM
// ==/UserScript==

if(window.location.href.match(/algerianmo.com\/problems\/(a|nt|g|b|c)\/(?![0-9])/g)){
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

else if(window.location.href.match(/algerianmo.com\/accounts\/[0-9]/g)){
  let t = 0;
  let a = 0;
  let b = 0;
  let c = 0;
  let g = 0;
  let nt = 0;
  let problems = document.getElementsByTagName("a");
  for(let i = 0; i < problems.length; i++){
    let match = problems[i].href.match(/(?<=\/problems\/)(b|a|nt|c|g)(?=\/[0-9]+)/g);
    if(match){
      switch(match[0]){
          case "a":a++;break;
          case "b":b++;break;
          case "c":c++;break;
          case "g":g++;break;
          case "nt":nt++;break;
      }
    }


  }
    problems = document.getElementsByTagName("tr");
    for(let i = 0; i < problems.length; i++){
    if(problems[i].innerHTML.match(/مسألة/g)){
      t++;
    }
    }

  document.getElementsByClassName("row")[0].children[2].innerHTML += `
  <p style="margin-top:10px;background: black;color: white;padding: 5px;border-radius: 5px;">الأساسيات : %${Math.floor(100*b/31)} - الجبر : %${Math.floor(100*a/73)} - التوفيقات : %${Math.floor(100*c/45)} <br> الهندسة : %${Math.floor(100*g/41)} - نظريات الأعداد : %${Math.floor(100*nt/94)} - المجموع : ${t}</p>
  `;
  
  document.getElementsByClassName("row")[0].children[2].innerHTML += `
  <p style="margin-top:10px;background: black;color: white;padding: 5px;border-radius: 5px;">الأساسيات : %${Math.floor(100*b/31)} - الجبر : %${Math.floor(100*a/73)} - التوفيقات : %${Math.floor(100*c/45)} <br> الهندسة : %${Math.floor(100*g/41)} - نظريات الأعداد : %${Math.floor(100*nt/94)} - المجموع : ${t}</p>
  `;

}
