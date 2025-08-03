// user.model.js
export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }

  //to add new user
  static addUser(req) {
    let newUser = new UserModel(
      Date.now().toString(),
      req.body.name,
      req.body.email,
      req.body.password
    );
    users.push(newUser);
  }

  //to get user by id
  static getUserByEmail(email) {
    return users.find((u) => u.email == email);
  }

  //to check login pass
  static check(userObj) {
    return users.find(
      (u) =>
        u.email.toString().toLowerCase() ==userObj.email.toString().toLowerCase() &&
        u.password == userObj.password
    );
  }
}

//sample user data
var users = [
  new UserModel(1, "user1", "user1@gmail.com", "user1pass"),
  new UserModel(2, "user2", "user2@gmail.com", "user2pass"),
];
