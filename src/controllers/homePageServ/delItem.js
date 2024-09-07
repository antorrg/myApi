import {Item, sequelize} from '../../db.js'

const delItem = async (id) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        // Encontrar el Home por ID
        const item = await Item.findByPk(id, { transaction });
        if (!item) {
            const error = new Error('Item not found');
            error.status = 404;
            throw error;
        }

        await item.destroy({
            transaction
        });

        await transaction.commit();
        return { message: 'Item deleted successfully' };
    } catch (error) {
        if (transaction) { await transaction.rollback(); }
        throw error;
    }
};

export default delItem