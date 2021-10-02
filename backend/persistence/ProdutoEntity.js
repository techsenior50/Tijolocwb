import mongoose from 'mongoose'

const ProdutoSchema = new mongoose.Schema({
                                              categoria: {type: String, required: true},
                                              nome: {type: String, required: true},
                                              descricao: {type: String, required: true},
                                              preco: {type: Number, required: true},
                                              ativo: {type: Boolean, required: true},
                                              imagem: String,
                                          })

const ProdutoEntity = mongoose.model('Produto', ProdutoSchema)

export default ProdutoEntity
