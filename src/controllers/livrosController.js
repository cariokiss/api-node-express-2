import NaoEncontrado from '../erros/naoEncontrado.js';
import { livros } from '../models/index.js';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class LivroController {
  static listarLivros = async (_req, res, next) => {
    try {
      const livrosResultado = await livros.find().populate('autor').exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id).populate('autor', 'nome').exec();

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado('Id do Autor não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livroResultado !== null) {
        res.status(200).send({ message: 'Livro atualizado com sucesso' });
      } else {
        next(new NaoEncontrado('Id do Autor não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndDelete(id);

      if (livroResultados !== null) {
        res.status(200).send({ message: 'Livro removido com sucesso' });
      } else {
        next(new NaoEncontrado('Id do Autor não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res) => {
    try {
      const { editora, titulo, minPaginas, maxPaginas } = req.query;

      const busca = {};

      if (editora) busca.editora = editora;
      if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };

      if (minPaginas || maxPaginas) busca.numeroPaginas = {};

      // gte = maior ou igual que
      if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
      // lte = menor ou igual que
      if (minPaginas & maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

      const livrosResultado = await livros.find(busca);

      res.status(200).send(livrosResultado);
    } catch (erro) {
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  };
}

export default LivroController;
