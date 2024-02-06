import React, { useEffect, useState,useRef } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../Services/fetchServices';
import { Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import Dashboard from '../Dashboard';



const CodeReviewAssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        branch: "",
        githubUrl: "",
        number: null,
        status: null,

    });

    const[assignmentEnums, setAssignmentEnums] = useState([]);
    const[assignmentStatuses, setAssignmentStatuses] = useState([]);
    
    const prevAssignmentValue = useRef(assignment);
    

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
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
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
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
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
                <Badge pill bg="info" style={{fontSize: "1em" }}>
                    {assignment.status}
                </Badge> 
            </Col>
        </Row>
            {assignment ? (
            <>
            
    <Form.Group as={Row} className="my-3" controlId="githubUrl">
        <Form.Label column sm="3" md="2">
            GitHub URL:
        </Form.Label>
        <Col sm="9" md="8" lg="6">
          <Form.Control 
            onChange={(e) => updateAssignment("githubUrl", e.target.value)}
            type="url"
            readOnly
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
            readOnly
            placeholder="example_branch_name"
            onChange={(e) => updateAssignment("branch", e.target.value)}
            value={assignment.branch}
            />
        </Col>
    </Form.Group>

    <Form.Group as={Row} className="my-3" controlId="githubUrl">
        <Form.Label column sm="3" md="2">
            Video Review URL:
        </Form.Label>
        <Col sm="9" md="8" lg="6">
          <Form.Control 
            onChange={(e) => updateAssignment("codeReviewVideoUrl", e.target.value)}
            type="url"
            
            value={assignment.codeReviewVideoUrl}
            placeholder="code review url" 
            />
        </Col>
    </Form.Group>


<div className="d-flex gap-5">
    {assignment.status === "Completed" ? (
     <Button 
        size="lg" 
        variant="secondary"
        onClick={() => save(assignmentStatuses[2].status)}
    >
      Re-Claim
    </Button> 
    ) : ( 
    <Button 
        size="lg" 
        onClick={() => save(assignmentStatuses[4].status)}
    >
      Complete Review
    </Button> 
    )}
    
    {assignment.status === "Needs Update" ? (
    <Button 
        size="lg" 
        variant="secondary" 
        onClick={() => save(assignmentStatuses[2].status)}
    >
      Re-Claim
    </Button>
    ) : (
    <Button 
    size="lg" 
    variant="danger" 
    onClick={() => save(assignmentStatuses[3].status)}>
        Reject Assignment
    </Button>
    )}

    <Button
    size="lg"
    variant="secondary"
    onClick={() =>  window.location.href = `/dashboard`}
    >
        Back
    </Button>

    </div>
    
            </>
            ) : ( 
            <></>
            )}
        </Container>
    );
};

export default CodeReviewAssignmentView;