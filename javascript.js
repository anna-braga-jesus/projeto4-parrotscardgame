let cartas = [];
let contador = 0;
const quantidade = prompt('Quantas cartas você deseja?');

while (contador < quantidade){
cartas.push(prompt('Digite a quantidade de cartas'));
contador = contador +1;
}
 Number( prompt('Com quantas cartas você quer jogar?(De 4 a 14 cartas') );
 console.log(quantidade);
 var Game = {
    cartas: new Array(),
    //codigo
    }
(function(){
    startGame();

	function startGame(){
        for(var i=0;i<quantidade;i++){
            var card = document.querySelector("#card" + i);
            card.style.left = i % 7===0 ? 5 + "px": i % 7 *122 + 5 +"px"; 
            card.style.top = i < 7 ? 5 + "px" : 200 + "px";

            card.addEventListener("click",flipCard,false);
	}
}

function flipCard(){
    var faces = this.getElementsByClassName("face");
    faces[0].classList.toggle("flipped");
    faces[1].classList.toggle("flipped");
}
}());
