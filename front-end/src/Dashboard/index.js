import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../Services/fetchServices';
import { Badge, Button, Card, Col, Row} from 'react-bootstrap';

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        ajax("api/assignments", "GET", jwt).then(
            (assignmentsData) => {
                setAssignments(assignmentsData);
            });
    }, [jwt]);


    function createAssignment (){
        ajax("/api/assignments/", "POST", jwt).then(
            (assignment) => {
            window.location.href = `/assignments/${assignment.id}`;
        });
    }
    
    
    return (
        
      
        <div style={{ margin: "2em" }}>
            <Row>
                <Col>
                    {/* <div 
                    className="d-flex justify-content-end"
                    style={{ cursor: "pointer" }}
                    href="#" onClick={() =>{
                    setJwt(null); 
                    window.location.href=`/login`
                    }}>Logout
                    </div> */}
                    <Button 
                    className="d-flex justify-content-start"
                    style={{position: "fixed", top: "33px", right: "32px"}}
                    variant="dark"
                    href="#" onClick={() => {setJwt(null);
                    window.location.href=`/login`
                    }}>
                        Logout
                    </Button>
                </Col>
            </Row>

            <div className="mb-4">

          <Button size="lg" onClick={() => createAssignment()}>New Assignment</Button>

            </div>
        {assignments ? (
           <div
           className="d-grid gap-4"
           style={{ gridTemplateColumns: "repeat(auto-fill, 18rem"}}
           >
              {assignments.map((assignment) => (
                
                <Card 
                key={assignment.id} 
                style={{ width: "18rem", height: "18rem", background: "#FDF2E9"}}
                >

                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title>Assignment #{assignment.number}</Card.Title>

                <div className="d-flex align-items-start">
                  <Badge 
                    pill 
                    
                    bg={assignment.status === "Completed" ? "success" : "info"} 
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
                      onClick={() => {window.location.href= `/assignments/${assignment.id}`;
                      }}>Edit
                      </Button>
                   </Card.Body>
                 </Card>
               
                  ))}
            </div>
        ) : (
        <></>
        )}
        </div>
       
    );

};
export default Dashboard;