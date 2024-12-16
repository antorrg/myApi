import env from '../server/envConfig.js'
import * as db from '../server/database.js'



describe('Iniciando tests, probando variables de entorno del archivo "envConfig.js" y existencia de tablas en DB.',()=>{
    afterAll(()=>{
     console.log('Finalizando todas las pruebas...')
    })
    
    it('Deberia retornar el estado y la variable de base de datos correcta', ()=>{
        const formatEnvInfo =`Servidor corriendo en: ${env.Status}\n` +
                   `Base de datos de testing: ${env.DbConnect}`
     expect(formatEnvInfo).toBe(`Servidor corriendo en: test\n` +
        `Base de datos de testing: postgres://postgres:antonio@localhost:5432/testing`)
    })
    
    it('Deberia responder a una consulta en la base de datos con un arreglo vacío', async()=>{
        const users = await //db.User.findAll()
     
        expect(users).toEqual([]);
       
        
    });
})