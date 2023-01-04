import React from "react"


const CommentsContext = React.createContext({
    currentUser : undefined,
    comments :[],
    addComment: (comment) => {},
    removeComment: () => {},
    saveBackup : (backup) => {},
    resetBackup : () => {},
    changeScore : (data) => {},
    editComment : (data) => {},
    replyComment : (reply) => {},
})

export default CommentsContext