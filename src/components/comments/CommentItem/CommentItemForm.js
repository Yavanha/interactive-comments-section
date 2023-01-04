import classes from "./CommentItemForm.module.css"

import Card from "../../UI/Card"
import TextArea from "../../UI/TextArea"
import Avatar from "../../UI/Avatar"
import { useContext, useRef } from "react"
import CommentsContext from "../../../store/comments-store"


const CommentItemForm = props => {

    const msgInputRef = useRef()

  

    const sendCommentHandler = (event) => {
        event.preventDefault()
        const value = msgInputRef.current.value.trim()
        if (value.length > 0) {

         
            const data = {
                id: (Math.random() + 'c1'),
                content: value,
                createdAt: "1 min ago",
                score: 0,
                user: {
                    image: { ...props.currentUser.image },
                    username: props.currentUser.username
                }, 
            }
            props.onSubmit(data)
            msgInputRef.current.value = ""
        }
    }

        return (
            <Card className={classes['container-form']}>
                <form onSubmit={sendCommentHandler} className={classes.form}>
                    <TextArea ref={msgInputRef} className={classes.textarea} placeholder="Add a commment..." rows={props.rows} />
                    <div className={classes.footer}>
                        <Avatar className={classes['avatar-form']} src={props.currentUser.image.webp} alt="Avatar of the current user" />
                        <TextArea ref={msgInputRef} className={classes.textarea} defaultValue={props.defaultValue} placeholder="Add a commment..." rows={props.rows} />
                        <button className={classes.send} type="submit" >send</button>
                    </div>
                </form>
            </Card>

        )
    }

    export default CommentItemForm