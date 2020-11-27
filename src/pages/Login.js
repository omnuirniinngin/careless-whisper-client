import React, { useContext,useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: {login: userData }}){
            context.login(userData);
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback(){
        loginUser();
    }
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : ''}>
                <h1 className="page-title">Login</h1>
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
                error={errors.password ? true : false}
                fluid
                label='Password' 
                type='password'
                name="password"
                placeholder="Enter Password"
                value={values?.password}
                onChange={onChange}/>
                <Button type="submit" color="purple">
                    Login
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Login
