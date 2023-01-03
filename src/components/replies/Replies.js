
import classes from "./Replies.module.css"

import CommentItem from "../comments/CommentItem/CommentItem";


const Replies = props => {

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
        />
    ))


    return (<div className={classes.replies}>
        {repliesElts}
    </div>)

}

export default Replies;