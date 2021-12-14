import mongoose from 'mongoose'

const ClienteSchema = new mongoose.Schema({
                                              nome: {type: String, required: true},
                                              sobrenome: {type: String},
                                              email: {type: String, required: true},
                                              dataNascimento: {type: Date},
                                              telefone: {type: String},
                                          })

const ClienteEntity = mongoose.model('Cliente', ClienteSchema)

export default ClienteEntity
