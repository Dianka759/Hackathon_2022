import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PostDisplay = (props) => {

    const [state, setState] = useState([])
    const [loaded, setLoaded] = useState(false)



    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getResourceByType/food")
            .then(res => {
                console.log(res.data.results);
                setState(res.data.results);
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="background-image">
                {loaded &&
                    state.map((value, i) => {
                        <div key={i}>
                            {value}
                        </div>
                    })
                }
            </div>
        </div>
    )
}


export default PostDisplay