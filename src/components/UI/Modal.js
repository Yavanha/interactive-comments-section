import classes from "./Modal.module.css"
import ReactDOM from "react-dom"
import { Fragment } from "react"


import Card from "./Card"



const Backdrop = props => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}></div>
    )
}

const ModalOverlay = props => {

   return ( <Card className={classes.modal}>
        {props.children}
    </Card>)
}



const container = document.getElementById('overlays')


const Modal = props => {

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, container)}
            {ReactDOM.createPortal(<ModalOverlay >{props.children}</ModalOverlay>, container)}
        </Fragment>
    )


}

export default Modal;