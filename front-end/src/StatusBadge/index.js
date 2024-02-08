import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusBadge = (props) => {
    const {text} = props;
    function getColorOfBadge(){
        switch (text) {
            case "Completed":
                return "success";
            case "Needs Update":
                return "danger";
            case "Pending Submission":
                return "warning";
            case "Resubmitted":
                return "primary";
            default:
                return "info";
        }
    }
    return (
        <Badge 
                pill 
                bg={getColorOfBadge()} 
                style={{ 
                fontSize: "1em", 
                float: "right",
                }}
                >
                {text}
        </Badge>
    );
};
export default StatusBadge;