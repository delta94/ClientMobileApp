import React, { useEffect, useMemo, useLayoutEffect } from 'react';
import { Colors, Button } from 'react-native-paper';
import { Container } from "native-base";
import { IAppState } from '../../redux/initialState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, saveUser } from "../../redux/actions/user-action";
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import UserDetailsPreview from '../../components/molecules/UserDetailsPreview';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import UserDetailsEdit from '../../components/molecules/UserDetailsEdit';
import { Formik } from 'formik';
import * as yup from 'yup';
import reactotron from '../../../dev/ReactotronConfig';
import { IUser, User } from 'node-rest-objects/dist/data/user-management';
import { Confirmation } from '../../components/organisms';
import UserActivityNavigator from '../../navigations/UserActivityNavigator';
import UserProfileView from './UserProfileView';

interface UserDetails {
    navigation: any;
    getUserDetails: any;
    loading?: boolean | undefined;
    updateUserDetails: any;
    isVerified: boolean | undefined;
    userProfile: IUser | undefined;
    route: any;
    userId: string | undefined;
    isAnonymous: boolean;
}

function MyProfileScreen({ getUserDetails, route, userId, loading, updateUserDetails, isVerified, userProfile }: UserDetails) {

    // FIXISSUE
    useEffect(() => {
        getUserDetails()
    }, [])

    //isSelf is true
    const isSelf = true;

    let user = userProfile;//new User();

    const editProfileRef = useRef<any>();
    const snapPoints = useMemo(() => [0, '45%', '85%', '100%'], []);
    const navigation = useNavigation();

    const renderSheetHeader = () => {
        return (
            <View style={styles.sheetHeader}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                </View>
            </View>
        )
    }

    const onEdit = () => {
        if (editProfileRef.current)
            editProfileRef.current.snapTo(2);
    };

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => <Button mode="text" compact uppercase={false} onPress={() => }>Edit</Button>
    //     })
    // });

    const userEditValidationSchema = yup.object({
        firstName: yup.string().required('Firstname is required'),
        lastName: yup.string().required('Lastname is required')
    })

    const saveUserDetails = (values) => {
        reactotron.log!(`SAVING USER DETAILS`, values);
        updateUserDetails(values);
    }

    let firstName = "";
    let lastName = "";
    let displayPicture = "";

    if (user) {
        firstName = user.firstName;
        lastName = user.lastName;
        displayPicture = user.displayPicture;
    }

    reactotron.log!(`user in my profile screen: `, user && user.userId, userId);


    return (
        <Container>
            <UserProfileView userData={user!} userId={userId} isSelf={true} isVerified={isVerified || false} onEdit={onEdit} />
            {console.log(`user: `, user)}
            <BottomSheet
                ref={editProfileRef}
                snapPoints={snapPoints}
                initialSnapIndex={-1}
                backgroundComponent={() => <View style={styles.bottomSheetBack}></View>}
                handleComponent={renderSheetHeader}
            >
                <View style={{ backgroundColor: Colors.white, height: '100%' }}>
                    <Formik
                        initialValues={{ firstName, lastName, displayPicture }}
                        validationSchema={userEditValidationSchema}
                        onSubmit={(values, actions) => {
                            saveUserDetails(values);
                            editProfileRef.current.close();
                            actions.resetForm();
                        }}
                    >
                        {
                            (props) => (
                                <UserDetailsEdit formik={props} />
                            )
                        }
                    </Formik>
                </View>
            </BottomSheet>
        </Container>
    )

}

function mapStateToProps(state: IAppState) {
    const { userState } = state;
    const { isConfirmed, profile, userId, anonymous } = state.authState;
    return {
        loading: userState.loading,
        error: userState.error,
        errorType: userState.errorType,
        isVerified: isConfirmed,
        userProfile: profile,
        userId: userId,
        isAnonymous: anonymous
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: bindActionCreators(getUser, dispatch),
        updateUserDetails: bindActionCreators(saveUser, dispatch)
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MyProfileScreen);

const styles = StyleSheet.create({
    avatar: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {
        color: Colors.white
    },
    bottomSheetBack: {
        backgroundColor: Colors.white
    },
    sheetHeader: {
        backgroundColor: '#eeeeee',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    viewBasic: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});