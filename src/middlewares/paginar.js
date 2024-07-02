import RequisicaoIncorreta from '../erros/requisicaoIncorreta.js';

async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = '_id:1' } = req.query;

    const [campoOrdenacao, ordem] = ordenacao.split(':');

    limite = Number.parseInt(limite);
    pagina = Number.parseInt(pagina);

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .skip(limite * (pagina - 1))
        .limit(limite)
        .exec();

      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (erro) {
    next(erro);
  }
}

export default paginar;
