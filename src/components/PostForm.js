import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import { gql, useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

function PostForm() {
    
    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    });

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            const posts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY, data: {getPosts: posts}
            });
            values.body = '';
        },
        onError(err) {
            return err
        }
    });

    function createPostCallback(){
        createPost();
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h4>What's on your mind ?</h4>
            <Form.Field>
                <Form.Input
                    placeholder="Voice out"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={ error ? {
                        content: 'Field must not be empty',
                        pointing: 'below',
                    } : false  }
                    // error={ error ? true : false  }
                />
                <Button type="submit" color="purple">
                    Submit
                </Button>
            </Form.Field>
        </Form>
        </>
    )
}

const CREATE_POST_MUTATION  = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm
