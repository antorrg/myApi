

const sendEmail = async (req, res) => {
    const info = await serv.getHome();
    res.render("index", { info });
  };