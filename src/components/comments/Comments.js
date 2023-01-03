import { Fragment, useContext, useRef, useState } from "react";


import classes from "./Comments.module.css"

import datasJSON from "../../data/data.json"

import CommentItem from "./CommentItem/CommentItem"
import Replies from "../replies/Replies";
import CommentItemForm from "./CommentItem/CommentItemForm";
import CommentsContext from "../../store/comments-store";

const Comments = props => {

    const commentsCtx = useContext(CommentsContext)





    const comments = commentsCtx.comments.map(comment =>
    (
        <Fragment key={`comment_${comment.id}`}>
            <CommentItem
                id={comment.id}
                content={comment.content}
                user={comment.user}
                score={comment.score}
                createdAt={comment.createdAt}
                onDelete={props.onDelete}
            />
            {comment.replies.length > 0 &&
                <Replies onDelete={props.onDelete}
                    parent={comment.id}
                    replies={comment.replies}
                 />}
        </Fragment>

    ))



    return (
        <section className={classes.comments}>
            {comments}
            <CommentItemForm currentUser={datasJSON.currentUser} />
        </section>
    )
}

export default Comments;