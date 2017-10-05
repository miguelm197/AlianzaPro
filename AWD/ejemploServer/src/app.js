var app = angular.module("myApp",[]);

app.constant('gastosCTEOptions', [{id: '1', name: 'Viajes'}, {id: '2', name: 'Facturas'},{id: '3', name: 'Comida'}]);
app.constant('gastosCTE', [{id: '0', option:'1',show:true,titulo: 'Francia'}, {id: '1', option:'2',show:true,titulo: 'Pagar OSE'}]);