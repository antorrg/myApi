import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const updHolderMidd = (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = req.body;
       console.log('soy el id: ',id)
       
        // Validar que el ID esté presente
        if (!id) { return res.status(400).json({ error: 'Missing id' })}
        // Validar que el ID sea un UUID v4 válido
        if (!uuidValidate(id) || uuidVersion(id) !== 4) {return res.status(400).json({ error: 'Invalid id' })}
        // Validar que el cuerpo de la solicitud esté presente y no vacío
        if (!newData || Object.keys(newData).length === 0) {return res.status(400).json({ error: 'Missing body' })}

        // Puedes agregar validaciones adicionales para los campos esperados en newData
        const requiredFields = ['email', 'given_name', 'picture', 'country', 'role', 'enable'];
        const missingFields = requiredFields.filter(field => !(field in newData));
        if (missingFields.length > 0) {return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` })}
       
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
