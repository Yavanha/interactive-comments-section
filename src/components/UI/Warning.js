import Modal from "./Modal"

import classes from "./Warning.module.css"

const Warning = props => {


    return (<Modal onClose={props.onClose}>
        <h3 className={classes.title}>{props.title}</h3>
        <p className={classes.message}>{props.message}</p>
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes.cancel}>{props.closeText}</button>
            <button onClick={props.onConfirm} className={classes.confirm}>{props.confirmText}</button>
        </div>
    </Modal>)
}
export default Warning