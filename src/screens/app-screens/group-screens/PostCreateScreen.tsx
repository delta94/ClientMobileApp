import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Container } from 'native-base';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {TextInput, Button as PaperButton, Text, Title, HelperText, Colors, Badge} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as yup from "yup";
import reactotron from '../../../../dev/ReactotronConfig';
import ImageSelectionContainer from '../../../components/organisms/ImageSelectionContainer';
import { IAppState } from '../../../redux/initialState';
import { goToQueryView } from '../../../utils/nav-utils';
import { VirtualizedContent } from '../../../components/organisms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IGroup, Post } from 'node-rest-objects/dist/data/groups';
import { createPost } from '../../../api/groups-api';

interface CResponseProps{
    route:any;
}
const CreateResponseScreen = ({route}:CResponseProps) => {

    const [loading,setLoading] = useState(false);
    let group:IGroup;
    let isUpdate = false;
    type RespFormValues = {
        title:string;
        body:string;
    }
    let responseInitialValues:RespFormValues = {
        title:"",
        body:""
    }
    const navigation = useNavigation();
    if(route && route.params && route.params.groupData){
        group = route.params.groupData;
        
    }
    
    
    const responseSchema = yup.object({
        // title: yup.string().required("A title is Required"),
        body: yup.string().required("description is required"),
        media:yup.array()
    });
    return (
        <Container>
            <KeyboardAwareScrollView>
            <Title >
                <Text>Post to:</Text>
                <Text style={styles.title}>{group?.data.title}</Text>
            </Title>
                <Formik
                        initialValues = {responseInitialValues}
                        validationSchema={responseSchema}
                        onSubmit = {(values,actions) => {
                            reactotron.log!(values);
                            setLoading(true);
                            if(group){
                                if(!isUpdate){
                                    createPost(group,values).then(() => {
                                        setLoading(false);
                                        goToQueryView(navigation);
                                    }).catch(error => {
                                        actions.setFieldError('server',"Could not create response please try again");
                                        setLoading(false);
                                    })
                                }
                                else{
                                    updateResponse(response,values).then(() => {
                                        setLoading(false);
                                        goToQueryView(navigation);
                                    }).catch(error => {
                                        actions.setFieldError('server',`Could not update response please try again`,);
                                        setLoading(false);
                                    })
                                }
                            }
                            else{
                                actions.setFieldError('server',"Unexpected error! please try again");
                                setLoading(false);
                            }
                            actions.resetForm();
                        }}
                    >
                        {(props) =>  (
                        <View style={styles.formContainer}>
                            {
                                props.errors.server && <HelperText style={{fontSize:15}} type="error" >{props.errors.server}</HelperText>
                            }
                            
                            <TextInput onChangeText={(text) => props.setFieldValue('body',text) } 
                                multiline numberOfLines={10} 
                                placeholder="enter your response here" 
                                mode="outlined"
                                style={styles.input}
                            />
                            <ImageSelectionContainer defaultValue={props.values.media} onChange={(values) => {props.setFieldValue('media',values)} }/>

                            <PaperButton disabled={props.values.title!==""} mode="contained" 
                            onPress={props.handleSubmit}style={styles.btn}
                            color={Colors.blue600} 
                            >
                                Post
                            </PaperButton>
                            
                        </View>
                        )
                         }
                </Formik>
                </KeyboardAwareScrollView>
        </Container>
    )
}

function mapStateToProps(state:IAppState){
    const { groupState } =  state;
    return {
        group:groupState.group
    }
}

function mapDispatchToProps(dispatch){
    return {
        newResponse: bindActionCreators(writeResponse,dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateResponseScreen);

const styles = StyleSheet.create({
    input:{
        backgroundColor:'rgba(245,255,240,0.4)'
    },
    btn:{
        marginHorizontal:40,
        marginTop:30
    },
    title:{
        color:'black',
        backgroundColor:"rgba(192,192,192,0.4)",
        fontSize:20,
        marginTop:15
    },
    formContainer:{
        flex:1, 
        justifyContent:"center"
    }


})
