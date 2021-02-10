const express = require('express');
const router = express.Router();
const proyectosControllers = require('../controllers/proyectos');
const tareasControllers = require('../controllers/tareas');
const usuariosControllers = require('../controllers/usuarios');
module.exports = () => {
    router.get('/', proyectosControllers.home);
    router.get('/proyecto', proyectosControllers.getProyects);
    router.post(
        '/proyecto',
        proyectosControllers.postProyectValidators,
        proyectosControllers.postProyect
    );
    router.get('/proyecto/:url', proyectosControllers.getProyect);
    router.put(
        '/proyecto/:id',
        proyectosControllers.postProyectValidators,
        proyectosControllers.putProyect
    );
    router.delete('/proyecto/:id', proyectosControllers.deleteProyect);
    // Tareas
    router.post(
        '/proyecto/:url/tarea',
        tareasControllers.tareasValidator,
        tareasControllers.postTarea
    );
    router.get('/proyecto/:url/tarea', tareasControllers.getTareasPorPoryecto);
    router.put('/tarea/:id', tareasControllers.updateTarea);
    router.delete('/proyecto/:url/tarea/:id', tareasControllers.deleteTarea);
    // Usuario
    router.post(
        '/usuario',
        [usuariosControllers.postUsuarioValidator],
        usuariosControllers.postUsuario
    );
    return router;
};
