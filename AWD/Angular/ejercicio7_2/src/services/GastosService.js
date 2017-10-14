app.service('GastosService',["$http","gastosCTEOptions","gastosCTE",function($http,gastosCTEOptions,gastosCTE){

    this.darmeOpcionesDeGastosService = function() {
       return gastosCTEOptions;
    }
    this.agregarGastoService = function(nuevoGasto){
        gastosCTE.push(nuevoGasto);
    }
    this.darmeGastosService = function(){
        return gastosCTE;
    }
    this.dbGetGastos = function(){
        return $http({method: 'GET', url: 'http://localhost:3000/gastos'});
    }
    this.dbPostGasto = function(nuevoGasto){
        return $http.post("http://localhost:3000/gastos",nuevoGasto);
    }
    this.dbDeleteGasto = function(deletedGasto){
        return $http.delete("http://localhost:3000/gastos/"+deletedGasto.id);
    }
    this.dbPutGasto = function(editedGasto){
        return $http.put("http://localhost:3000/gastos/"+editedGasto.id,editedGasto);
    }
}]);