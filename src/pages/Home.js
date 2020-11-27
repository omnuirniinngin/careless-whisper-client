import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
import { Grid, Transition, Loader } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import Postcard from '../components/Postcard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql'

function Home() {
    const {user} = useContext(AuthContext);
    const { loading, data: { getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={1}>
            <Grid.Row className="page-title">
                <h1>Recent whispers</h1>
            </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {
                    loading ? (
                        <Loader active/>
                    ) : (
                        <Transition.Group>
                            {
                                posts && posts.map((post) => (
                                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                        <Postcard post={post}/>
                                    </Grid.Column>
                                ))
                            }
                        </Transition.Group>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}

export default Home
