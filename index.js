//?  .%%%%.  %%  %%  %%%%%%  .%%%%.  %%%%%.  %%%%%.  .%%%%
//?  %%  %%  %%% %%    %%    %%  %%  %%  %%  %%  %%  %%
//?  %%%%%%  %% %%%    %%    %%  %%  %%%%%   %%%%%   %% %%%
//?  %%  %%  %%  %%    %%    %%  %%  %%  %%  %%  %%  %%  %%
//?  %%  %%  %%  %%    %%     %%%%   %%  %%  %%  %%   %%%%

//*  %%   %%  %%  %%  .%%%%.  %%%%%.  %%%%%.
//*  %%%.%%%   %%%%   %%  %%  %%  %%  %%  %%
//*  %% % %%    %%    %%%%%%  %%%%%   %%%%%
//*  %%   %%    %%    %%  %%  %%      %%
//*  %%   %%    %%    %%  %%  %%      %%

//todo:::::::::: App creada el 05-06-2024 ::::::::::::::::::

import app from './src/app.js'
import {sequelize} from './src/db.js'
import s from './src/envConfig.js'

app.listen(s.Port, async ()=>{
    try {
        await sequelize.sync({force:false});
        console.log(`Server on Port: ${s.Port}. Server ${s.Status}!\n Everything is allright 😉`)
    } catch (error) {
        console.error('Error syncing database', error)
    }
})