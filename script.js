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
let cards = [];
var collection = [
    { partidas: 0, countCartasViradas: 0, record: 0 },
    { nome:'Panda',  imagem:'0.gif', inGame: false},   
    { nome:'Gorila', imagem:'1.gif', inGame: false },
    { nome:'Cachorro', imagem:'2.gif', inGame: false },
    { nome:'Vaco',   imagem:'3.gif', inGame: false },
    { nome:'Morcego', imagem:'4.gif', inGame: false },
    { nome:'Dragão', imagem:'5.gif', inGame: false },
    { nome:'Polvo', imagem:'6.gif', inGame: false }
]

const engine_selecionado = [];
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
    ConfigureGame();

function ConfigureGame(){
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
}

/**
 * Responsavel por renderizar as cartas no DOM.
 */
function Render(){
    start();
    var dom = document.querySelector( "#container" );
    dom.innerHTML = '';
    
    createCard();
    cards.forEach ( (x, y)=>{
        if(x.nome){
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
                collection[0].countCartasViradas++;
    
                    switch (engine_selecionado[2]) {
                        case 0:
                            engine_selecionado[2] = 1;
                            engine_selecionado[0] = [cards[index].nome, index]
                            break;
                        case 1:
                            engine_selecionado[1] = [cards[index].nome, index]
                            // se as cartas são iguais
                            if ( engine_selecionado[0][0] == engine_selecionado[1][0] ){
                                cards.forEach( (xxx, yyy)=>{
                                    if ( xxx.virado!=undefined && xxx.nome == engine_selecionado[0][0] ){
                                        xxx.virado = true;
                                    }
                                } )
                                engine_selecionado[0] = '';
                                engine_selecionado[1] = '';
                                engine_selecionado[2] = 0;
    
                                let cartasViradas = 0;
                                cards.forEach((c)=>{
                                    if(c.virado!=undefined && c.virado==true){ 
                                        cartasViradas++
                                    }
                                })
                                
                                if( cartasViradas == quantidade_cartas ){
                                    var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
                                    setTimeout( function(){
                                    alert( 'Você ganhou em ' + collection[0].countCartasViradas + ' jogadas! Durou \n' + format );
                                    let final = prompt.toLowerCase;
                                    if (prompt('Deseja reiniciar a partida? (Responda sim ou não)')  === "sim"){
                                        collection[0].partidas++
                                        collection[0].countCartasViradas = 0;
                                        engine_selecionado[0] = '';
                                        engine_selecionado[1] = '';
                                        engine_selecionado[2] = 0;
                                        cards = [];
                                        starting_game = false;
                                        while( !starting_game ){
                                            ConfigureGame()
                                        }
                                        stop();
                                        Render();
                                    }}, 1000);  
                                }
                            } 
                            // se as cartas não são iguais
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
        }
    })
        
}
/**
 * adiciona as cartas na Array.
 */
function createCard(){
    for ( let i=0;  i < quantidade_cartas/2;  i++ ){
        var tamanho= 1;  
        for (var k in collection) {
            if(collection[k].nome!=undefined){
                tamanho++;
            }   
        }
        test(tamanho)
        var x = getRandomInt( 1, tamanho);
        while(collection[x].inGame){
            x = getRandomInt( 1, tamanho);
        }
            collection[x].inGame = true;
            cards.push({ ...collection[x], virado: false })
            cards.push({ ...collection[x], virado: false })
    }
    collection.forEach((c)=>{ c.inGame = false
        if(c.inGame!=undefined){
            c.inGame = false
        }
    });
    cards.sort(comparador);
}

Render();