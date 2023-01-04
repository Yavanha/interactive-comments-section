
import classes from "./Replies.module.css"

import CommentItem from "../comments/CommentItem/CommentItem";
import { forwardRef } from "react";




const Replies = forwardRef(( props, ref) => {
    const repliesElts = props.replies.map(reply => (
        <CommentItem
            key={`reply_${reply.id}`}
            parent={props.parent}
            id={reply.id}
            author={reply.author}
            content={reply.content}
            user={reply.user}
            score={reply.score}
            createdAt={reply.createdAt}
            currentUser={props.currentUser}
            replyingTo={reply.replyingTo}
            onDelete={props.onDelete}
            onSubmitReply={props.onSubmitReply}

        />
    ))


    return (<div ref={ref} className={props.replies.length > 0 ? classes.replies : ''}>
        {repliesElts}
    </div>)

})

export default Replies;