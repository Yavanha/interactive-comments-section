import classes from './CommentItem.module.css'

import Card from "../../UI/Card";
import Avatar from '../../UI/Avatar';
import ReplyIcon from '../../UI/Icon/ReplyIcon';

import DeleteIcon from '../../UI/Icon/DeleteIcon';
import EditIcon from '../../UI/Icon/EditIcon';
import ScoreButton from './ScoreButton';
import { Fragment, useContext } from 'react';
import CommentsContext from '../../../store/comments-store';



const CommentItem = props => {

    let options;
    const commentsCtx = useContext(CommentsContext)
    const isCurrentUser = commentsCtx.currentUser.username === props.user.username

    const likedComments = props.parent ? commentsCtx.currentUser.likedReplies : commentsCtx.currentUser.likedComments

    console.log({likedComments})

    const deleteCommentHandler = () => {
        const comment = {
            id : props.id,
            parent : props.parent,

        }
        commentsCtx.saveBackup(comment)

        props.onDelete()
    } 
    
    
    const minusHandler = (e) => {
        const data = {
            id : props.id,
            parent : props.parent,
            value : -1,
            mode : 'MINUS'
        }
        commentsCtx.changeScore(data)
    }

    const plusHandler = (e) => {
        const data = {
            id : props.id,
            parent : props.parent,
            value : 1,
            mode : 'PLUS'
        }
        commentsCtx.changeScore(data)
    }   


    if (isCurrentUser) {
        options = (<Fragment >
            <button onClick={deleteCommentHandler} className={`${classes['button-icon']} ${classes['button-icon--red']}`}><DeleteIcon />Delete</button>
            <button className={classes['button-icon']}><EditIcon />Edit</button>
        </Fragment>)
    } else {
        options = (<div className={classes.options}>
            <button  className={classes['button-icon']}> <ReplyIcon />Reply</button >
        </div>)
    }



    return (
        <Card className={classes['comment-item']}>
            <div className={classes['score-desktop']}>
                <ScoreButton disabledPlus={likedComments.includes(props.id)}  score={props.score} onPlus={plusHandler} onMinus={minusHandler}/>
            </div>
            <div className={classes['comment-container']}>
                <header className={classes['comment-header']}>
                    <div className={classes['comment-info']}>
                        <Avatar  src={props.user.image.webp} alt={`The avatar of the user ${props.user.username}`} />
                        <div className={classes.username}>
                            {props.user.username}
                        </div>
                        {isCurrentUser && <div className={classes.you}>you</div>}
                        <div className={classes['created-at']}>
                            {props.createdAt}
                        </div>
                    </div>
                    <div className={`${classes.options} ${classes['options-desktop']}`}>
                        {options}
                    </div>
                </header>
                <p className={classes.content}>
                    {props.replyingTo && <span className={classes.replyingto}>@{props.replyingTo}</span>}
                    {props.content}
                </p>

            </div>
            <div className={classes.actions}>
                <ScoreButton disabledPlus={likedComments.includes(props.id)}  score={props.score} onPlus={plusHandler} onMinus={minusHandler}/>
                <div className={classes.options}>
                    {options}
                </div>
               
            </div>
        </Card>
    )
}

export default CommentItem;