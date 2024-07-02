import mongoose from 'mongoose';
import ErroBase from '../erros/erroBase.js';
import RequisicaoIncorreta from '../erros/requisicaoIncorreta.js';
import ErroValidacao from '../erros/erroValidacao.js';

function manipuladorDeErros(erro, _req, res, _next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof ErroBase) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
