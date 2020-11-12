import React from 'react'
import './Error.css'

function Error(props){
    return (
        <div className='formContent error roundedborder'>
            {props.error}
        </div>
    )
}

export default Error