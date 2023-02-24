// somente usar o wildCard se a API foi pública. Caso contrário, setar o endereço para ser somente o referente ao frontend que vai ser responsável por realizar as requisições ao seu backend.
// vai permitir o cache das informações necessárias para a requisição de preflight (allow methods e headers): 'Access-Control-Max-Age - define o periodo que as informçoes vao ficar cacheadas'. se vc definir -1 como o tmepo para ser armazenado, o navegador vai realizar uma req de preflight sempre que for feita uma req ao backend que não for simples

module.exports= (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '10');
  next();
};