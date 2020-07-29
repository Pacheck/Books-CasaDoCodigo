class LivroDao{

    constructor(db){
        this._db = db;
    }

    lista(){

        return new Promise((resolve, reject) => {

            this._db.all(

                'SELECT * FROM livros',
                (erro, resultados) =>{
                   if(erro) return reject('Não foi possível listar os livros!');

                   return resolve(resultados);
                }
            )

        })

       
    }

    adiciona(livro){
        return new Promise((resolve, reject) => {
            // o método RUN do DB recebe 3 parametros
            this._db.run(`
                INSERT INTO livros(
                titulo,
                preco,
                descricao ) values(?,?,?)
                `, 
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],

                function(err) { //callback
                    if(err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!')
                    }
                    resolve();
                }

            )
            
        })
    }

    buscarPorId(_id){
        return new Promise( (resolve, reject) =>{
           
            db.all(
                'SELECT _id FROM livros',
                (erro, resultado) => {
                    if(erro) return reject("Não foi possível encontrar o livro citado")

                    return resolve(resultado);
                }
            )

        });
    }

}// Fim livro DAO

module.exports = LivroDao;