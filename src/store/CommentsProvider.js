

import CommentsContext from './comments-store'
import dataJSON from '../data/data.json'
import { useReducer } from 'react'


const defaultState = {
    currentUser: dataJSON.currentUser,
    comments: dataJSON.comments,
    backup: {}
}


const commentReducer = (state, action) => {
    let updatedComments;
    let updatedCurrentUser;
    if (action.type === 'ADD_COMMENT') {
        return {
            ...state,
            comments: [...state.comments, action.comment]
        }
    }

    if (action.type === 'EDIT_COMMENT') {
        updatedComments = [...state.comments]

        if(action.data.parent !== undefined) { 
            const commentIndex = updatedComments.findIndex(c => c.id === action.data.parent)
            const updatedReplies = [...updatedComments[commentIndex].replies]
            const replyIndex = updatedReplies.findIndex(c => c.id === action.data.id)
            
            updatedReplies[replyIndex] = {
                ...updatedReplies[replyIndex],
                content: action.data.content
            }

            
            updatedComments[commentIndex] = {
                ...updatedComments[commentIndex],
                replies: updatedReplies
            }
        } else {
            const commentIndex = updatedComments.findIndex(c => c.id === action.data.id)
            updatedComments[commentIndex] = {
                ...updatedComments[commentIndex],
                content: action.data.content,
            }
        }

        return {
            ...state,
            comments: updatedComments,
        }
    }



    if (action.type === 'CHANGE_SCORE') {
        updatedComments = [...state.comments]

        if (action.data.parent !== undefined) {

            const commentIndex = updatedComments.findIndex(c => c.id === action.data.parent)
            const updatedReplies = [...updatedComments[commentIndex].replies]
            const replyIndex = updatedReplies.findIndex(c => c.id === action.data.id)

            updatedReplies[replyIndex] = {
                ...updatedReplies[replyIndex],
                score: updatedReplies[replyIndex].score + action.data.value
            }

            updatedComments[commentIndex] = {
                ...updatedComments[commentIndex],
                replies: updatedReplies
            }

            if (action.data.mode === 'PLUS') {
                updatedCurrentUser = {
                    ...state.currentUser,
                    likedReplies: [...state.currentUser.likedReplies, action.data.id]
                }
            } else if (action.data.mode === 'MINUS') {
                updatedCurrentUser = {
                    ...state.currentUser,
                    likedReplies: state.currentUser.likedReplies.filter(r =>  r !== action.data.id)
                }
            }




        } else {
            const commentIndex = updatedComments.findIndex(c => c.id === action.data.id)
            updatedComments[commentIndex] = {
                ...updatedComments[commentIndex],
                score: updatedComments[commentIndex].score + action.data.value,
            }
            if (action.data.mode === 'PLUS') {
                updatedCurrentUser = {
                    ...state.currentUser,
                    likedComments: [...state.currentUser.likedComments, action.data.id]
                }
            } else if (action.data.mode === 'MINUS'){
                updatedCurrentUser = {
                    ...state.currentUser,
                    likedComments: state.currentUser.likedComments.filter(c => c !== action.data.id)
                }
            }
        }

        return {
            ...state,
            comments: updatedComments,
            currentUser: updatedCurrentUser
        }
    }


    if (action.type === 'DELETE_COMMENT') {
        if (state.backup.parent !== undefined) {
            updatedComments = [...state.comments]
            const commentIndex = updatedComments.findIndex(c => c.id === state.backup.parent)
            updatedComments[commentIndex] = {
                ...updatedComments[commentIndex],
                replies: updatedComments[commentIndex].replies.filter(r => r.id !== state.backup.id)
            }

        } else {
            updatedComments = state.comments.filter(comment => comment.id !== state.backup.id)

        }
        return {
            ...state,
            comments: updatedComments,
            backup: {}
        }

    }

    if (action.type === 'SAVE_COMMENT') {
        return {
            ...state,
            backup: { ...action.backup }
        }
    }


    if (action.type === 'RESET_COMMENT') {
        return {
            ...state,
            backup: {}
        }
    }



}


const CommnentsProvider = props => {

    const [commentsState, dispatchCommentAction] = useReducer(commentReducer, defaultState)


    const addCommentHandler = comment => {
        dispatchCommentAction({
            type: 'ADD_COMMENT',
            comment
        })
    }

    const editCommentHandler = data => {
        dispatchCommentAction({
            type: 'EDIT_COMMENT',
            data
        })

    }

    const removeCommentHandler = () => {
        dispatchCommentAction({
            type: 'DELETE_COMMENT',
        })
    }

    const saveBackupHandler = backup => {
        dispatchCommentAction({
            type: 'SAVE_COMMENT',
            backup
        })
    }

    const resetBackupHandler = () => {
        dispatchCommentAction({
            type: 'RESET_COMMENT',
            backup: {}
        })
    }

    const changeScoreHandler = (data) => {
        dispatchCommentAction({
            type: 'CHANGE_SCORE',
            data
        })

    }



    const commentsContext = {
        currentUser: commentsState.currentUser,
        comments: commentsState.comments,
        addComment: addCommentHandler,
        removeComment: removeCommentHandler,
        saveBackup: saveBackupHandler,
        resetBackup: resetBackupHandler,
        changeScore: changeScoreHandler,
        editComment : editCommentHandler
    }



    return (
        <CommentsContext.Provider value={commentsContext}>
            {props.children}
        </CommentsContext.Provider>
    )
}

export default CommnentsProvider;