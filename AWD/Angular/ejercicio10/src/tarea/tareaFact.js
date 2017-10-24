app.factory("FacTarea", ["$http", function ($http) {
    return {

        consultaComentarios: function (id) {
            return $http.get("http://localhost:3000/tareas/" + id + "/comentarios");
        },
        agregarComentario: function (id, comentario) {
            return $http.post("http://localhost:3000/tareas/" + id + "/comentarios", comentario);
        },
        eliminarComentario: function (id) {
            return $http.delete("http://localhost:3000/comentarios/" + id);
        },
        editarComentario: function (id, comentario) {
            return $http.put("http://localhost:3000/comentarios/" + id, comentario);
        },


        obtenerUsuarioPorCorreo: function (correo) {
            return $http.get("http://localhost:3000/usuarios?correo=" + correo);
        },
        consultaTarea: function (id) {
            return $http.get("http://localhost:3000/tareas/" + id);
        }

    }
}]);
