import React from 'react';
import { useState } from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom';

const PostForm = (props) => {
    const categories = ["housing", "food", "other"]
    const user = JSON.parse(sessionStorage.getItem("user"))

    const [form, setForm] = useState({
        userID: user._id,
        title: "",
        description: "",
        categories: categories[0],
        location: "",
        food_quantity: null,
        housing_quantity: null,
        otherName: "",
        otherQuantity: null,
    })

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // console.log(form)
        axios.post(`http://localhost:8000/api/users/createPost/${user._id}`, form)
            .then(res => {
                console.log(res);
                // history.push("/")
            })
            .catch(err => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors)
            })

    }

    return (
        <div>
            <div class="background-image">
                <h1>Create New Post</h1>
                {/* *************** FORM START *************** */}
                <form className="mt-5 w-50 mx-auto" onSubmit={onSubmitHandler}>

                    <div className="form-group">
                        <label> Title </label>
                        <input type="text" name="title" className="form-control" placeholder="title" onChange={onChangeHandler} />
                        <span className="alert-danger"> {errors.title && errors.title.message}</span>
                    </div>
                    <div className="form-group"  >
                        <label> Description </label>
                        <input type="text" name="description" className="form-control" placeholder="description" onChange={onChangeHandler} />
                        <span className="alert-danger"> {errors.description && errors.description.message}</span>
                    </div>

                    <label> Categories </label>
                    <select name="categories" className="form-select mb-2" onChange={onChangeHandler} >
                        {
                            categories.map((category, i) => {
                                return <option value={category} key={i}> {category} </option>
                            })
                        }
                    </select>
                    <span className="alert-danger"> {errors.categories && errors.categories.message}</span>

                    <label>Location </label>
                    <div className="form-group mb-2" onChange={onChangeHandler}>
                        <input type="text" name="location" className="form-control" placeholder="location" />
                    </div>
                    <span className="alert-danger"> {errors.platform && errors.platform.message}</span>

                    <label>Food Quantity </label>
                    <div className="form-group mb-2" onChange={onChangeHandler}>
                        <input type="number" name="food_quantity" className="form-control" placeholder="food_quantity" />
                    </div>
                    <span className="alert-danger"> {errors.food_quantity && errors.food_quantity.message}</span>

                    <label>Housing Quantity </label>
                    <div className="form-group mb-2" onChange={onChangeHandler}>
                        <input type="number" name="housing_quantity" className="form-control" placeholder="housing_quantity" />
                    </div>
                    <span className="alert-danger"> {errors.housing_quantity && errors.housing_quantity.message}</span>

                    <label>Other Name</label>
                    <div className="form-group mb-2" onChange={onChangeHandler}>
                        <input type="text" name="otherName" className="form-control" placeholder="otherName" />
                    </div>
                    <span className="alert-danger"> {errors.otherName && errors.otherName.message}</span>

                    <label>Other Quantity </label>
                    <div className="form-group mb-2" onChange={onChangeHandler}>
                        <input type="number" name="otherQuantity" className="form-control" placeholder="otherQuantity" />
                    </div>
                    <span className="alert-danger"> {errors.otherQuantity && errors.otherQuantity.message}</span>
                    <input type="submit" className="btn btn-success" />

                </form>
                {/* *************** FORM END *************** */}
            </div>
        </div>
    )
}

export default PostForm;