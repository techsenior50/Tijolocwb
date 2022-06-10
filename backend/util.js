// Várias funções e objetos utilitários

// Objeto que faz formatação de valores monetários em Reais Brasileiros
export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

// Objeto que faz formatação de datas no padrão Brasileiro
export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
})

// Função que recebe um valor numérico e retorna o valor formatado: 12345.67 -> "R$ 12.345,67"
export const formatarMoeda = (valor) => currencyFormatter.format(valor)

// Função que recebe uma data/hora e a mesma formatada: new Date() -> "01/02/2021 01:02"
export const formatarData = (data) => dateFormatter.format(data)

// Retorna `true` se a String for nula, vazia ou for composta apenas de espaços
export const emBranco = (str) => (!str || /^\s*$/.test(str))

// Verifica se o parâmetro é um número, ou uma String que pode ser interpretada como um número
export const ehNumero = (num) => (typeof num === 'number') || /^(\d*\.)?\d+$/.test(num)

// Verifica se uma URL é válida. Retirado de https://stackoverflow.com/a/190405/2448366 em 02/10/2021
export const urlValida = (url) => {
    try {
        const validUrl = new URL(url)
        return (validUrl.protocol === 'http:' || validUrl.protocol === 'https:') && validUrl.hostname !== 'localhost'
    } catch (e) {
        return false
    }
}
