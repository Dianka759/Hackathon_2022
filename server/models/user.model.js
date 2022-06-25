const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"]
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"]
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			validate: {
				validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
				message: "Please enter a valid email"
			}
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be 8 characters or longer"]
		},
		post: {
			type: String,
			title: {
				type: String
			},
			description: {
				type: String
			}
		}
	},
	{ timestamps: true }
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);//Creats a virtual field called confirmPassword that is used to validate the password matches confirm --> Getter and setter are creating temporary fields for cP

//pre is saving the user to db, validate the user object password matches. if they dont match, this.invalidate() will creata a valid error message
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();//after this is done go to the next step
});

//Hashes password before saving it to the db
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


const User = mongoose.model("user", UserSchema);

module.exports = User;