import { Fragment, useContext, useEffect, useRef, useState } from "react";


import classes from "./Comments.module.css"

import datasJSON from "../../data/data.json"

import CommentItem from "./CommentItem/CommentItem"
import Replies from "../replies/Replies";
import CommentItemForm from "./CommentItem/CommentItemForm";
import CommentsContext from "../../store/comments-store";

const Comments = props => {

    const commentsCtx = useContext(CommentsContext)
    const bottomViews = useRef([])
    
    const submitCommentHandler = (data) => {

        const comment = {
            ...data,
            replies: []
        }
        commentsCtx.addComment(comment)
    }

    useEffect(() => {
        bottomViews.current = bottomViews.current.slice(0, commentsCtx.comments.length)
    }, [commentsCtx.comments])



    const submitReplyHandler = (id) => {
        const index = commentsCtx.comments.findIndex(c => c.id === id)
        if(bottomViews.current[index] && bottomViews.current[index].lastElementChild)
            bottomViews.current[index].lastElementChild.scrollIntoView({ behavior: 'smooth' })
    }


    const comments = commentsCtx.comments.map((comment, i) =>
    (
        <Fragment key={`comment_${comment.id}`}>
  

            <CommentItem
                id={comment.id}
                content={comment.content}
                user={comment.user}
                score={comment.score}
                createdAt={comment.createdAt}
                onDelete={props.onDelete}
                onSubmitReply={submitReplyHandler}
            />

            
               { comment.replies.length > 0 && <Replies onDelete={props.onDelete}
                    parent={comment.id}
                    replies={comment.replies}
                    ref={ el => bottomViews.current[i] = el}
                    onSubmitReply={submitReplyHandler}
                />}
        </Fragment>

    ))



    return (
        <section className={classes.comments}>
            {comments}
            <CommentItemForm currentUser={datasJSON.currentUser} rows="3" onSubmit={submitCommentHandler} />
        </section>
    )
}

export default Comments;