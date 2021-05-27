import template from "./templates/users.pug";
import './styles/main.scss';

let locals = {
  users: [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5"
  ]
};

document.querySelector("main").innerHTML = template(locals);