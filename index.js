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

import app from './app.js'
import s from './src/envConfig.js'

app.listen(s.Port, ()=>{
    console.log(`Server on Port: ${s.Port}\n Everything is allright 😉`)
})