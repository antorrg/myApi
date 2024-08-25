import sv from "../../controllers/holder/userServices.js";
import spage from "../../controllers/homePageServ/index.js";
import eh from "../../utils/errors/index.js";
import env from "../../envConfig.js";

export default {
  createUserCtr: eh.catchAsyncMVC(async (req, res) => {
    const { email, password } = req.body;
    const response = await sv.userCreate(email, password);
    res.status(201).json(response);
  }),

  signIn: eh.catchAsyncMVC(async (req, res) => {
    res.render("./protectRoutes/form", {
      title: "Iniciar sesión",
    });
  }),

  loginController: async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await sv.userLog(email, password);
      req.session.user = {
        userId: response.user.id,
        email: response.user.email,
        role: response.user.role,
      };
      console.log(req.session.user.userId);
      req.session.isAuthenticated = true;
      res.cookie("sessionId", req.session.user.userId, {
        httpOnly: true, // Solo accesible por el servidor
        secure: false, // Cambiar a true si usas HTTPS
        sameSite: "Strict", // Evitar CSRF
        maxAge: 1000 * 60 * 60, // 1 hora
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  },

  logoutController: async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid"); // Limpia la cookie de sesión del cliente
      res.clearCookie("connect.id");
      res.clearCookie("sessionId");
      res.redirect("/");
    });
  },
  dashBoard: eh.catchAsyncMVC(async (req, res) => {
    const { userId } = req.session.user;
    const info = await sv.getUsersById(userId);
    const page = await spage.getHome();
    //console.log(info)
    res.render("./protectRoutes/pages", { info, page });
  }),
  //A partir de aqui todos los controllers de rutas protegidas estan en "adminControllers.js"
};
