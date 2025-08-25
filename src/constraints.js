let LOGGED_IN = false;
let NEW_USER = true;

function setConstraint(value) {
  LOGGED_IN = value;
}

function setUser(value) {
  NEW_USER = value;
}

export { LOGGED_IN, NEW_USER, setConstraint, setUser };
