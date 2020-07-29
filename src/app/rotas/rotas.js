const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = app => {

    app.get('/', function(req, res){
        res.send(
            `
                <html>
                    <body>
                        <h1> Server Rodando </h1>
                    </body>
                </html>
            `
        );
    });
    
    app.get('/livros', function(req, res){
        // MARKO linka o arquivo HTML como RES ( response )

        const livroDao = new LivroDao(db);

        livroDao.lista()
        .then(livros =>  res.marko(
            require('../views/livros/lista/lista.marko'),
            {
                //O segundo parametro do marko recebe valores para preencher o template do htmls
                livros: livros
                
            }
        ))
        .catch(erro => console.log(erro));

        //db.all('SELECT * FROM livros', function();
        
    });

    // A visualização do formulário requisitada
    app.get('/livros/form', function(req, res){

        res.marko(require('../views/livros/form/form.marko'))
    })

    app.post('/livros', function(req, res){

        console.log(req.body);

        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
        .then(res.redirect('/livros'))
        .catch(erro => console.log(erro));
    })


    app.get('/livros/busca', function(req, res){

       res.marko(require('../views/livros/form/busca.marko'));

       const livroDao = new LivroDao(db);

       livroDao.buscarPorId(req.body)
       .then(res.redirect('/livros'))
       .catch(erro => console.log(erro));

    })

};

