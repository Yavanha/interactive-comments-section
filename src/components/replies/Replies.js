
import classes from "./Replies.module.css"

import CommentItem from "../comments/CommentItem/CommentItem";


const Replies = props => {

    const repliesElts = props.replies.map(reply => (

        <CommentItem
            key={`reply_${reply.id}`}
            content={reply.content}
            user={reply.user}
            score={reply.score}
            createdAt={reply.createdAt}
            replyingTo={reply.replyingTo}
        />
    ))


    return (<div className={classes.replies}>
        {repliesElts}
    </div>)

}

export default Replies;