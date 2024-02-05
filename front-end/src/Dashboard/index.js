import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../Services/fetchServices';
import { Button, Card} from 'react-bootstrap';

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
                  <Card.Title>Assignment #{assignment.id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    {assignment.status}
                    </Card.Subtitle>
                  
                  <Card.Text style={{ marginTop: "1em"}}>
                    <p>
                      <b>GitHub URL: </b>{assignment.githubUrl} 
                      </p>
                    <p>
                      <b>Branch: {assignment.branch} </b>
                      </p>
                  </Card.Text>
          
                      <Button onClick={() => {window.location.href= `/assignments/${assignment.id}`;
                      }}>Edit
                      </Button>
                   </Card.Body>
                 </Card>
               
                  ))}
            </div>
        ) : (
        <></>
        )}
            <Button onClick={() => createAssignment()}>Submit New Assignment</Button>
        </div>
       
    );

};
export default Dashboard;