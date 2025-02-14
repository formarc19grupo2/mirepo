const { User } = require("../database/models");
const fs = require("fs");
const path = require("path");

module.exports = {
    allUser : (req, res) => {
        User.findAll()
        .then(usuarios => {
            res.render('admin/adminUsers',{
                title : 'Usuarios',
                usuarios,
            })
        })
        .catch(error => console.log(error))
    },
    editUser : (req, res) => {
        const { id } = req.params;
        User.update({
            rol : req.body.rol,
        },{
            where : { id }
        })
        .then(() => {
            res.redirect(`/admin/usuarios#${id}`)
        })
        .catch(error => console.log(error));
    },
    deleteUser : (req, res) => {
        const { id } = req.params;
        User.findByPk(req.params.id)
        .then(usuario => {
            if (fs.existsSync(path.join(__dirname, "../../public/images/avatars", usuario.avatar)) && usuario.avatar !== "default-image.png"){
                fs.unlinkSync( path.join(__dirname, "../../public/images/avatars", usuario.avatar))
            }
            User.destroy({
                where: { id }
            })
            .then(() => {})
            .catch(error => console.log(error))
            res.redirect(`/admin/usuarios#${id}`)
        })
        .catch(error => console.log(error))
    },
    searchUser : (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        User.findAll({
            where: {
                rol: busqueda
            }
        })
        .then(usuarios => {
            res.render('admin/adminUsers',{
                title : `Usuarios tipo ${busqueda}`,
                usuarios,
            })
        })
        .catch(error => console.log(error));
    }
}