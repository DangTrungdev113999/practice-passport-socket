import { contact } from "./../services/index";

let index = async (req, res) => {
  try {
    let userId = req.user._id;

    let allUserToAdd = await contact.getAllUser(userId);
    let getAllFriend = await contact.getAllFriend(userId);

    res.render("main/master", {
      success: req.flash("success"),
      errors: req.flash("errors"),
      allUserToAdd,
      getAllFriend
    })
  } catch (error) {
    console.log(error)
  }

}


module.exports = {
  index
}