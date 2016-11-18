miApp.factory('fRutas', function () {

  var objeto = {};
  objeto.RutaDesarrollo = RutaDesarrollo;
  objeto.RutasWeb = RutasWeb;
  
  return objeto;

  function RutaDesarrollo(){
    return 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/';
  }

  function RutasWeb() {
    return 'http://labivaxel.esy.es/ws1/';
  }
})
