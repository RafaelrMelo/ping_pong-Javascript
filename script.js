//elementos
var vJogador, vCpu, vBola, vpontosJogador, vpontosCpu, vinicia, botaog, botaop, ganhou, perdeu, jog1, jog2, vencedor;
//posições
var posJogadorY, posJogadorX = 10, posCpuY, posCpuX = 930, posBolaY, posBolaX;
//direções
var jogadorY, CpuY, bolaX, bolaY;
//posições iniciais
var posIniBolaX = 475, posIniBolaY = 240, posIniJogadorY = 180, posIniCpuY = posIniJogadorY;
//tamanhos
var campoH = 500, campoW = 960, barraW = 20, barraH = 140, bolaW = 20, bolaH = 20;
//controle
var frames, velCpu, velJog, velBola, pontosJogador = 0, pontosCpu = 0, jogo = false, tecla, jogadores = 1;

function keyDW() {
    tecla = event.keyCode;
    if (tecla == 38) {
        if (jogadores == 2) {
            cpuY = -1;
        }
        else {
            jogadorY = -1;
        }
    }
    else if (tecla == 40) {
        if (jogadores == 2) {
            cpuY = 1;
        }
        else {
            jogadorY = 1;
        }
    }
    else if (tecla == 88) {
        pontosJogador++;
        vpontosJogador.value = pontosJogador;
    }
    else if (tecla == 90) {
        pontosCpu++;
        vpontosCpu.value = pontosCpu;
    }
    else if(tecla==32){
        if(jogadores==1){
            mudaJog("2");
        }
        else if(jogadores==2){
            mudaJog("1");
        }
    }
    else if (tecla == 13) {
        iniciaJogo();
    }
    else if (tecla == 87 && jogadores == 2) {
        jogadorY = -1;
    }
    else if (tecla == 83 && jogadores == 2) {
        jogadorY = 1;
    }
}
function keyUP() {
    tecla = event.keyCode;
    if (tecla == 38) {
        if (jogadores == 2) {
            cpuY = 0;
        }
        else {
            jogadorY = 0;
        }
    }
    else if (tecla == 40) {
        if (jogadores == 2) {
            cpuY = 0;
        }
        else {
            jogadorY = 0;
        }
    }
    else if (tecla == 87 && jogadores == 2) {
        jogadorY = 0;
    }
    else if (tecla == 83 && jogadores == 2) {
        jogadorY = 0;
    }
}
function controlaCpu() {
    if (jogo) {
        if ((posBolaX > (campoW / 2)) && (bolaX > 0)) {
            if (((posBolaY + (bolaW / 2)) > ((posCpuY + (barraW / 2))) + velCpu)) {
                if ((posCpuY + barraH) <= campoH) {
                    posCpuY += velCpu;
                }
            }
            else if ((posBolaY + (bolaW / 2)) < (posCpuY + (barraW / 2)) + velCpu) {
                if (posCpuY >= 0) {
                    posCpuY -= velCpu;
                }
            }
        }
        else {
            if ((posCpuY + (barraH / 2)) > (campoH / 2)) {
                posCpuY -= velCpu;
            }
            else if ((posCpuY + (barraH / 2)) < (campoH / 2)) {
                posCpuY += velCpu;
            }
        }
        vCpu.style.top = posCpuY + "px";
    }
}
function controlaJog() {
    posJogadorY += jogadorY * velJog;
    if (((posJogadorY + barraH) >= 500) || posJogadorY <= 0) {
        posJogadorY += (jogadorY * velJog) * -1;
    }
    vJogador.style.top = posJogadorY + "px";
}
function controlaJog2() {
    posCpuY += cpuY * velCpu;
    if (((posCpuY + barraH) >= 500) || posCpuY <= 0) {
        posCpuY += (cpuY * velCpu) * -1;
    }
    vCpu.style.top = posCpuY + "px";
}
function controlaBola() {
    posBolaY += bolaY * velBola;
    posBolaX += bolaX * velBola;
    if ((posBolaX <= posJogadorX + barraW) && ((posBolaY + bolaH >= posJogadorY) && (posBolaY <= posJogadorY + barraH))) {
        bolaY = (((posBolaY + (bolaW / 2)) - (posJogadorY + (barraW / 2))) / 16);
        bolaX *= -1;
    }
    if ((posBolaX >= posCpuX - barraW) && ((posBolaY + bolaH >= posCpuY) && (posBolaY <= posCpuY + barraH))) {
        bolaY = (((posBolaY + (bolaW / 2)) - (posJogadorY + (barraW / 2))) / 16);
        bolaX *= -1;
    }
    if (posBolaY >= 480 || posBolaY <= 0) {
        bolaY *= -1;
    }
    if (posBolaX <= 0) {
        jogo = false;
        pontosCpu++;
        vpontosCpu.value = pontosCpu;
    }
    else if (posBolaX > (campoW - bolaW)) {
        jogo = false;
        pontosJogador++;
        vpontosJogador.value = pontosJogador;
    }
    vBola.style.left = posBolaX + "px";
    vBola.style.top = posBolaY + "px";

}
function game() {
    if (jogo && jogadores == 1) {
        controlaJog();
        controlaBola();
        controlaCpu();
        verifica();
    }
    else if (jogo && jogadores == 2) {
        controlaJog();
        controlaBola();
        controlaJog2();
        verifica();
    }
    frames = requestAnimationFrame(game);
}
function iniciaJogo() {
    jogo = true;
    if (jogo) {
        cancelAnimationFrame(frames);
        posBolaX = posIniBolaX;
        posBolaY = posIniBolaY;
        bolaY = 0;
        if ((Math.random() * 10) < 5) {
            bolaX = 1;
        }
        else {
            bolaX = -1;
        }
        jogadorY = 0;
        cpuY = 0;
        posJogadorY = posIniJogadorY;
        posCpuY = posIniCpuY;
        game();
    }
}
function verifica() {
    if (pontosJogador > pontosCpu) {
        vpontosJogador.style.border = "2px solid green";
        vpontosCpu.style.border = "none";
    }
    else if (pontosCpu > pontosJogador) {
        vpontosCpu.style.border = "2px solid green";
        vpontosJogador.style.border = "none";
    }
    else {
        vpontosCpu.style.border = "none";
        vpontosJogador.style.border = "none";
    }
    if (pontosJogador >= 10) {
        if (jogadores == 2) {
            jogo = false;
            ganhou.classList.remove("sair");
            vencedor.innerHTML = "Jogador 1 venceu";
        }
        else {
            jogo = false;
            ganhou.classList.remove("sair");
            vencedor.innerHTML = "Você Ganhou";
        }
    }
    else if (pontosCpu >= 10) {
        if (jogadores == 2) {
            jogo = false;
            ganhou.classList.remove("sair");
            vencedor.innerHTML = "Jogador 2 venceu";
        }
        else {
            jogo = false;
            perdeu.classList.remove("sair");
            vencedor.innerHTML = "Você perdeu";
        }
    }
}
function reinicia(modal) {
    pontosJogador = 0;
    pontosCpu = 0;
    vpontosCpu.value = pontosCpu;
    vpontosJogador.value = pontosJogador;
    if (modal == "ganhou") {
        ganhou.setAttribute("class", "sair");
    } else {
        perdeu.setAttribute("class", "sair");
    }
}
function mudaJog(qtd) {
    pontosJogador = 0;
    pontosCpu = 0;
    vpontosCpu.value = pontosCpu;
    vpontosJogador.value = pontosJogador;
    if (qtd == "1") {
        jog1.setAttribute("disabled", true);
        jog2.removeAttribute("disabled");
        jogadores = 1;
    }
    else if (qtd == "2") {
        jog2.setAttribute("disabled", true);
        jog1.removeAttribute("disabled");
        jogadores = 2;
    }
    iniciaJogo();
}
function inicializa() {
    vencedor = document.querySelector("#ganhou div header h1");
    jog1 = document.getElementById("jog1");
    jog1.setAttribute("disabled", true);
    jog1.addEventListener("click", event => {
        mudaJog("1");
    });
    jog2 = document.getElementById("jog2");
    jog2.addEventListener("click", event => {
        mudaJog("2");
    });
    botaog = document.querySelector("#ganhou div .dvbotao button");
    botaop = document.querySelector("#perdeu div .dvbotao button");
    botaog.addEventListener("click", event => {
        reinicia("ganhou");
    });
    botaop.addEventListener("click", event => {
        reinicia("perdeu");
    });
    ganhou = document.getElementById("ganhou");
    perdeu = document.getElementById("perdeu");
    velBola = velCpu = velJog = 8;
    vJogador = document.getElementById("dvbarraesquerda");
    vCpu = document.getElementById("dvbarradireita");
    vBola = document.getElementById("dvbola");
    vpontosJogador = document.getElementById("pontosjogador");
    vpontosCpu = document.getElementById("pontoscpu");
    vinicia = document.getElementById("inicia");
    document.addEventListener("keydown", keyDW);
    document.addEventListener("keyup", keyUP);
    vinicia.addEventListener("click", iniciaJogo);
}
window.addEventListener("load", inicializa);