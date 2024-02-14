import React from 'react';
import { Button } from 'react-bootstrap';

const Homepage = () => {
    return (
    <div class="homepage">
        <h1>Assignment Submission Application</h1><br />
        <h4>Click login. Credentials are shown in the username and password placeholders</h4>
        <div class="buttonDiv">
        <Button 
        className="mt-4"
        onClick={() => window.location.href=("/login")}>
        Proceed To LOGIN Page
        </Button>
        </div>
    </div>
    
    );
    
};

export default Homepage;