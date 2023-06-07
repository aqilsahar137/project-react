import 'bootstrap/dist/css/bootstrap.css';
import {Container , Row, Col} from 'react-bootstrap';
import LoginFormPartial from './LoginFormPartial';   
import './form.css';
//By yours truly, Aqil. heheh
const Login = () =>
{
    return(
        <div className="main LoginBody">
            <Container>
                <Row>
                    <Col xl='12' lg='12' md='12' sm='12' xs='12'>
                        <div className='center-card rounded'>
                            <h4>Sign in to your account.</h4>
                            <hr></hr>
                            <LoginFormPartial />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;