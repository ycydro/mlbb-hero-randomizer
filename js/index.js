let heroesData;
let intervalId;

document.getElementById("load-hero-button").addEventListener("click", function() {
      this.disabled = true;
      this.innerHTML = 'Rolling...'
      if (!heroesData) {
         loadHeroData();
      } else {
         roll(heroesData);
      }
   });

async function loadHeroData() {
  try {
    const response = await fetch('./mobile-legends-heroes.json');
    heroesData = await response.json();  // saves the JSON data to heroesData

    // roll random heroes per 50 milliseconds
   roll(heroesData);

   } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

function roll(data) {
   intervalId = setInterval(function() {
      useHeroData(data);
   }, 35);

    // stop rolling after 1 second
    setTimeout(function() {
      document.getElementById("load-hero-button").disabled = false;
      stopRolling();
     }, 1000)
}


function stopRolling() {
   if (!intervalId) {
      return;
   }

   document.getElementById("load-hero-button").innerHTML = `Roll`
   clearInterval(intervalId);
}

function useHeroData(data) {

   // reverse the order so that the index matches the heroID (or close)
   const heroesAscendingOrder = data.heroes.slice().reverse(); 

   const randomHero = heroesAscendingOrder[getRandomInt(0, heroesAscendingOrder.length - 1)]

   console.log(randomHero);
   render(randomHero);
}

function render(hero) {
   const container = document.querySelector(`.generate-container`);
   const { name, key } = hero; 

   let containerHTML = ``;

   containerHTML += 
   `
      <div class="hero-container flex">
      <img class="hero-image" src=${key}"" alt="">
      <p class="hero-name">${name}</p>
      </div>
   `
   container.innerHTML = containerHTML;
}

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
