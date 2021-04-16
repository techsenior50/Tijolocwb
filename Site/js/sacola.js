/*var botao_sacola = document.getElementById('btn_sacola');
alert(botao_sacola.getAttribute('class'));*/
/*
botao_sacola.onclick = function() {
    document.documentElement.frameSacola.setAttribute('display', block);
};
*/
var frameSacola = document.getElementById('frameSacola');

document.getElementById('btn_sacola').onclick = function() {
    frameSacola.classList.remove('frameSacola-invisivel');
    frameSacola.classList.add('frameSacola-visivel');
};


/*
document.querySelector('.sacola-fechar').onclick = function() {
    document.documentElement.classList.remove('sacola-ativo');
};
*/

document.documentElement.onclick = function(event) {
    if (event.target === document.documentElement) {
        document.documentElement.classList.remove('frameSacola-visivel');
        frameSacola.classList.add('frameSacola-invisivel');
    }
};
