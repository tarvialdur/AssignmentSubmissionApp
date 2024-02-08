import React, { useEffect, useState,useRef } from 'react';
import ajax from '../Services/fetchServices';
import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '../StatusBadge';
import { useUser } from '../UserProvider';



const AssignmentView = () => {
    let navigate = useNavigate();
    const user = useUser();
    const { assignmentId } = useParams();
    console.log("assignmentId", assignmentId);
    //const assignmentId = window.location.href.split("/assignments/")[1];
    const[assignment, setAssignment] = useState({
        branch: "",
        githubUrl: "",
        number: null,
        status: null,

    });

    const[assignmentEnums, setAssignmentEnums] = useState([]);
    const[assignmentStatuses, setAssignmentStatuses] = useState([]);
    const[comment, setComment] = useState({
        text: "",
        assignment: assignmentId != null ? parseInt(assignmentId) : null,
        user: user.jwt,

    });

    const prevAssignmentValue = useRef(assignment);
    

    function submitComment(){
        ajax("/api/comments/", "post", user.jwt, comment).then((comment) => {
            console.log(comment);
        })
    }

    useEffect(() => {
        console.log(comment);
    }, [comment]);

    function updateComment(value){
        const commentCopy = { ...comment };
        commentCopy.text = value;
        setComment(commentCopy);
    }

    function updateAssignment(prop, value) {
        const newAssignment = { ...assignment };
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }


    function save(status) {
        //this implies that assignment is submitted for the first time
        if(status && assignment.status !== status) {
            updateAssignment("status", status);
        }else{
          persist();
        }
    }

    function persist(){
        ajax(`/api/assignments/${assignmentId}`, "PUT", user.jwt, assignment).then(
            (assignmentData) => {
            setAssignment(assignmentData);
        }  
    );
}


useEffect(() => {
    console.log("Previous value of assgnment", prevAssignmentValue.current);
    if(prevAssignmentValue.current.status !== assignment.status){
        persist();
    }
    prevAssignmentValue.current = assignment;
    console.log("New value of assignment", assignment);
}, [assignment]);


    
useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", user.jwt).then(
        (assignmentResponse) => {
            let assignmentData = assignmentResponse.assignment;
            if (assignmentData.branch === null) assignmentData.branch = "";
            if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
            setAssignment(assignmentData);
            setAssignmentEnums(assignmentResponse.assignmentEnums);
            setAssignmentStatuses(assignmentResponse.statusEnums);
        }
    );
}, []); 

    return (
        <Container className="mt-5">
        <Row className="d-flex align-items-center">
            <Col>
            {assignment.number ? <h1>Assignment {assignment.number}</h1> : <></>}
            </Col>
            <Col>
            <StatusBadge text={assignment.status} />
            </Col>
        </Row>
            {assignment ? (
            <>
            <Form.Group as={Row} className="my-3" controlId="assignmentName">
        <Form.Label column sm="3" md="2">
            Assignment Number: 
        </Form.Label>
        <Col sm="9" md="8" lg="6">
        <DropdownButton
            as={ButtonGroup}
            variant={"info"}
            title={
                assignment.number 
                ? `Assignment ${assignment.number}` 
                : "Select an assignment"
            }
            onSelect={(selectedElement) => {
                updateAssignment("number", selectedElement);
            }}
        >
            {assignmentEnums.map((assignmentEnum) => (
            <Dropdown.Item eventKey={assignmentEnum.assignmentNumber}>
                {assignmentEnum.assignmentNumber}
                </Dropdown.Item> 
                ))}
          </DropdownButton>
        </Col>
    </Form.Group>

    <Form.Group as={Row} className="my-3" controlId="githubUrl">
        <Form.Label column sm="3" md="2">
            GitHub URL:
        </Form.Label>
        <Col sm="9" md="8" lg="6">
          <Form.Control 
            onChange={(e) => updateAssignment("githubUrl", e.target.value)}
            type="url"
            value={assignment.githubUrl}
            placeholder="https://github.com/username/repo-name" 
            />
        </Col>
    </Form.Group>
 
    <Form.Group as={Row} className="mb-3" controlId="branch">
        <Form.Label column sm="3" md="2">
            Branch:
        </Form.Label>
        <Col sm="9" md="8" lg="6">
          <Form.Control 
            type="text"
            placeholder="example_branch_name"
            onChange={(e) => updateAssignment("branch", e.target.value)}
            value={assignment.branch}
            />
        </Col>
    </Form.Group>

    {assignment.status === "Completed" || assignment.status === "Needs Update" || assignment.status === "Resubmitted" ? ( 
        <>
        <div>
        <Form.Group as={Row} className="d-flex align-items-center mb-3" controlId="codeReviewVideoUrl">
        <Form.Label column sm="3" md="2">
            Code Review Video Url:
        </Form.Label>
        <Col sm="9" md="8" lg="6">
          <a 
          href={assignment.codeReviewVideoUrl} 
          style={{ fontWeight: "bold" }}
          >
            {assignment.codeReviewVideoUrl}
            </a>
        </Col>
    </Form.Group>
        </div>
        <div className="d-flex gap-5">
        <Button 
        size="lg" 
        variant="secondary" 
        onClick={() => navigate("/dashboard")}
        >
            Back
        </Button>
        </div> 
        </>
    ) : assignment.status === "Pending Submission" ? ( 
    <div className="d-flex gap-5">
    <Button size="lg" onClick={() =>  save("Submitted")}>
        Submit assignment
    </Button>
    <Button 
    size="lg" 
    variant="secondary" 
    onClick={() => navigate("/dashboard")}>
        Back
    </Button>
    </div>
    ) : ( 
    <div className="d-flex gap-5">
    <Button size="lg" onClick={() =>  save("Resubmitted")}>
        Resubmit assignment
    </Button>
    <Button 
    size="lg" 
    variant="secondary" 
    onClick={() => navigate("/dashboard")}>
        Back
    </Button>
    </div>
    )}

    <div className="mt-5">
        <textarea 
        style={{ width: "100%", borderRadius: "0.5em" }}
        onChange={(e) => updateComment(e.target.value)}>
        </textarea>
        
        <Button 
        size="sm"
        onClick={() => submitComment()}
        >
            Post Comment
        </Button>
    </div>
            </>
            ) : ( 
            <></>
            )}
        </Container>
    );
};

export default AssignmentView;