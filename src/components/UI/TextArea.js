
import React from 'react';


const TextArea = React.forwardRef((props, ref) => {


    return (
        <textarea  ref={ref} className={props.className} rows={props.rows} placeholder={props.placeholder} >

        </textarea>
    )
})

export default TextArea;