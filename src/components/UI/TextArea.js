
import React from 'react';

import classes from './TextArea.module.css'


const TextArea = React.forwardRef((props, ref) => {


    return (
        <textarea  ref={ref} className={`${classes.textarea} ${props.className}`} rows={props.rows} placeholder={props.placeholder} defaultValue={props.defaultValue}>

        </textarea>
    )
})

export default TextArea;