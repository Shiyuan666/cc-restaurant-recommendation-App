import React from 'react'
import ReactDOM from 'react-dom';
import './Dialog.css'

function Dialog(props){
    let style = {
        display: (props.show)? "inherit" : "none"
    }

    function closeDialog(e){
        console.log('clicked!')
        if(e.target===e.currentTarget) props.toggleShow(false);
    }

    const dialog =  (
        <div className='Dialog' style={style}>
            <div className='DialogCover' onClick={closeDialog}></div>
            {props.children}
        </div>
    )

    return  (
        ReactDOM.createPortal(dialog, document.body)
    )
}


export default Dialog