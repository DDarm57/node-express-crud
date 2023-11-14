const User = require("../models/usersModel");

module.exports = {
  index: (req, res) => {
    User.find()
      .then((user) => {
        res.render("user", { users: user });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  create: (req, res) => {
    res.render("create_user");
  },
  store: (req, res) => {
    const user = new User({
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone,
    });
    user
      .save()
      .then((result) => {
        let viewJson = {
          status: true,
          data: result,
          message: "Data success added",
        };
        console.log(viewJson);
        // res.send({
        //   status: true,
        //   data: result,
        //   message: "Data succefully added",
        // });

        res.redirect("/user");
      })
      .catch((error) => {
        res.send({
          status: false,
          message: "Data error added",
        });
      });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const dataUser = await User.findById(id);
    res.render("edit", { user: dataUser });
  },
  update: async (req, res) => {
    const id = req.params.id;
    const updateUser = await User.findById(id);
    updateUser.name = req.body.name;
    updateUser.age = req.body.age;
    updateUser.address = req.body.address;
    updateUser.phone = req.body.phone;
    await updateUser
      .save()
      .then((result) => {
        let viewJson = {
          status: true,
          message: "Data success updated",
          data: result,
        };
        console.log(viewJson);
        res.redirect("/user");
      })
      .catch((error) => {
        console.log("Data error updated");
      });

    // dataUsers.filter((user) => {
    //   if (user.id == id) {
    //     user.id = id;
    //     user.name = req.body.name;
    //     user.age = req.body.age;
    //     user.address = req.body.address;
    //     return user;
    //   }
    // });
    // res.json({
    //   return: true,
    //   data: dataUsers,
    //   message: "Data success updated",
    // });
  },
  delete: async (req, res) => {
    let id = req.params.userId;
    try {
      const deletedData = await User.findById(id).deleteOne();
      if (!deletedData) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      } else {
        let viewJson = {
          status: true,
          message: "Data success deleted",
        };
        console.log(viewJson);
        res.redirect("/user");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    // const userDeleted = dataUsers.filter((user) => user.id != id);
    // res.json({
    //   return: true,
    //   data: userDeleted,
    //   message: "Data success deleted",
    // });
  },
};
