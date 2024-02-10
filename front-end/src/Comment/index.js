import React, { useState, useEffect } from 'react';
import { useUser } from '../UserProvider';
import { jwtDecode as jwt_decode } from "jwt-decode"; 
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";


const Comment = (props) => {
    const user = useUser();
    const decodedJwt = jwt_decode(user.jwt);
    const {id, createdDate, creator, text} = props.commentData;
    const { emitEditComment, emitDeleteComment } = props; 
    const [commentTime, setCommentTime ] = useState(""); 

    useEffect(() => {
        updateCommentTime();
    }, [createdDate]);


    function updateCommentTime(){
        if(createdDate){
            dayjs.extend(relativeTime);
            console.log("CreatedDate is:", createdDate);
            console.log("Date Converted to dayjs obj", dayjs(createdDate));
            setCommentTime(dayjs(createdDate).fromNow());
            
            }
    }
   
    return (
    <>
        <div className="comment-bubble">
                <div className="d-flex gap-4" style={{ fontWeight: "bold" }}>
                    <div>{`${creator.name}`}</div>
                    {
                        decodedJwt.sub === creator.username ? (
                            <>
                        <div 
                        onClick={() => {emitEditComment(id)}}  
                        style={{ cursor: "pointer", color:"darkblue"}}
                        >
                        edit
                    </div>
                    <div 
                        onClick={() => {emitDeleteComment(id)}} 
                        style={{ cursor: "pointer", color: "darkkhaki" }}
                        >
                        delete
                    </div>  
                    </> 
                    ) : (
                        <></>
                        )}
                    </div>
                <div>{text}</div>
            </div>
            
            <div style={{ marginTop: "-1em", marginLeft: "1.4em", fontSize:"15px"}}>
            {commentTime ? `Posted ${commentTime}` : ""}
            </div>
            </> 
    );
};

export default Comment;