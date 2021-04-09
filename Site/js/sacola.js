document.querySelector('.sacola-abrir').onclick = function() {
    document.documentElement.classList.add('sacola-ativo');
};

document.querySelector('.sacola-fechar').onclick = function() {
    document.documentElement.classList.remove('sacola-ativo');
};

document.documentElement.onclick = function(event) {
    if (event.target === document.documentElement) {
        document.documentElement.classList.remove('sacola-ativo');
    }
};
