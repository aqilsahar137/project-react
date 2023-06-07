import 'bootstrap/dist/css/bootstrap.css';
import {Container , Row, Col} from 'react-bootstrap';
import RegisterFormPartial from './RegisterFormPartial';   
import './form.css';

// I miss taking art commissions... 

const Register = () =>
{
    return (
        <div className="main RegisterBody">
            <Container>
                <Row>
                    <Col xl='12' lg='12' md='12' sm='12' xs='12'>
                        <div className='center-card rounded'>
                            <h4>Sign up for free!</h4>
                            <hr></hr>
                            <RegisterFormPartial />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;