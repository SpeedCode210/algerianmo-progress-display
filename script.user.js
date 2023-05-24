// ==UserScript==
// @name        algerianmo.com progress display
// @namespace   Violentmonkey Scripts
// @include     *algerianmo.com/*
// @downloadURL https://github.com/SpeedCode210/algerianmo-progress-display/raw/main/script.user.js
// @icon http://www.algerianmo.com/static/images/favicon.ico
// @version     1.9.1
// @author      Raouf Ould Ali / SpeedCode#0050
// @description 1/25/2023, 5:34:04 PM
// ==/UserScript==

const teamWhiteProblems = [118,119,120,121,122,123,162,163,164,166,170,171,172,173,174,175,176,177,178,179,180,
                           131,132,133,134,135,136,137,138,140,182,183,184,186,187,188,189,190,193,139,141,142,
                           143,144,191,192,194,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,
                           87,88,89,90,101,102,103,104,105,106,107,108,195,91,92,93,94,95,96,99,100,109,110,111,
                           112,113,97,98,114,115,116,117,57,58,59,60,65,66,67,73,74,75,76,61,62,63,64,68,69,77,
                           78,79,80,81,82,83,85,70,71,72,84];

const trainingStartProblems = [3,28,29,30,33,34,43,44,50,51,53,55,86,1,2,32,35,36,37,38,39,40,41,42,46,47,48,52,54,56,49];

document.getElementsByTagName('head')[0].innerHTML += `
<style>
.team{
    display: inline-block;
    width: 40px;
    filter: drop-shadow(0px 0px 5px #fff);
    border-radius: 0!important;
}

</style>
`

let now = new Date();

let mod = window.location.href.match(/(?<=algerianmo.com\/problems\/)(a|nt|g|b|c)(?=\/(?![0-9]))/g);
if(mod){
  let whiteValue = "";
  switch(mod[0]){
      case "a": whiteValue = "47";break;
      case "g": whiteValue = "22";break;
      case "nt": whiteValue = "29";break;
      case "c": whiteValue = "32";break;
  }
  let cards = document.getElementsByClassName("card");
  let title = document.getElementsByTagName("h1")[0];
  let goodOnes = 0;
  let pendingOnes = 0;
  let badOnes = 0;

  for(let i = 0; i < cards.length; i++){
    let header = cards[i].querySelector('.card-header');
    let title = header.getElementsByTagName('a')[0];
    if(teamWhiteProblems.includes(parseInt(title.innerHTML.match(/[0-9]+/g)[0]))){
      title.innerHTML += `<img class="team" src="https://raw.githubusercontent.com/SpeedCode210/algerianmo-progress-display/main/badge-white.png">`;
    } else if(trainingStartProblems.includes(parseInt(title.innerHTML.match(/[0-9]+/g)[0]))){
      title.innerHTML += `<img class="team" src="https://raw.githubusercontent.com/SpeedCode210/algerianmo-progress-display/main/badge-start.png">`;
    } else{
      title.innerHTML += `<img class="team" src="https://raw.githubusercontent.com/SpeedCode210/algerianmo-progress-display/main/badge-green.png">`;
    }
    if((now.getMonth() == (4) - 1 && now.getDate() == (0))){
       if(header.style.backgroundColor == "rgb(7, 38, 15)" || header.style.backgroundColor == "rgb(159, 249, 156)"  || header.style.backgroundColor == "rgb(39, 79, 23)")
      badOnes++;
    if(header.style.backgroundColor == "rgb(96, 63, 1)" || header.style.backgroundColor == "rgb(187, 93, 37)" || header.style.backgroundColor == "rgb(243, 166, 12)" || header.style.backgroundColor == "rgb(255, 228, 105)" || header.style.backgroundColor == "rgb(253, 255, 163)")
      pendingOnes++;
    if(header.style.backgroundColor == "rgb(86, 0, 0)" || header.style.backgroundColor == "rgb(99, 28, 28)" || header.style.backgroundColor == "rgb(237, 150, 158)")
      goodOnes++;
       }
    else{
      if(header.style.backgroundColor == "rgb(7, 38, 15)" || header.style.backgroundColor == "rgb(159, 249, 156)"  || header.style.backgroundColor == "rgb(39, 79, 23)")
      goodOnes++;
    if(header.style.backgroundColor == "rgb(96, 63, 1)" || header.style.backgroundColor == "rgb(187, 93, 37)" || header.style.backgroundColor == "rgb(243, 166, 12)" || header.style.backgroundColor == "rgb(255, 228, 105)" || header.style.backgroundColor == "rgb(253, 255, 163)")
      pendingOnes++;
    if(header.style.backgroundColor == "rgb(86, 0, 0)" || header.style.backgroundColor == "rgb(99, 28, 28)" || header.style.backgroundColor == "rgb(237, 150, 158)")
      badOnes++;
    }

  }
  title.insertAdjacentHTML('beforebegin',`
  <div style="
    margin: 10px;
    background: #2d2f37;
    height: 25px;
    direction: ltr;
    border-radius: 24px;
    box-shadow: 5px 5px 10px #0006;
    position: relative;
    color: white;
"><div style="
    z-index: 50;
    width: 100%;
    background: transparent;
    height: 25px;
    border-radius: 24px;
    padding-right: 5px;
    position: absolute;
">` + cards.length + `</div><div style="
    z-index: 20;
    width: `+((badOnes+pendingOnes+goodOnes)*100/cards.length)+`%;
    background-color: #832929;
    height: 25px;
    border-radius: 24px;
    padding-right: 5px;
    position: absolute;
">`+(goodOnes+pendingOnes+badOnes)+`</div><div style="
    z-index: 30;
    width: `+((pendingOnes+goodOnes)*100/cards.length)+`%;
    background: #14458e;
    height: 25px;
    border-radius: 24px;
    padding-right: 5px;
    position: absolute;
">`+(goodOnes+pendingOnes)+`</div><div style="
    z-index: 40;
    width: `+(goodOnes*100/cards.length)+`%;
    background: #22773a;
    height: 25px;
    border-radius: 24px;
    padding-right: 5px;
    position: absolute;
">`+goodOnes+`</div></div>
  `);

}

else if(window.location.href.match(/algerianmo.com\/accounts\/[0-9]/g)){
  let t = 0;
  let a = 0;
  let b = 0;
  let c = 0;
  let g = 0;
  let nt = 0;
  let t_w = 0;
  let a_w = 0;
  let c_w = 0;
  let g_w = 0;
  let nt_w = 0;
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
      if(teamWhiteProblems.includes(parseInt(problems[i].innerHTML.match(/[0-9]+/g)[0]))){
        switch(match[0]){
          case "a":a_w++;break;
          case "c":c_w++;break;
          case "g":g_w++;break;
          case "nt":nt_w++;break;
      }
      }
    }


  }
    problems = document.getElementsByTagName("tr");
    for(let i = 0; i < problems.length; i++){
    if(problems[i].innerHTML.match(/مسألة/g)){
      t++;
      if(teamWhiteProblems.includes(parseInt(problems[i].innerHTML.match(/[0-9]+/g)[0]))){
        t_w++;
      }
    }
    }

  document.getElementsByClassName("row")[0].children[2].innerHTML += `
  <h6 style='text-align:center!important;'>احصائيات عامة</h3><br>
  <p style="margin-top:10px;background: black;color: white;padding: 5px;border-radius: 5px;">الأساسيات : %${Math.floor(100*b/31)} - الجبر : %${Math.floor(100*a/73)} - التوفيقات : %${Math.floor(100*c/45)} <br> الهندسة : %${Math.floor(100*g/41)} - نظريات الأعداد : %${Math.floor(100*nt/94)} - المجموع : ${t}</p>
  `;

  document.getElementsByClassName("row")[0].children[2].innerHTML += `
  <h6 style='text-align:center!important;'>Team White Instructions</h3><br>
  <p style="margin-top:10px;background: white;color: black;padding: 5px;border-radius: 5px;">الجبر : %${Math.floor(100*a_w/47)} - التوفيقات : %${Math.floor(100*c_w/32)} - الهندسة : %${Math.floor(100*g_w/22)} <br> نظريات الأعداد : %${Math.floor(100*nt_w/29)} - المجموع : ${t_w}/${teamWhiteProblems.length}</p>
  `;


}
