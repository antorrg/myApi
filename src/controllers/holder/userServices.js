import { Holder } from "../../db.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "../../utils/validation/jwt.js";
import throwError from "../../utils/errors/formatError.js";
import env from "../../envConfig.js";
import holderParser from "./helpers/holderParser.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // TTL (Time To Live) de una hora

export default {
  userCreate: async (email1, password, role) => {
    const passSelected = env.DefaultPass ? env.DefaultPass : password;
    try {
      const holderFound = await Holder.findOne({
        where: {
          email: email1,
        },
      });
      if (holderFound) {
        throwError("¡Este usuario ya existe!", 400);
      }
      //preparacion de variables:
      const hashedPassword = await bcrypt.hash(passSelected, 12);
      const nickname1 = email1.split("@")[0];
      //creacion de holder (superUser)
      const newHolder = await Holder.create({
        email: email1,
        password: hashedPassword,
        nickname: nickname1,
        given_name: "",
        role: role || 1,
        picture: `${env.UserImg}`,
      });
      if (!newHolder) {
        throwError("Error inesperado en el servidor!", 500);
      }
      return holderParser(newHolder, true);
    } catch (error) {
      throw error;
    }
  },
  userLog: async (email1, password1) => {
    try {
      const hold = await Holder.findOne({
        where: {
          email: email1,
        },
      });
      if (!hold || hold === undefined) {
        throwError("¡Este usuario no existe!", 400);
      }
      //verificacion de password:
      const passwordMatch = await bcrypt.compare(password1, hold.password);
      if (!passwordMatch) {
        throwError("¡Contraseña no valida!", 400);
      }
      return {
        user: holderParser(hold, true),
        token: jwt.generateToken(hold),
      };
    } catch (error) {
      throw error;
    }
  },
  getAllUsers: async () => {
    try {
      const holderFound = await Holder.findAll();
      if (!holderFound) {
        throwError("Unexpected error. Users not found", 500);
      }
      if (holderFound.length === 0) {
        throwError("Users not found", 404);
      }
      return holderParser(holderFound, false);
    } catch (error) {
      throw error;
    }
  },
  getUsersById: async (id) => {
    try {
      // Intento obtener los datos del caché
      let cachedUser = cache.get(`userById_${id}`);
      if (cachedUser) {
        return cachedUser;
      }
      const holderFound = await Holder.findByPk(id);
      if (!holderFound) {
        throwError("Unexpected error. User not found", 404);
      }
      const userDetail = holderParser(holderFound, true);
      cache.set(`userById_${id}`, userDetail);
      return userDetail;
    } catch (error) {
      throw error;
    }
  },

  userUpd: async (id, newData) => {
    try {
      const holder = await Holder.findByPk(id);
      if (!holder) {
        throwError("Usuario no hallado", 404);
      }
      //Proteccion de superusuario:
      const protectSU = (holder) => {
        holder.email === env.UserEmail ? true : false;
      };
      const nickname1 = newData.email.split("@")[0];
      const updInfo = {
        email: protectSU ? env.UserEmail : newData.email,
        nickname: nickname1,
        given_name: newData.given_name,
        picture: newData.picture,
        role: protectSU ? Number(9) : Number(newData.role),
        country: newData.country,
        enable: protectSU ? Boolean(true) : Boolean(newData.enable),
      };
      const holderUpdated = await holder.update(updInfo);
      if (holderUpdated) {
        cache.del(`userById_${id}`);
      }
      return holderUpdated;
    } catch (error) {
      throw error;
    }
  },
  verifyPass: async (id, password) => {
    try {
      const user = await Holder.findByPk(id, {
        where: {
          email: {
            [Op.notIn]: [env.UserEmail], // Lista de correos electrónicos a excluir
          },
        },
      });
      if (!user) {
        throwError("Usuario no encontrado", 404);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throwError("Contraseña no valida", 400);
      }
      return { message: "¡Contraseña verificada exitosamente!" };
    } catch (error) {
      throw error;
    }
  },

  userChangePass: async (id, password) => {
    try {
      const user = await Holder.findByPk(id, {
        where: {
          email: {
            [Op.notIn]: [env.UserEmail], // Lista de correos electrónicos a excluir
          },
        },
      });
      if (!user) {
        throwError("Usuario no hallado", 404);
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newData = { password: hashedPassword };
      const holderUpdated = await user.update(newData);
      if (holderUpdated) {
        cache.del(`userById_${id}`);
      }
      return "¡Contraseña actualizada exitosamente!";
    } catch (error) {
      throw error;
    }
  },
  userDel: async (id) => {
    try {
      const user = await Holder.findByPk(id, {
        where: {
          email: {
            [Op.notIn]: [env.UserEmail], // Lista de correos electrónicos a excluir
          },
        },
      });
      if (!user) {
        throwError("Usuario no hallado", 404);
      }
      const userDel = await user.destroy(id);
      if (userDel) {
        cache.del(`userById_${id}`);
      }
      return { message: "Usuario borrado exitosamente" };
    } catch (error) {
      throw error;
    }
  },
};
