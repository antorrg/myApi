//?  .%%%%.  %%  %%  %%%%%%  .%%%%.  %%%%%.  %%%%%.  .%%%%
//?  %%  %%  %%% %%    %%    %%  %%  %%  %%  %%  %%  %%
//?  %%%%%%  %% %%%    %%    %%  %%  %%%%%   %%%%%   %% %%%
//?  %%  %%  %%  %%    %%    %%  %%  %%  %%  %%  %%  %%  %%
//?  %%  %%  %%  %%    %%     %%%%   %%  %%  %%  %%   %%%%

//*  %%   %%  %%  %%  .%%%%.  %%%%%.  %%%%%.   %%   %% %%  %% .%%%%.   %%%%%. %%  %%. %%%%%. %%%%%.  %%%%% %%%%%  %%%%%.
//*  %%%.%%%   %%%%   %%  %%  %%  %%  %%  %%   %%%.%%% %%  %% %%  %%   %%     %%  %%  %%  %% %%  %%  %%    %%     %% 
//*  %% % %%    %%    %%%%%%  %%%%%   %%%%%    %% % %% %º  %º %%       %%%%%   %%%º   %%%%%  %%%%%   %%%%% %%%%%  %%%%%  
//*  %%   %%    %%    %%  %%  %%      %%       %%   %%  %  %  %%  %%   %%     %%  %%  %%     %%  %%  %%       %%     %%
//*  %%   %%    %%    %%  %%  %%      %%       %%   %%   %%    %%%%º   %%%%%  %%  %%  %%     %%  %%  %%%%% %%%%%  %%%%%  


//todo:::::::::: App creada el 27-07-2024 ::::::::::::::::::

import app from './src/app.js'
import {sequelize} from './src/db.js'
import s from './src/envConfig.js'
import initialUser from './src/controllers/holder/initialUser.js'

app.listen(s.Port, async ()=>{
    try {
        await sequelize.sync({force:false});
        await initialUser()
        console.log(`Server on Port: ${s.Port}. Server ${s.Status}!\n Everything is allright 😉\n We are in http://localhost:${s.Port}`)
    } catch (error) {
        console.error('Error syncing database', error)
    }
})