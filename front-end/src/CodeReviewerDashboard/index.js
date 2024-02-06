import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../Services/fetchServices';
import { Badge, Button, Card, Col, Container, Row} from 'react-bootstrap';
import { jwtDecode as jwt_decode } from "jwt-decode"; 

const CodeReviewerDashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);


    function editReview(assignment){
        window.location.href = `/assignments/${assignment.id}`;
    }


    // jwt.io
    function claimAssignment(assignment){
        const decodedJwt = jwt_decode(jwt);
        const user = {
            username: decodedJwt.sub,
            
        }
        assignment.codeReviewer = user;
        //TODO: don't hard code this status
        assignment.status = "In Review";
        ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
            (updatedAssignment) =>{
                const assignmentsCopy = [...assignments];
                const i = assignmentsCopy.findIndex(a => a.id === assignment.id);
                assignmentsCopy[i] = updatedAssignment;
                setAssignments(assignmentsCopy);



            // TODO: update the view for assignment that changedas
        })
    }



    useEffect(() => {
        ajax("api/assignments", "GET", jwt).then(
            (assignmentsData) => {
                setAssignments(assignmentsData);
                console.log(assignmentsData);
            });
    }, [jwt]);

    
    
    return (
        
        <Container>
            <Row>
                <Col>
                    {/* <div 
                    className="d-flex justify-content-end"
                    style={{ cursor: "pointer" }}
                    href="#" onClick={() =>{
                    setJwt(null); 
                    window.location.href=`/login`
                    }}>
                    Logout
                    </div> */}

                    <Button 
                    style={{position: 'fixed', top: '33px', right: '32px'}}
                    variant="dark"
                    href="#" onClick={() => {setJwt(null);
                    window.location.href=`/login`
                    }}>
                        Logout
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <div className="h1">Code Reviewer Dashboard</div>
                </Col>
            </Row>
           <div className="assignment-wrapper in-review">
           <div className="assignment-wrapper-title h3 px-2" >In Review</div>
           {assignments && assignments.filter(assignment => assignment.status === "In Review").length > 0 ? (
           <div
           className="d-grid gap-4"
           style={{ gridTemplateColumns: "repeat(auto-fit, 18rem"}}
           >
              {assignments.filter(assignment => assignment.status === "In Review")
              .map((assignment) => (  
                <Card 
                key={assignment.id} 
                style={{ width: "18rem", height: "18rem", background: "#FDF2E9"}}
                >

                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title>Assignment #{assignment.number}</Card.Title>

                <div className="d-flex align-items-start">
                  <Badge 
                    pill bg="info" 
                    style={{ 
                    fontSize: "1em", 
                }}
                >
                  {assignment.status}
                  </Badge>
                </div>
                  
                  <Card.Text style={{ marginTop: "1em"}}>
                    <p>
                      <b>GitHub URL: </b>{assignment.githubUrl} 
                      </p>
                    <p>
                      <b>Branch: {assignment.branch} </b>
                      </p>
                  </Card.Text>
          
                      <Button 
                      variant="secondary"
                      onClick={() => {editReview(assignment);
                      }}>
                        Review
                      </Button>
                   </Card.Body>
                 </Card>
               
                  ))}
            </div>
        ) : (
        <div>No assignments found!</div>
        )}

           </div>


            <div className="assignment-wrapper submitted">
                <div className="assignment-wrapper-title h3 px-2" >Waiting for Review</div>
                
        {assignments && assignments.filter(assignment => assignment.status === "Submitted")
        .length > 0 ? (
           <div
           className="d-grid gap-4"
           style={{ gridTemplateColumns: "repeat(auto-fit, 18rem"}}
           >
              {assignments.filter(assignment => assignment.status === "Submitted")
              .map((assignment) => (
                <Card 
                key={assignment.id} 
                style={{ width: "18rem", height: "18rem", background: "#FDF2E9"}}
                >

                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title>Assignment #{assignment.number}</Card.Title>

                <div className="d-flex align-items-start">
                  <Badge 
                    pill bg="info" 
                    style={{ 
                    fontSize: "1em", 
                }}
                >
                  {assignment.status}
                  </Badge>
                </div>
                  
                  <Card.Text style={{ marginTop: "1em"}}>
                    <p>
                      <b>GitHub URL: </b>{assignment.githubUrl} 
                      </p>
                    <p>
                      <b>Branch: {assignment.branch} </b>
                      </p>
                  </Card.Text>
          
                      <Button 
                      variant="secondary"
                      onClick={() => {claimAssignment(assignment);
                      }}>
                        View
                      </Button>
                   </Card.Body>
                 </Card>
               
                  ))}
            </div>
        ) : (
        <div>No assignments found!</div>
        )}

            </div>

           <div className="assignment-wrapper needs-update">
           <div className="assignment-wrapper-title h3 px-2" >Needs Update</div>
                
                {assignments && assignments.filter(assignment => assignment.status === "Needs Update").length > 0 ? (
                   <div
                   className="d-grid gap-4" 
                   style={{ gridTemplateColumns: "repeat(auto-fit, 18rem"}}
                   >
                      {assignments
                      .filter(assignment => assignment.status === "Needs Update")
                      .map((assignment) => (
                        <Card 
                        key={assignment.id} 
                        style={{ width: "18rem", height: "18rem", background: "#FDF2E9"}}
                        >
        
                        <Card.Body className="d-flex flex-column justify-content-around">
                          <Card.Title>Assignment #{assignment.number}</Card.Title>
        
                        <div className="d-flex align-items-start">
                          <Badge 
                            pill bg="info" 
                            style={{ 
                            fontSize: "1em", 
                        }}
                        >
                          {assignment.status}
                          </Badge>
                        </div>
                          
                          <Card.Text style={{ marginTop: "1em"}}>
                            <p>
                              <b>GitHub URL: </b>{assignment.githubUrl} 
                              </p>
                            <p>
                              <b>Branch: {assignment.branch} </b>
                              </p>
                          </Card.Text>
                  
                              <Button 
                              variant="secondary"
                              onClick={() => {
                                window.location.href=`/assignments/${assignment.id}`;
                              }}>Check
                              </Button>
                           </Card.Body>
                         </Card>
                       
                          ))}
                    </div>
                ) : (
                <div>No assignments found!</div>
                )}

           </div>

        </Container>
       
    );

};
export default CodeReviewerDashboard;