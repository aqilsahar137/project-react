import 'bootstrap/dist/css/bootstrap.css';
import { useState, useRef, useEffect } from "react";
import {Form, Button, Modal} from 'react-bootstrap';
import './form.css';

//I need to keep adding watermarks. Anyways, do React developers use "partials?"

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//Email accepts range of a-z,A-Z,0-9 @ a-z,A-Z.0-9 . a-zA-Z(2 to 4 characters)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//Password requires combination of a-z, A-Z, 0-9 and !@#$% and must be from 8 characters to 24 characters

const LoginFormPartial = () =>
{
    //useRef section
    const userRef:any = useRef(); //use :any in declaration to declare as any
    const errRef:any = useRef(); //again rinse and repeat, Aqil. TypeScript can be quite a doodoo.
    //end useRef section


    const [email,setEmail] = useState(''); //sets state for email
    const [validEmail,setValidEmail] = useState(false); //sets state for validEmail
    const [emailFocus,setEmailFocus] = useState(false); //sets state for emailFocus

    const [password,setPassword] = useState(''); //You know the drill.....................................
    const [validPassword,setValidPassword] = useState(false);
    const [passwordFocus,setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);

    const submissionHandler = (e : any) =>
    {
        e.preventDefault();
        const _email = EMAIL_REGEX.test(email);
        const _password = PASSWORD_REGEX.test(password);
        if ( !_email || !_password ){
            setErrMsg("Invalid entry. Please try again.");
            setShowFailModal(true);
            return;
        }
        console.log(email, password);
        setSuccessMsg(true);
        setShowSuccessModal(true);
    }

    //useEffect for email validation
    useEffect ( () => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);

    }, [email])
    
    //useEffect for password validation
    useEffect( () => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);

    }, [password])

    return(
    <>
            {
                successMsg ? (
                    
                    <Modal show={showSuccessModal}>
                        <Modal.Header closeButton onClick={() => setShowSuccessModal(false)}>
                            <Modal.Title>Sign In Successful!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-center">You may close this modal.</p>
                        </Modal.Body>
                        <Modal.Footer className="text-center d-inline">
                            <Button className="custom-button float-left" style={{backgroundColor: '#ffffff'}} onClick={() => setShowSuccessModal(false)}>Proceed</Button>
                        </Modal.Footer>
                    </Modal>
                ) :
                (
                    <Modal show={showFailModal}>
                        <Modal.Header closeButton onClick={() => setShowFailModal(false)}>
                            <Modal.Title>Sign In Failed!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-center">{errMsg}</p>
                        </Modal.Body>
                        <Modal.Footer className="text-center d-inline">
                            <Button className="custom-button float-left" style={{backgroundColor: '#ffffff'}} onClick={() => setShowFailModal(false)}>Retry</Button>
                        </Modal.Footer>
                    </Modal>
                ) 
            }
        <Form onSubmit={submissionHandler}>

            <Form.Group className="custom-form mt-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                    ref={userRef}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby='emailnote'
                    placeholder="E-mail"
                    type='text'
                    name="email"
                    required
                    onFocus={() => setEmailFocus(true)} // when the user enters email input field
                    onBlur={() => setEmailFocus(false)} // when the user leaves email input field
                    >

                </Form.Control>
                <p id="emailnote" className={!emailFocus && !email ? "instructions" : "offscreen" }>
                    This field is required!
                </p>
            </Form.Group>

            <Form.Group className="custom-form mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    ref={userRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby='passwordnote'
                    placeholder="Password"
                    type="password"
                    name="Password"
                    required
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    >
                </Form.Control>
                <p id="password-note" className={ !passwordFocus && !password ? "instructions" : "offscreen" }>
                    This field is required!
                </p>
            </Form.Group>
                                
            <Button type="submit" className="custom-button my-3" disabled={!email || !password ? true : false}>Sign In</Button>
            <p><a href="#">Forgot your password?</a></p>
            <hr></hr>

            <p>Don't have an account? <a href="/project-react/#/register">Sign Up Now!</a></p>
        </Form>
    </>
    )
}

export default LoginFormPartial;