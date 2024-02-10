import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Comment from '../Comment';
import ajax from '../Services/fetchServices';
import { useUser } from '../UserProvider';
import { useInterval } from '../util/useInterval';
import dayjs from 'dayjs';

const CommentContainer = (props) => {
    const {assignmentId} = props;
    const user = useUser();
    
    const emptyComment = {
        id: null,
        text: "",
        assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
        user: user.jwt,
        createdDate: null,
    }
    const [comment, setComment] = useState(emptyComment);
    const [comments, setComments] = useState([]);
    
    useInterval(() => {
        updateCommentTimeDisplay();
     }, 1000 * 5);
     function updateCommentTimeDisplay() {
         const commentsCopy = [...comments];
         commentsCopy.forEach(comment => comment.createdDate = dayjs(comment.createdDate));
         setComments(commentsCopy);
     }
     


 function handleEditComment(commentId) {
     const i = comments.findIndex((comment) => comment.id === commentId);
     console.log("Editing comment", comments[i]);
     const commentCopy = {
         id: comments[i].id,
         text: comments[i].text,
         assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
         user: user.jwt,
         createdDate: comments[i].createdDate,
     };
     setComment(commentCopy)
 }

 function handleDeleteComment (commentId){
     // TODO: send DELETE request to server
     ajax(`/api/comments/${commentId}`, "delete", user.jwt).then((msg) => {
         const commentsCopy = [ ...comments ];
         const i = commentsCopy.findIndex((comment) => comment.id === commentId);
         commentsCopy.splice(i, 1);
         setComments(commentsCopy);
     });
 }

    useEffect(() => {
        ajax(
            `/api/comments?assignmentId=${assignmentId}`, 
            "get", 
            user.jwt, 
            null
            ).then((commentData) => {
            setComments(commentData);
        });
    }, []);

    function updateComment(value){
        const commentCopy = { ...comment };
        commentCopy.text = value;
        setComment(commentCopy);
    }

    function submitComment(){
        if(comment.id){
        ajax(`/api/comments/${comment.id}`, "put", user.jwt, comment).then(dt => {
            const commentsCopy = [ ...comments ]
            const i = commentsCopy.findIndex(comment => comment.id === dt.id);
            commentsCopy[i] = dt;
            setComments(commentsCopy);
            setComment(emptyComment);
        })
        }else {
        ajax("/api/comments", "post", user.jwt, comment).then((dt) => {
            const commentsCopy = [ ...comments ]
            commentsCopy.push(dt);
            console.log("Creating a comment:", dt);
            setComments(commentsCopy);
            setComment(emptyComment);
            
        })
    }
}



    return (
        <>
        <div className="mt-5">
        <textarea 
        style={{ width: "100%", borderRadius: "0.5em" }}
        onChange={(e) => updateComment(e.target.value)}
        value={comment.text}>
        </textarea>
        
        <Button 
        size="sm"
        onClick={() => submitComment()}>Post Comment</Button>
    </div>
    <div className="mt-5 mb-5">
        {comments.map(comment => (
        <Comment 
        key={comment.id}
        commentData={comment}
        emitDeleteComment={handleDeleteComment}
        emitEditComment={handleEditComment}
        />
        ))}
    </div>
    
    </>
    );
};

export default CommentContainer;