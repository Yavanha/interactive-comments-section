import classes from "./CommentItemForm.module.css"

import Card from "../../UI/Card"
import TextArea from "../../UI/TextArea"
import Avatar from "../../UI/Avatar"


const CommentItemForm = props => {


    return (
        <Card className={classes['container-form']}>
            <form className={classes.form}>
                <TextArea className={classes.textarea} placeholder="Add a commment..."/>
                <div className={classes.footer}>
                    <Avatar src={props.avatar} alt="Avatar of the current user"/>
                    <button className={classes.send} type="submit" >send</button>
                </div>
            </form>
        </Card>

    )
}

export default CommentItemForm