import {Home, Item} from '../../db.js'

const delHome = async (id) => {
    try {
    const page = await Home.findByPk(id)

    await page.destroy();
    } catch (error) {
    throw error;
    }
}

export default delHome
