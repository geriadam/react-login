import React from 'react';
import {
    Container
} from 'reactstrap';

import './Footer.css';

const AppFooter = props => {
    return (
        <div className="Footer mb-5">
            <Container>
                <hr/>
                <p className="lead text-muted text-center p-4">
                    Laravel    
                </p>
            </Container>
        </div>
    );
}

export default AppFooter;
