import {Home, Item, sequelize} from '../../db.js'

const delHome = async (id) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        // Encontrar el Home por ID
        const home = await Home.findByPk(id, { transaction });
        if (!home) {
            const error = new Error('Home not found');
            error.status = 404;
            throw error;
        }

        // Borrar los Items asociados
        await Item.destroy({
            where: { HomeId: id },
            transaction
        });

        // Borrar el Home
        await home.destroy({ transaction });

        await transaction.commit();
        return { message: 'Home and associated items deleted successfully' };
    } catch (error) {
        if (transaction) { await transaction.rollback(); }
        throw error;
    }
};


export default delHome
