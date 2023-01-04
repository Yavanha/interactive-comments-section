import { Fragment, useContext, useState, useRef } from 'react';

import classes from './CommentItem.module.css'

import CommentsContext from '../../../store/comments-store';

import Card from "../../UI/Card";
import Avatar from '../../UI/Avatar';
import ReplyIcon from '../../UI/Icon/ReplyIcon';
import DeleteIcon from '../../UI/Icon/DeleteIcon';
import EditIcon from '../../UI/Icon/EditIcon';
import TextArea from '../../UI/TextArea';

import ScoreButton from './ScoreButton';
import CommentItemForm from './CommentItemForm';



const CommentItem = props => {

    let options;
    const commentsCtx = useContext(CommentsContext)
    const currentUser  = commentsCtx.currentUser;
    const isCurrentUser = currentUser.username === props.user.username
    const editMsg = useRef()

    const likedComments = props.parent ? commentsCtx.currentUser.likedReplies : commentsCtx.currentUser.likedComments

    const [editMode, setEditMode] = useState(false)
    const [replyMode, setReplyMode] = useState(false)

    const deleteCommentHandler = () => {
        const comment = {
            id : props.id,
            parent : props.parent,

        }
        commentsCtx.saveBackup(comment)

        props.onDelete()
    }

    const editCommentHandler = () => {
   
        setEditMode(true)
    }

    const confirmEditHandler = () => {
        const data = {
            id : props.id,
            parent : props.parent,
            content : editMsg.current.value
        }
        commentsCtx.editComment(data)
        setEditMode(false)        
    }

    const cancelEditHandler = () => {
        setEditMode(false)
    }
    

    const replyCommentHandler = () => {
        setReplyMode(true)
    }

    const submitReplyHandler = (data) => {
        const reply ={
            ...data,
            id : Math.random() + 'r',
            target : props.parent ? props.parent : props.id,
            replyingTo : props.user.username
        }
        commentsCtx.replyComment(reply)
        setReplyMode(false)

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
        if(editMode) {
            options = <Fragment>
                <button onClick={cancelEditHandler} className={`${classes['button-icon']} ${classes['button-icon--red']}`}><DeleteIcon />Cancel</button>
                <button onClick={confirmEditHandler} className={classes['button-icon']}><EditIcon />Confirm</button>
            </Fragment>

        } else {
            options = (<Fragment >
                <button onClick={deleteCommentHandler} className={`${classes['button-icon']} ${classes['button-icon--red']}`}><DeleteIcon />Delete</button>
                <button onClick={editCommentHandler} className={classes['button-icon']}><EditIcon />Edit</button>
            </Fragment>)
        }
      
    } else {
        options = (<div className={classes.options}>
            <button onClick={replyCommentHandler}  className={classes['button-icon']}> <ReplyIcon />Reply</button >
        </div>)
    }



    return (
        <Fragment>
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
               { !editMode &&  <p className={classes.content}>
                    {props.replyingTo && <span className={classes.replyingto}>@{props.replyingTo}</span>}
                    {props.content}
                </p>}
                {editMode && <TextArea ref={editMsg} rows="3" defaultValue={props.content}/>}
            </div>
            <div className={classes.actions}>
                <ScoreButton disabledPlus={likedComments.includes(props.id)}  score={props.score} onPlus={plusHandler} onMinus={minusHandler}/>
                <div className={classes.options}>
                    {options}
                </div>
               
            </div>

        </Card>
            {replyMode && <CommentItemForm currentUser={currentUser} onSubmit={submitReplyHandler}/>}

        </Fragment>
    
    )
}

export default CommentItem;