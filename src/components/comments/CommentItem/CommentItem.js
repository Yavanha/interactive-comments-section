import classes from './CommentItem.module.css'

import Card from "../../UI/Card";
import Avatar from '../../UI/Avatar';




const CommentItem = props => {

    return (
        <Card className={classes['comment-item']}>
            <header className={classes['comment-header']}>
                <Avatar src={props.user.image.webp}  alt={`The avatar of the user ${props.user.username}`}/>
               
                <div className={classes.username}>
                    {props.user.username}
                </div>
                <div className={classes['created-at']}>
                    {props.createdAt}
                </div>
            </header>
            <p className={classes.content}>
                {props.replyingTo && <span className={classes.replyingto}>@{props.replyingTo}</span>}
                {props.content}
            </p>
            <div className={classes.actions}>
                <div className={classes.buttons}>
                    <button>+</button>
                    <div className={classes.score}>{props.score}</div>
                    <button>-</button>
                </div>
              
            </div>
        </Card>
    )
}

export default CommentItem;