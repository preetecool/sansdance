let i = 0;
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
