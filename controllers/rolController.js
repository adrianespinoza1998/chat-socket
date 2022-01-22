const Rol = require('../models/rol');

const listarRoles = async(req = request, res = response)=>{
    //Listar Roles
    const roles = await Rol.find({estado: true});

    res.status(200).json(roles);

}

const buscarRolXId = async(req = request, res = response)=>{
    //Guardar id rol
    const {id} = req.params;

    //Buscar rol x id
    const rol = await Rol.findById(id);

    res.status(200).json(rol);
}

const crearRol = async(req = request, res = response)=>{
    //Guardar rol
    const {rol} = req.body;

    const buscarRol = await Rol.findOne({rol: rol.toUpperCase()});

    if(buscarRol){
        return res.status(200).json({
            msg: `El rol ${rol} ya existe en la BD`
        });
    }

    //Crear rol
    const role = new Rol({rol: rol.toUpperCase()});

    //Guardar rol
    await role.save();

    res.status(201).json(role);

}

const editarRol = async(req = request, res = response)=>{
    //Guardar id del rol
    const {id} = req.params;

    //Guardar rol
    const {rol} = req.body;

    //Editar rol
    const role = await Rol.findByIdAndUpdate(id, {rol: rol.toUpperCase()}, {new: true});

    res.status(201).json(role);
}

const desactivarRol = async(req = request, res = response)=>{
    //Guardar id del rol
    const {id} = req.params;

    //Desactivar rol
    await Rol.findByIdAndRemove(id);

    res.status(201).json({
        msg: `Rol con el id ${id} eliminado`
    });
}

module.exports = {
    listarRoles,
    buscarRolXId,
    crearRol,
    editarRol,
    desactivarRol
};