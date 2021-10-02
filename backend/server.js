import Server from './server-config.js'

const log = (...m) => console.log('[Servidor]', ...m)
const port = process.env.PORT || 5000

// app.get('/', routes.getAllTodos)
// app.get('/:id', routes.getTodo)
//
// app.post('/', routes.postTodo)
// app.patch('/:id', routes.patchTodo)
//
// app.delete('/', routes.deleteAllTodos)
// app.delete('/:id', routes.deleteTodo)

if (process.env.NODE_ENV !== 'test') {
    log('Iniciando banco de dados...')
    Server.db.connect()
    Server.app.listen(port, () => log(`Servidor iniciado na porta ${port}`))
}
