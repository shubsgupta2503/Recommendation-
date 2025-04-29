package login

import "project/constants"

var k map[string]string
var u map[string]constants.User

func Instantiate() {
	k = make(map[string]string)         // initialize the map
	u = make(map[string]constants.User) // initialize the map
	k["a"] = "a"
	u["a"] = constants.User{
		Email:       "a",
		Password:    "a",
		PhoneNumber: "323",
		FirstName:   "Bro",
		LastName:    "Cry",
	}
}

func CreateUser(user constants.User) {
	k[user.Email] = user.Password
	u[user.Email] = user
}

func Verify(email string, password string) (bool, constants.User) {
	return k[email] == password, u[email]
}
