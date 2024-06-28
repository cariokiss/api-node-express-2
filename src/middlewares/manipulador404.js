import NaoEncontrado from '../erros/naoEncontrado.js';

function manipulador404(_req, _res, next) {
  const erro404 = new NaoEncontrado();
  next(erro404);
}

export default manipulador404;
