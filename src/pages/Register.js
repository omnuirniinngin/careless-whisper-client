import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: {register: userData }}){
            context.login(userData);
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser(){
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : ''}>
                <h1 className="page-title">Register</h1>
                <Form.Input 
                error={errors.username ? true : false}
                fluid
                label='Username' 
                type="text"
                name="username"
                placeholder="ex. careless1997"
                value={values?.username}
                onChange={onChange}/>
                <Form.Input 
                error={errors.email ? true : false}
                fluid
                label='Email' 
                type="email"
                name="email"
                placeholder="ex. careless1997@email.com"
                value={values?.email}
                onChange={onChange}/>
                <Form.Input 
                error={errors.password ? true : false}
                fluid
                label='Password' 
                type='password'
                name="password"
                placeholder="Enter Password"
                value={values?.password}
                onChange={onChange}/>
                <Form.Input 
                error={errors.confirmPassword ?  true : false}
                fluid
                
                label='Confirm Password' 
                type='password'
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values?.confirmPassword}
                onChange={onChange}/>
                <Button type="submit" color="purple">
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;


export default Register
