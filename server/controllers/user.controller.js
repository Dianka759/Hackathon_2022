const User = require('../models/user.model');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

class UserController {

    //admin controller features for getting all users
    getAllUsers = (req, res) => {
        User.find()
            .then(allUsers => {
                res.json({ results: allUsers })
            })
            .catch(err => {
                res.json({ error: err })
            })
    }

    registerUser = (req, res) => {
        //Finds to see if user exist
        User.find({ email: req.body.email })
            //if user exist then proceed
            .then(usersWithEmail => {
                console.log("Response when finding user", usersWithEmail)
                //if user doesnt exist create user
                if (usersWithEmail.length === 0) {
                    User.create(req.body)
                        .then(user => {
                            //when .then runs that means user successfully created and stroed in variable "user" 
                            //which has info that was just put into the db including field _id
                            const userToken = jwt.sign({
                                id: user._id
                                // firstName: user.firstName
                            }, process.env.SECRET_KEY);
                            //responds with cookie 'usertoken' that contains JWT from above called userToken
                            //ans responds with info about the user just added
                            res
                                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                                    httpOnly: true
                                })
                                .json({ msg: "success!", user: user });
                        })
                        .catch(err => res.json(err));
                } else {
                    // Email Already Taken
                    res.json({ errors: { email: { message: "Email is taken!" } } })
                }
            })
            .catch(err => console.log('errr!!', err))
    }

    login = async (req, res) => {
        //see if user exist in db
        const user = await User.findOne({ email: req.body.email });
        if (user === null) {
            // email not found in users collection
            return res.json({ error: "User Not Found" });
        }
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            // password wasn't a match!
            return res.json({ error: "Password is incorrect" });
        }
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

    updateExistingUser = (req, res) => {
        User.updateOne({ _id: req.params._id }, req.body, { runValidators: true })
            .then(updatedUser => {
                res.json({ user: updatedUser })
                console.log("updated user successfully")
            })
            .catch(err => {
                res.json({ message: "Something went wrong", err })
                console.log(err, "err")
            });
    }

    logout = (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

    getLoggedInUser = (req, res) => {
        //use the info stored in the cookie to get the id of the user and return info of that user
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })
        // console.log("decoded jwt", decodedJWT)
        // decodedJWT.payload.id
        User.findOne({ _id: decodedJWT.payload.id })
            .then(foundUser => {
                res.json({ results: foundUser })
            })
            .catch(err => {
                res.json(err)
                console.log(err)
            })
    }


    deleteAnExistingUser = (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
        //puts id into delete one to target user 
        User.deleteOne({ _id: req.params._id })
            .then(res => {
                // res.json({ result: result })
                console.log("Deleted User")
            }
            )
            .catch(err => {
                res.status(400).json({ message: "Something went wrong", err })
                console.log("err", err)
            });
    }
}

module.exports = new UserController();