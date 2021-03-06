import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Left, Body, Thumbnail,Text } from 'native-base';
import { ICommentData } from '../../definitions/query-definitions';
const placeholder = require("../../../assets/avatar_placeholder.png");

const CommentView = ({comment}) => {
    if(!comment.data){
        comment.data = {
            body: "comment text",
            author:{
                displayPicture:"",
                firstName:"user",
                lastNAme:"name"
            },
            createdAt: new Date().toISOString()

        }
    }
    const {body,author,createdAt}:ICommentData= comment?.data;
    const date = createdAt?.split('T');
    return (
        comment.data  &&
        <Card transparent>
            <CardItem header>
                <Left>
                <Thumbnail small source={author?.displayPicture||placeholder} />
					<Body>
						<Text> {author?.firstName +' '+ author?.lastName} </Text>
						<Text note>{date[0]+' '+date[1].substring(0,5)}</Text>
					</Body>
                </Left>
            </CardItem>
            <CardItem>
                <Text>{body || "Comment text shows up here"}</Text>
            </CardItem>
        </Card>
    )
}

export default CommentView

const styles = StyleSheet.create({})
