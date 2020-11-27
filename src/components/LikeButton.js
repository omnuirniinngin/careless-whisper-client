import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { Button, Icon, Label } from 'semantic-ui-react'
import MyPopup from '../utils/MyPopup';

function LikeButton({
    user, post: {id, likes, likeCount}
}){
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && likes.find((like) => like.username === user.username)){
            setLiked(true)
        } else setLiked (false)
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id},
        onError(err){
            return err=null;
        }
    });

    const likeButton = user ? (
        liked ? (
            <Button color="purple">
                <Icon name="heart"/>
            </Button>
        ) : (
            <Button color="purple" basic>
                <Icon name="heart"/>
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="purple" basic>
            <Icon name="heart"/>
        </Button>
        
    );

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            <MyPopup content={liked ? 'Unlike' : 'Like'}>
            {likeButton}
            </MyPopup>
            <Label basic color='purple' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }

`



export default LikeButton
