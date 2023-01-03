import './App.css';

import React, { useContext, useState} from 'react';

import Comments from "./components/comments/Comments"
import Warning from './components/UI/Warning';
import CommentsContext from './store/comments-store';




function App() {

  const [isWarning, setIsWarning] = useState(false)
  const commentsCtx = useContext(CommentsContext)

  const showWarningHandler = () => {
      setIsWarning(true);
  }

  const hideWarningHandler = () => {
    commentsCtx.resetBackup()
    setIsWarning(false)
  }

  const confirmHandler = () => {
    setIsWarning(false)
    commentsCtx.removeComment()
  }

  return (
    <main className="main-container">
      { isWarning &&  <Warning 
                        onClose={hideWarningHandler} 
                        onConfirm={confirmHandler}
                        title='Delete comment'
                        message="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
                        closeText="No, Cancel"
                        confirmText="Yes, delete"/>}
        <Comments onDelete={showWarningHandler} />
    </main>
  );
}

export default App;
