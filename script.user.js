// ==UserScript==
// @name        algerianmo.com progress display
// @namespace   Violentmonkey Scripts
// @include     *algerianmo.com/*
// @downloadURL https://github.com/SpeedCode210/algerianmo-progress-display/raw/main/script.user.js
// @icon http://www.algerianmo.com/static/images/favicon.ico
// @version     2.1
// @author      Raouf Ould Ali / SpeedCode#0050
// @description 1/25/2023, 5:34:04 PM
// ==/UserScript==

const problems = {
  'blue': [3, 28, 29, 30, 33, 34, 43, 44, 50, 51, 53, 55, 86, 1, 2, 32, 35, 36, 37, 38, 39, 40, 41, 42, 46, 47, 48, 52, 54, 56, 49],
  'white': [127, 129, 141, 142, 143, 144, 126,128,130,139,191,298,118, 119, 120, 121, 122, 123, 162, 163, 164, 166,26, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 131, 132, 133, 134, 135, 136, 137, 138, 140, 182, 183, 184, 186, 187, 188, 189, 190, 5, 6, 7, 10, 11, 14, 15, 18, 8, 9, 84, 12, 13, 16, 17, 20, 21, 22, 24, 25, 87, 88, 89, 90, 101, 102, 103, 104, 105, 106, 107, 108, 195, 109, 110, 111, 112, 113, 57, 58, 59, 60, 65, 66, 67, 73, 74, 75, 76, 61, 62, 63, 64, 68, 69, 77, 78, 79, 80, 81, 82, 83, 85],
  'yellow': [267, 269, 270, 271, 268, 193, 124, 194, 192,245, 161, 198, 199, 200, 202, 203, 204, 205, 201, 206, 208, 209, 210, 19, 23, 211, 212, 213, 214, 215, 216, 283, 284, 285, 287, 91, 92, 93, 94, 95, 96, 99, 100, 288, 289, 290, 97, 98, 114, 115, 116, 117, 291, 293, 294, 295, 145, 146, 147, 148, 149, 150, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 235, 236, 237, 238, 239, 240, 241, 246, 247, 248, 249, 272, 273, 274, 275, 151, 152, 153, 154, 155, 226, 228, 229, 230, 242, 244, 276, 277, 278, 279, 70, 71, 72, 156, 157, 158, 160, 231, 232, 233, 234, 243, 250, 251, 252, 253, 280, 281, 282],
  'green': [254,255,257,258,259,260,261,262,263,264,265,266,185,125,286,292,207],
  'red': [296, 297]
};
const pbNumbers = {
  'white': {'a':39, 'g':19,'c':18,'nt':25},
  'yellow': {'a':14, 'g':22,'c':25,'nt':66},
  'green':{'a':19, 'g':0.1, 'c':2, 'nt':2},
  'red': {'a':1, 'g':0.1,'c':0.1,'nt':1}
};


document.getElementsByTagName('head')[0].innerHTML += `
<style>
.team{
    display: inline-block;
    width: 40px;
    filter: drop-shadow(0px 0px 5px #fff);
    border-radius: 0!important;
}
</style>
`;

let mod = window.location.href.match(/(?<=algerianmo.com\/problems\/)(a|nt|g|b|c)(?=\/(?![0-9]))/g);
//If it's a problems page
if (mod) {
  let cards = document.getElementsByClassName("card");
  let title = document.getElementsByTagName("h1")[0];

  let moduleProgress = { 'blue': { 'correct': 0, 'pending': 0, 'bad': 0, 'total': 0 }, 'white': { 'correct': 0, 'pending': 0, 'bad': 0, 'total': 0 }, 'yellow': { 'correct': 0, 'pending': 0, 'bad': 0, 'total': 0 }, 'green': { 'correct': 0, 'pending': 0, 'bad': 0, 'total': 0 }, 'red': { 'correct': 0, 'pending': 0, 'bad': 0, 'total': 0 } };

  for (let i = 0; i < cards.length; i++) {
    let header = cards[i].querySelector('.card-header');
    let title = header.getElementsByTagName('a')[0];
    let problemNumber = parseInt(title.innerHTML.match(/[0-9]+/g)[0]);

    //Getting status of the problem
    let status = "unknown";
    if (header.style.backgroundColor == "rgb(7, 38, 15)" || header.style.backgroundColor == "rgb(159, 249, 156)" || header.style.backgroundColor == "rgb(39, 79, 23)")
      status = "correct";
    if (header.style.backgroundColor == "rgb(96, 63, 1)" || header.style.backgroundColor == "rgb(187, 93, 37)" || header.style.backgroundColor == "rgb(243, 166, 12)" || header.style.backgroundColor == "rgb(255, 228, 105)" || header.style.backgroundColor == "rgb(253, 255, 163)")
      status = "pending";
    if (header.style.backgroundColor == "rgb(86, 0, 0)" || header.style.backgroundColor == "rgb(99, 28, 28)" || header.style.backgroundColor == "rgb(237, 150, 158)")
      status = "bad";

    let team = 'green';
    for (let key in problems) {
      if (problems[key].includes(problemNumber))
        team = key;
    }

    moduleProgress[team][status]++;
    moduleProgress[team]['total']++;

    title.innerHTML += `<img class="team" src="https://raw.githubusercontent.com/SpeedCode210/algerianmo-progress-display/main/badge-${team}.png">`;
  }

  for (team in moduleProgress) {
    if (moduleProgress[team]['correct'] + moduleProgress[team]['pending'] + moduleProgress[team]['bad'] == 0)
      continue;

    title.insertAdjacentHTML('beforebegin', `
    <h5 style="text-align:center;">Team ${team} progress</h5>
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
  ">` + moduleProgress[team]['total'] + `</div><div style="
      z-index: 20;
      width: `+ ((moduleProgress[team]['correct'] + moduleProgress[team]['pending'] + moduleProgress[team]['bad']) * 100 / moduleProgress[team]['total']) + `%;
      background-color: #832929;
      height: 25px;
      border-radius: 24px;
      padding-right: 5px;
      position: absolute;
  ">`+ (moduleProgress[team]['correct'] + moduleProgress[team]['pending'] + moduleProgress[team]['bad']) + `</div><div style="
      z-index: 30;
      width: `+ ((moduleProgress[team]['correct'] + moduleProgress[team]['pending']) * 100 / moduleProgress[team]['total']) + `%;
      background: #14458e;
      height: 25px;
      border-radius: 24px;
      padding-right: 5px;
      position: absolute;
  ">`+ (moduleProgress[team]['correct'] + moduleProgress[team]['pending']) + `</div><div style="
      z-index: 40;
      width: `+ ((moduleProgress[team]['correct']) * 100 / moduleProgress[team]['total']) + `%;
      background: #22773a;
      height: 25px;
      border-radius: 24px;
      padding-right: 5px;
      position: absolute;
  ">`+ (moduleProgress[team]['correct']) + `</div></div>
    `);
  }
}


//Profile infomation page
else if (window.location.href.match(/algerianmo.com\/accounts\/[0-9]/g)) {
  let basics = 0;
  let teamsInstructions = { 'blue': { 'total': 0 },'white': { 'a': 0, 'nt': 0, 'g': 0, 'c': 0, 'total': 0 }, 'yellow': { 'a': 0, 'nt': 0, 'g': 0, 'c': 0, 'total': 0 }, 'green': { 'a': 0, 'nt': 0, 'g': 0, 'c': 0, 'total': 0 }, red: { 'a': 0, 'nt': 0, 'g': 0, 'c': 0, 'total': 0 } }
  let pbs = document.getElementsByTagName("a");
  for (let i = 0; i < pbs.length; i++) {
    let match = pbs[i].href.match(/(?<=\/problems\/)(b|a|nt|c|g)(?=\/[0-9]+)/g);
    if(!match) continue;
    let pbNumber = parseInt(pbs[i].innerHTML.match(/[0-9]+/g)[0]);
    if (match[0] == 'b')
      basics++;
    else {
      let team = 'green';
      for (let key in problems) {
        if (problems[key].includes(pbNumber))
          team = key;
      }
      teamsInstructions[team][match[0]]++;
    }
  }
  //Getting non-unlocked problems
  pbs = document.getElementsByTagName("tr");
  for (let i = 0; i < pbs.length; i++) {
    let pbNumber = parseInt(pbs[i].innerHTML.match(/[0-9]+/g)[0]);
    if (pbs[i].innerHTML.match(/مسألة/g)) {
      let team = 'green';
      for (let key in problems) {
        if (problems[key].includes(pbNumber))
          team = key;
      }
      teamsInstructions[team]['total']++;
    }
  }

  for(x in pbNumbers){
    for(y in pbNumbers[x]){
      if(pbNumbers[x][y]==0.1)
        teamsInstructions[x][y] = 0.1;
    }
  }

  document.getElementsByClassName("row")[0].children[2].innerHTML += `
  <h6 style='text-align:center!important;margin-bottom:2px;'>Team blue Instructions</h3>
  <p style="text-align:center!important;margin-top:15px;background: #2b60b5;color: white;padding: 5px;border-radius: 15px;">الأساسيات : %${Math.floor(100 * basics / problems['blue'].length)}</p>
  `;

  for(team in teamsInstructions){
    if(team == 'blue') continue;
    let text = `
  <h6 style='text-align:center!important;margin-bottom:2px;'>Team ${team} Instructions</h3>
  <p style="text-align:center!important;margin-top:15px;background: ${team};color: ${team=="red"?"white":"black"};padding: 5px;border-radius: 15px;">الجبر : %${Math.floor(100 * (teamsInstructions[team]['a']) / (pbNumbers[team]['a']))} - التوفيقات : %${Math.floor(100 * (teamsInstructions[team]['c']) / (pbNumbers[team]['c']))} - الهندسة : %${Math.floor(100 * (teamsInstructions[team]['g']) / (pbNumbers[team]['g']))} <br> نظريات الأعداد : %${Math.floor(100 * (teamsInstructions[team]['nt']) / (pbNumbers[team]['nt']))}  - المجموع : ${teamsInstructions[team]['total']}/${problems[team].length}</p>
  `;
    document.getElementsByClassName("row")[0].children[2].innerHTML += text;

  }
}
