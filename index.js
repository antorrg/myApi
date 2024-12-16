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


//todo:::::::::: App creada el 27-07-2024 y modificada el 16-12-2024 ::::::::::::::::::

import app from './server/app.js'
import {sequelize} from './server/db.js'
import s from './server/envConfig.js'
import initialUser from './server/controllers/holder/initialUser.js'

app.listen(s.Port, async ()=>{
    try {
        await sequelize.sync({force:false});
        await initialUser()
        console.log(`Server on Port: ${s.Port}. Server ${s.Status}!\n Everything is allright 😉\n We are in http://localhost:${s.Port}`)
    } catch (error) {
        console.error('Error syncing database', error)
    }
})