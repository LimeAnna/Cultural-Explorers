
let xp = 0;
function responder(correta) {
  if (correta) xp += 50;
  document.getElementById("resultado").innerText = "Você ganhou " + xp + " XP!";
}
