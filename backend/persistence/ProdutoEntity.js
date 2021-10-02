import mongoose from 'mongoose'

const ProdutoSchema = new mongoose.Schema({
                                              categoriaProduto: {type: String, required: true},
                                              nomeProduto: {type: String, required: true},
                                              descricaoProduto: {type: String, required: true},
                                              precoProduto: {type: Number, required: true},
                                              ativoProduto: {type: Boolean, required: true},
                                              imagemProduto: String,
                                          })

const ProdutoEntity = mongoose.model('Produto', ProdutoSchema)

export default ProdutoEntity
