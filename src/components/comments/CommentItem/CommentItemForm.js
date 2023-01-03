import classes from "./CommentItemForm.module.css"

import Card from "../../UI/Card"
import TextArea from "../../UI/TextArea"
import Avatar from "../../UI/Avatar"
import { useContext, useRef } from "react"
import CommentsContext from "../../../store/comments-store"


const CommentItemForm = props => {

    const msgInputRef = useRef()

    const commentCtx = useContext(CommentsContext)

    const sendCommentHandler = (event) => {
        event.preventDefault()
        const value = msgInputRef.current.value.trim()
        if (value.length > 0) {
            const comment = {
                id: (Math.random() + 'c1'),
                content: value,
                createdAt: "1 min ago",
                score: 0,
                user: {
                    image: { ...props.currentUser.image },
                    username: props.currentUser.username
                }, 
                replies : []

            }
            commentCtx.addComment(comment)
            msgInputRef.current.value = ""
        }


    }

        return (
            <Card className={classes['container-form']}>
                <form onSubmit={sendCommentHandler} className={classes.form}>
                    <TextArea ref={msgInputRef} className={classes.textarea} placeholder="Add a commment..." rows="4" />
                    <div className={classes.footer}>
                        <Avatar className={classes['avatar-form']} src={props.currentUser.image.webp} alt="Avatar of the current user" />
                        <TextArea ref={msgInputRef} className={classes.textarea} defaultValue={props.defaultValue} placeholder="Add a commment..." rows="4" />
                        <button className={classes.send} type="submit" >send</button>
                    </div>
                </form>
            </Card>

        )
    }

    export default CommentItemForm