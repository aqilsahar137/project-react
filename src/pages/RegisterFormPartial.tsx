import 'bootstrap/dist/css/bootstrap.css';
import { useState, useRef, useEffect } from "react";
import {Form, Button, Modal} from 'react-bootstrap';
import './form.css';

//All codes and segala titik peluh by Aqil and some YouTube references.

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//Email accepts range of a-z,A-Z,0-9 @ a-z,A-Z.0-9 . a-zA-Z(2 to 4 characters)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//Password requires combination of a-z, A-Z, 0-9 and !@#$% and must be from 8 characters to 24 characters
const PROFILENAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//Profile Name accepts range of a-z,A-Z,0-9,_ of range 2-24

const RegisterFormPartial = () =>
{
    //useRef section
    const userRef:any = useRef(); //use :any in declaration to declare as any
    const errRef:any = useRef(); //again rinse and repeat, Aqil. TypeScript can be quite a doodoo.
    //end useRef section

    //useState section
    const [email,setEmail] = useState(''); //sets state for email
    const [validEmail,setValidEmail] = useState(false); //sets state for validEmail
    const [emailFocus,setEmailFocus] = useState(false); //sets state for emailFocus
    
    const [password,setPassword] = useState(''); //You know the drill.....................................
    const [validPassword,setValidPassword] = useState(false);
    const [passwordFocus,setPasswordFocus] = useState(false);

    const [matchPassword,setMatchPassword] = useState('');
    const [validMatchPassword,setValidMatchPassword] = useState(false);
    const [focusMatchPassword,setFocusMatchPassword] = useState(false);

    const [profileName,setProfileName] = useState('');
    const [validProfileName,setValidProfileName] = useState(false);
    const [profileNameFocus,setProfileNameFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState(false);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false); //some set states for modals
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    //End useState section

    //useEffect for focus
    useEffect(() =>{
            const node1 = userRef.current as any; // assigns node with profileNameRef as any
            node1.focus();
        }, [])

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

        const match = password === matchPassword; //checks for if password and matchPassword are equal. Boolean will be stored in 'match'
        setValidMatchPassword(match); //sets setValidMatchPassword with match of Boolean type

    }, [password, matchPassword])

    //useEffect for profile name validation
    useEffect( () => {
        const result = PROFILENAME_REGEX.test(profileName);
        console.log(result);
        console.log(profileName);
        setValidProfileName(result);
    }, [profileName])

    //useEffect for error message
    useEffect( () => {
        setErrMsg('');
    }, [email, password, matchPassword, profileName]) //when the user changes any of the values in the DEPENDENCY ARRAY, it will clear out the errMsg
    
    //function to handle submission
    const submissionHandler = (e : any) =>
    {
        setShowConfirmationModal(false);
        e.preventDefault();
        const _email = EMAIL_REGEX.test(email);
        const _password = PASSWORD_REGEX.test(password);
        const _profile = PROFILENAME_REGEX.test(profileName);
        if ( !_email || !_password || !_profile ){
            setErrMsg("Invalid entry. Please try again.");
            setShowFailModal(true);
            return;
        }
        console.log(email, password, profileName);
        setSuccessMsg(true);
        setShowSuccessModal(true);
    }

    return(
        <>
            {
                successMsg ? (
                    
                    <Modal show={showSuccessModal}>
                        <Modal.Header closeButton onClick={() => setShowSuccessModal(false)}>
                            <Modal.Title>Registration Complete!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-center">You may close this modal.</p>
                        </Modal.Body>
                        <Modal.Footer className="text-center d-inline">
                            <Button className="custom-button float-left" style={{backgroundColor: '#ffffff'}} onClick={() => setShowSuccessModal(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                ) :
                (
                    <Modal show={showFailModal}>
                        <Modal.Header closeButton onClick={() => setShowFailModal(false)}>
                            <Modal.Title>Registration Failed!</Modal.Title>
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
        
        <Form>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen" /* if error message exists, apply class errmsg. otherwise, offscreen */}></p>

            <Form.Group className="custom-form mt-3">
                <Form.Label>
                    What's your e-mail address?
                </Form.Label>
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
                <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen" }>
                    Email must be of this format: name@domain
                </p>
            </Form.Group>

            <Form.Group className="custom-form mt-3">
                <Form.Label>What's your password?</Form.Label>
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
                <p id="password-note" className={ passwordFocus && password && !validPassword ? "instructions" : "offscreen" }>
                    - 8 - 24 characters <br/>
                    - Must be a combination of a-z, A-Z, 0-9 and special characters
                </p>
            </Form.Group>

            <Form.Group className="custom-form mt-3">
                <Form.Label>Confirm your password</Form.Label>
                <Form.Control
                    ref={userRef} 
                    value={matchPassword} 
                    onChange={(e) => setMatchPassword(e.target.value)}
                    aria-invalid={validMatchPassword ? "false" : "true"}
                    aria-describedby='matchpasswordnote' 
                    placeholder="Confirm Password" 
                    type="password" 
                    name="Password"
                    required
                    onFocus={() => setFocusMatchPassword(true)}
                    onBlur={() => setFocusMatchPassword(false)}>
                </Form.Control>
                <p id="matchpasswordnote" className={ focusMatchPassword && matchPassword && !validMatchPassword ? "instructions" : "offscreen" }>
                    - Password does not match
                </p>
            </Form.Group>

            <Form.Group className="custom-form mt-3">
                <Form.Label>
                    Give your account a Profile Name!
                </Form.Label>
                <Form.Control 
                    ref={userRef}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value) }
                    aria-invalid={validProfileName ? "false" : "true"}
                    aria-describedby='profilenamenote'
                    placeholder="Profile Name (no spaces)"
                    type='text'
                    name="profilename"
                    required
                    onFocus={() => setProfileNameFocus(true)}
                    onBlur={() => setProfileNameFocus(false)}
                    >
                </Form.Control>
                <p id="profilenamenote" className={profileNameFocus && profileName && !validProfileName ? "instructions" : "offscreen"}>
                    - Acceptable character range: 4- 24<br/>
                    - Profile name must only be made up of alphanumeric characters and without space.
                </p>
            </Form.Group>

            <Button 
                onClick={() => setShowConfirmationModal(true)}
                className="custom-button mt-3"
                disabled={validEmail && validPassword && validMatchPassword && validProfileName ? false : true /** Button will only be enabled once all conditions are met*/}>
                    Sign Up
            </Button>
            <hr></hr>    
            <p>Have an account? <a href="/project-react">Sign In Now!</a></p>

            <Modal show={showConfirmationModal}>
                <Form onSubmit={submissionHandler}>
                    <Modal.Header closeButton onClick={() => setShowConfirmationModal(false)}>
                        <Modal.Title>You entered the following:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-center"><strong>E-mail:</strong> {email}</p>
                        <p className="text-center"><strong>Profile Name:</strong> {profileName}</p>
                    </Modal.Body>
                    <Modal.Footer className="text-center d-block">
                        <Button className="custom-button secondary float-left" style={{backgroundColor: '#ffffff'}} onClick={() => setShowConfirmationModal(false)}>Close</Button>
                        <Button type="submit" value="submit" className="custom-button float-right">Confirm</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Form>

    </>
    )
}

export default RegisterFormPartial;