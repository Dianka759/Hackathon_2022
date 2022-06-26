
import React from 'react'
import axios from "axios"
import { useState } from 'react';

const App_form = () => {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState([
        {
            title: "",    
            description: "",
                    foodChecked: false,
                    food_quantity: 0
                ,
                housing: {
                    housingChecked: false
            },
                other: {
                    otherChecked: false,
                    other_quantity: 0
                }
            },

            //This will have to be its own form because of the model
            // resource_request: {
            //     requesting_User_id: "",
            //     comments: "",
            //     follow_request: ""
            // }
        ])

    const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(form);
    axios.post("http://localhost:8000/api/users/createPost/:_id", form)
        .then(res => {
            console.log(res.data.results);
        })
        .catch(err => {
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors)
            
        })
    }

    const onChangeHandler = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })}



return (
        <div>
        {/* Beginning of Form */}
        
        {/* <className="form-box"> */}
        <h3>Post</h3>
        <form action="" onSubmit={onSubmitHandler}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder='Title' onChange={onChangeHandler} />
                <span className="alert-danger"> {errors.title && errors.title.message}</span>


                <label htmlFor="description">Description</label>
            <input type="text" name="description" placeholder='Description' onChange={onChangeHandler} />
                <span className="alert-danger"> {errors.description && errors.description.message}</span>


            {/*********** RESOURCE CATEGORIES START ***********/}
            <div className="row form-group">
                <label className="form-label my-2">Resources:</label>
                {
                    form.category?.map((value, i) => (
                        <div className="" key={i}>
                            <label className="mx-2">Category Name:</label>
                            <input
                                className="col-sm-3"
                                type="text"
                                key={i}
                                id="resource"
                                value={value.category}
                                name="ingredients"
                                // onChange={event => handleAddCategory(event, i)}
                            />

                            {i ? 
                                <><label className="mx-1">Quantity:</label><input
                                    className="col-sm-1"
                                    type="number"
                                    value={value.quantity}
                                    name="quantity"
                                    id="quantity"
                                    // onChange={(event) => handleAddQuantity(event, i)} />
                                    />
                                    </>
                                : null
                            }


                            {/* <button className="col btn btn-outline-primary mx-3 my-1" type="button" onClick={() => handleAddField()} >+ Ingredient</button> */}

                        </div>))}
            </div>
            {/*********** RESOURCES END ***********/}



        </form>
    {/* End of Form */}
</div>
    
)
}
export default App_form;
