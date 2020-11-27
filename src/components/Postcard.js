import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import moment from 'moment'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import { AuthContext } from '../context/auth'
import MyPopup from '../utils/MyPopup';

function Postcard({post : {body, createdAt, id, username, likeCount, commentCount, likes}}) {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                style={{
                    borderRadius: '50%'
                }}
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}> {moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description className="card-description">
                {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likes, likeCount}}/>
                <MyPopup content="Comment on post">
                    <Button labelPosition='right' as={Link} to={`/post/${id}`}>
                        <Button color='purple' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='purple' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                { user && user.username === username && 
                    <DeleteButton postId={id}/>
                }
            </Card.Content>
        </Card>
    )
}

export default Postcard
