import React from 'react';
import { useUser } from '../UserProvider';
import { jwtDecode as jwt_decode } from "jwt-decode"; 

const Comment = (props) => {

    const user = useUser();
    const decodedJwt = jwt_decode(user.jwt)
     
    const { createdDate, id, creator, emitEditComment, text, emitDeleteComment } = props; 
    
    console.log("decodedJWT", decodedJwt);
    console.log("creator", creator);
    return (
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
    );
};

export default Comment;