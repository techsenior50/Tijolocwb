class Log {
    #prefixo = ''
    #doisDigitos = (numero = 0) => numero < 10 ? `0${numero}` : numero.toString()
    #dataHora = (dataHora = new Date()) => `${dataHora.getFullYear()}-${this.#doisDigitos(
        dataHora.getMonth() + 1)}-${this.#doisDigitos(dataHora.getDate())} ${this.#doisDigitos(
        dataHora.getHours())}:${this.#doisDigitos(dataHora.getMinutes())}:${this.#doisDigitos(dataHora.getSeconds())}`

    #infoTag = '\x1b[34m[INFO]\x1b[0m'
    #errorTag = '\x1b[31m[ERROR]\x1b[0m'
    #warnTag = '\x1b[33m[WARN]\x1b[0m'
    #debugTag = '\x1b[35m[DEBUG]\x1b[0m'

    constructor(prefixo = '') {
        this.#prefixo = prefixo
    }

    info(...m) {
        console.info(this.#dataHora(), this.#infoTag, this.#prefixo, '-', ...m)
    }

    error(...m) {
        console.error(this.#dataHora(), this.#errorTag, this.#prefixo, '-', ...m)
    }

    warn(...m) {
        console.warn(this.#dataHora(), this.#warnTag, this.#prefixo, '-', ...m)
    }

    debug(...m) {
        console.debug(this.#dataHora(), this.#debugTag, this.#prefixo, '-', ...m)
    }
}

export default Log
