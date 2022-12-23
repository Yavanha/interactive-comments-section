import { Fragment } from "react";


import classes from "./Comments.module.css"

import datasJSON from "../../data/data.json"

import CommentItem from "./CommentItem/CommentItem"
import Replies from "../replies/Replies";
import CommentItemForm from "./CommentItem/CommentItemForm";

const Comments = props => {


    const comments = datasJSON.comments.map(comment =>
    (
        <Fragment key={`comment_${comment.id}`}>
            <CommentItem

                
                content={comment.content}
                user={comment.user}
                score={comment.score}
                createdAt={comment.createdAt}
            />
            {comment.replies.length > 0 && <Replies replies={comment.replies}/>}
        </Fragment>

    )

    )
    return (
        <section className={classes.comments}>
            {comments}
           <CommentItemForm  avatar={datasJSON.currentUser.image.webp} />
        </section>
    )
}

export default Comments;