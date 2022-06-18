// funções de utilidade
function test(x){
    return console.log(x);
}
function comparador() { 
    return Math.random() - 0.5; 
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

"use strict" //diretiva que faz com que o browser ignore qualquer erro do javascript

var hh = 0;
var mm = 0;
var ss = 0;

var tempo = 1000; // Quantos milésimos valem 1 segundo?

var cron;

function start(){
    cron = setInterval(() => { timer(); }, tempo);

}

function pause(){
    clearInterval(cron);
}

function stop(){
    clearInterval(cron);
    hh = 0;
    mm = 0;
    ss = 0;

    document.getElementById('counter').innerText = '00:00:00';
}

function timer(){
    ss++;

    if(ss == 60){
        ss = 0;
        mm++;

        if(mm == 60){
            mm = 0;
            hh++;
        }
    }

    
    var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    document.getElementById('counter').innerText = format;
}



/**
 * Recebe as cartas do jogo
 * [ 'nome', img, false=virada ou não ]
 */
var cards = new Array (  );
var collection = {
    0: { nome:'Panda',  imagem:'0.gif', inGame: false},   
    1: { nome:'Gorila', imagem:'1.gif', inGame: false },
    2: { nome:'Cachorro', imagem:'2.gif', inGame: false },
    3: { nome:'Vaco',   imagem:'3.gif', inGame: false },
    4: { nome:'Morcego', imagem:'4.gif', inGame: false },
    5: { nome:'Dragão', imagem:'5.gif', inGame: false },
    6: { nome:'Polvo', imagem:'6.gif', inGame: false }
}

var engine_selecionado = [];
engine_selecionado[0] = '';
engine_selecionado[1] = '';
// caso 2, o jogo testará (this[0] == this[1])
// caso true = as cartas permanecem Viradas
// caso false = as cartas voltam para o estano anterior.
// toda as vezes acontecerá uma verificação para descobrir 
// se todas as cartas foram viradas e assim RESETANDO o jogo. 
engine_selecionado[2] = 0; 


var starting_game = false;
var quantidade_cartas = 0;

// CONFIGURAÇÕES DO JOGO - ESCOLHA QUANTIDADE DE CARTAS.
while( !starting_game ){
    var n_c = Number(prompt( 'Com quantas cartas você deseja jogar? (De 4 a 14 cartas)' ))
    if ( n_c <= 14 && n_c >= 4 ){ 
        if( n_c % 2 === 0 ){
            quantidade_cartas = n_c;
            starting_game = true;
        } else {
            starting_game = false
        }
    }
}


/**
 * Responsavel por renderizar as cartas no DOM.
 */
function Render(){
    createCard()
    var dom = document.querySelector( "#container" );
    cards.forEach ( (x, y)=>{
        const card = document.createElement('div');  
        const card_flip = document.createElement('div');
        const card_front = document.createElement('div');
        const card_back = document.createElement('div');
        const imagem_1 = document.createElement('img');
        const imagem_2 = document.createElement('img');
        card.className = 'card';
        card_flip.className = 'flip'; 
        card_front.className = 'front';
        card_back.className = 'back';

        imagem_1.src = './images/verso.png';
        imagem_2.src = './images/' + x.imagem;
        
        card.dataset.cid = y;
        // ao clicar na carta, a verificação com a array engine_selecionado deverá ocorrer.
        card_flip.onclick = function(){
            var index =  y;
            this.style.transform = 'rotateY(180deg)';

                switch (engine_selecionado[2]) {
                    case 0:
                        engine_selecionado[2] = 1;
                        engine_selecionado[0] = [cards[index].nome, index]
                        test(engine_selecionado[0][0] +" - "+ engine_selecionado[1][0]);
                        break;
                    case 1:
                        test(engine_selecionado[0][0] +' - '+ engine_selecionado[1][0]);
                        engine_selecionado[1] = [cards[index].nome, index]
                        if ( engine_selecionado[0][0] == engine_selecionado[1][0] ){
                            cards.forEach( (xxx, yyy)=>{
                                if ( xxx.nome == engine_selecionado[0][0] ){
                                    xxx.virado = true;
                                }
                            } )
                            engine_selecionado[0] = '';
                            engine_selecionado[1] = '';
                            engine_selecionado[2] = 0;
                        } 
                        else if ( !(engine_selecionado[0][0] == engine_selecionado[1][0]) ) {
                            var todasCards = document.querySelectorAll( '.card' );
                            cards.forEach( (xxx, yyy)=>{
                                if ( xxx.virado === false ){
                                    todasCards.forEach((c)=>{
                                        if( c.dataset.cid == yyy  ){
                                            setTimeout( function(){
                                                c.querySelector('.flip').style.transform = 'rotateY(0deg)';
                                            }, 1000)
                                        }
                                    })
                                } 
                                
                            engine_selecionado[0] = '';
                            engine_selecionado[1] = '';
                            engine_selecionado[2] = 0;
                            } )
                        }
                        break;
                    default:
                        break;
                }
                
        }

        card.appendChild( card_flip );
        card_flip.appendChild( card_back );
        card_flip.appendChild( card_front );
        
        card_front.appendChild( imagem_1 );
        card_back.appendChild( imagem_2 );
        dom.appendChild( card );
    })
        
}
/**
 * adiciona as cartas na Array.
 */
function createCard(){
    for ( let i=0;  i < quantidade_cartas/2;  i++ ){
        var tamanho= 0;  
        for (var k in collection) {
                tamanho++;
        }

        var x = getRandomInt( 0, tamanho );
        while(collection[x].inGame){
            x = getRandomInt( 0, tamanho );
        }
            collection[x].inGame = true;
            cards.push({ ...collection[x], virado: false })
            cards.push({ ...collection[x], virado: false })
    }
    cards.sort(comparador);
}

Render();