let i = 0;
<<<<<<< HEAD
let txt = "Sans... It's not time to dance, you're getting attacked by bats.";
let speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".startscreen").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();
=======
let txt = "Sans... It's not the time to dance, you're being attacked. Help Sans escape 100 bats.";
let speed = 50;
let sansTalk1 = document.getElementById("myAudio")
let batsound = document.getElementById("batsound")
let spaceBarImage = "images/spacebarpng.png";

function typeWriter() {
 
  if (i < txt.length) {
    document.querySelector(".bottombox").innerHTML += txt.charAt(i);
    i++;
  

    setTimeout(typeWriter, speed);
  }
}


sansTalk1.play();

typeWriter();

// function batSound (){

//   if (this.enemies.destroyed){
//   batsound.play();
//   }
// }

// batSound();
>>>>>>> e01101aaac4567c14497d1c3a84df167bd5b0cf2
