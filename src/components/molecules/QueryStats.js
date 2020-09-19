import React from 'react'
import {VotesAtom} from '../atoms';
import {CommentsAtom} from '../atoms';
import {ViewsAtom} from '../atoms';
import { Grid, Col, Row } from 'react-native-easy-grid'
import {Container, Content} from 'native-base'

export default function QueryStats({stats}) {
    console.log(`stats: votes: ${stats.votes}\t comments: ${stats.comments} \t views: ${stats.views}`)
    return (
        <Grid >
            <Row style = {{alignItems: 'center'}}>
            
                <VotesAtom voteCount = {stats.votes}/>
            
                <CommentsAtom commentCount = {stats.comments}/>
            
                <ViewsAtom views = {stats.views}/>
            
            </Row>
        </Grid>
    )
}
