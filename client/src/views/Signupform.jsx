import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { UserContext } from "./UserContext";

const SignupForm = (props) => {
    const history = useHistory();
    const [userForm, setUserForm] = useState({
        firstName: "",
        lastName: "",
        userPassword: ""
    });

    // const { user, setUser } = useContext(UserContext);

    // front-end "validations" errors... trying to catch before user submits bad data to backend.
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // state to handle any backend errors (mostly to catch email RegEx issues)
    const [formErrors, setFormErrors] = useState({});

    const onChangeHandler = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        //validate form, submit to DB, redirect
        userForm.firstName.length >=1 && userForm.lastName.length >= 1 && userForm.userPassword.length >= 3
            ? axios.post("http://localhost:8000/api/users/register", userForm, {withCredentials: true})
                // .then(res => history.push("/"))
                .then(res => { 
                    console.log("registration response: ", res)
                    if (res.data.errors) {
                        setFormErrors(res.data.errors)
                    } else {
                        // redirect to main content.
                        // props.setIsLoginAttempt(true);
                        // setUser(res.data.user)
                    }
                })
                .catch(err => console.log(err))
            : console.log("validations not met...");
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    {
                        firstNameError
                            ? <p style={{ color: "red" }}>{firstNameError}</p>
                            : null
                    }
                    <input type="text" name="firstName" className="form-control" onChange={ (e) => {onChangeHandler(e); e.target.value.length < 1 ? setFirstNameError("First name must be at least 1 character") : setFirstNameError("");} } id="firstName" placeholder="First name" />
                    <p className="text-danger">{formErrors.firstName?.message}</p>
                </div>
                
                <div className="form-group">
                    {
                        lastNameError
                            ? <p style={{ color: "red" }}>{lastNameError}</p>
                            : null
                    }
                    <input type="text" name="lastName" className="form-control" onChange={ (e) => {onChangeHandler(e); e.target.value.length < 1 ? setLastNameError("Last name must be at least 1 character") : setLastNameError("");} } id="lastName" placeholder="Last name" />
                    <p className="text-danger">{formErrors.lastName?.message}</p>
                </div>

                <div className="form-group">
                    {
                        emailError
                            ? <p style={{ color: "red" }}>{emailError}</p>
                            : null
                    }
                    <input type="text" name="userEmail" className="form-control" onChange={ (e) => {onChangeHandler(e); e.target.value.length < 5 ? setEmailError("Email must have at least 5 characters") : setEmailError("");} } id="userEmail" placeholder="Email (e.g. 'Someone@somewhere.com')" />
                    <p className="text-danger">{formErrors.userEmail?.message || formErrors.matchingEmail?.message}</p>
                </div>

                <div className="form-group">
                    {
                        passwordError
                            ? <p style={{ color: "red" }}>{passwordError}</p>
                            : null
                    }
                    <input type="password" name="userPassword" className="form-control" onChange={ (e) => {onChangeHandler(e); e.target.value.length < 5 ? setPasswordError("Password must be at least 5 characters") : setPasswordError("");}} id="userPassword" placeholder="New Password" />
                    <p className="text-danger">{formErrors.userPassword?.message}</p>
                </div>

                <div className="form-group">
                    {
                        confirmPasswordError
                            ? <p style={{ color: "red" }}>{confirmPasswordError}</p>
                            : null
                    }
                    <input type="password" name="confirmPassword" className="form-control" onChange={ (e) => {onChangeHandler(e); e.target.value !== userForm.userPassword ? setConfirmPasswordError("Passwords must match.") : setConfirmPasswordError("");} } id="confirmPassword" placeholder="Confirm Password" />
                    <p className="text-danger">{formErrors.confirmPassword?.message}</p>
                </div>
                <Button variant="secondary mt-2" onClick={props.handleClose}>Close</Button>
                <Button variant="success mt-2" type="submit">Sign Up</Button>
            </form>
        </>
    )
}

export default SignupForm;