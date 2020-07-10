import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Form,
    Label,
    Input,
    FormGroup,
    Container,
    Button,
    Alert
} from 'reactstrap';

import './Register.css';
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import ErrorForm from '../../layouts/errorForm/ErrorForm';

class Register extends Component {
    state = {
        fname: '',
        lname: '',
        email: '',
        phone_number: '',
        color: '',
        password: '',
        cPassword: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        registerUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.isAuthenticated === true) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated === true) {
            this.props.history.push('/dashboard');
        }
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        console.log(error);
        if (error !== prevProps.error) {

            // Check for register errors
            if (error.id === 'REGISTER_FAIL') {
                this.setState(prevState => {
                    return {
                        msg: error.msg
                    };
                });
            } else {
                this.setState(prevState => {
                    return {
                        msg: null
                    };
                });
            }
        }
    }

    renderErrorForm(){
        if (this.props.error && this.props.error.errors !== null && this.props.error.errors !== undefined && Object.keys(this.props.error.errors).length !== 0 && this.props.error.id === 'REGISTER_FAIL' ) {
            return (
                <ErrorForm errors={this.props.error.errors} />
            )
        }
    }

    onHandleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onHandleSubmit = e => {
        e.preventDefault();

        const {
            fname,
            lname,
            email,
            phone_number,
            color,
            password,
            cPassword
        } = this.state;

        // Define the user
        const user = {
            firstName: fname,
            lastName: lname,
            email,
            phone_number,
            color,
            password,
            cPassword
        };

        // Attempt to register
        this.props.registerUser(user, this.props.history);

    }

    render() {
        return (
            <div className="Register">
                <Container>
                    <header className="page-header mb-5 ">
                        <h1 className="display-4">Sign Up</h1>
                    </header>
                    {this.state.msg !== null ? (
                        <Alert color="danger" className="">{this.state.msg}</Alert>
                    ) : null}
                    {this.renderErrorForm()}
                    <Form onSubmit={this.onHandleSubmit}>
                        <FormGroup>
                            <Label htmlFor="fname">First Name</Label>
                            <Input
                                className="form-control form-control-lg"
                                name="fname"
                                id="fname"
                                type="text"
                                placeholder="First Name" onChange={this.onHandleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lname">Last Name</Label>
                            <Input
                                className="form-control form-control-lg"
                                name="lname"
                                id="lname"
                                type="text"
                                placeholder="Last Name"
                                onChange={this.onHandleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                className="form-control form-control-lg"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={this.onHandleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input
                                className="form-control form-control-lg"
                                name="phone_number"
                                id="phone_number"
                                type="text"
                                placeholder="Phone"
                                onChange={this.onHandleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormGroup tag="fieldset">
                                <legend>Preferred Color</legend>
                                <FormGroup check>
                                    <Label check>
                                    <Input value="blue" type="radio" name="color" onChange={this.onHandleChange} />{' '}
                                    Blue
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input value="red" type="radio" name="color" onChange={this.onHandleChange} />{' '}
                                    Red
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input value="green" type="radio" name="color" onChange={this.onHandleChange} />{' '}
                                    Green
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                className="form-control form-control-lg"
                                name="password"
                                id="password"
                                type="password" placeholder="Password"
                                onChange={this.onHandleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="cPassword">Confirm Password</Label>
                            <Input
                                className="form-control form-control-lg"
                                name="cPassword"
                                id="cPassword"
                                type="password" placeholder="Confirm Password" onChange={this.onHandleChange}
                            />
                        </FormGroup>
                        <Button className="btn-register btn-lg" type="submit">Sign Up</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { registerUser, clearErrors })(Register);
