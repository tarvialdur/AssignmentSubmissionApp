import React, { useState, useEffect } from 'react';
import { useUser } from '../UserProvider';
import { jwtDecode as jwt_decode } from "jwt-decode"; 
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

const Comment = (props) => {

    const user = useUser();
    const decodedJwt = jwt_decode(user.jwt)
     
    const { 
        createdDate, 
        id, 
        creator, 
        emitEditComment, 
        text, 
        emitDeleteComment 
    } = props; 
    
    const [commentTime, setCommentTime ] = useState(""); 

    useEffect(() => {
        updateCommentTime();
    }, (createdDate));

    function updateCommentTime(){
        if(createdDate){
            dayjs.extend(relativeTime);
            setCommentTime(dayjs(createdDate).fromNow());
            }
    }

    setInterval(() => {
        updateCommentTime();
    }, 1000*61)
   
    console.log("decodedJWT", decodedJwt);
    console.log("creator", creator);


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
                        style={{ cursor: "pointer", color:"darkblue"}}
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