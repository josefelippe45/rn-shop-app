import React, { useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
//import components
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
//import actions
import * as productActions from '../../store/actions/products'
//build an action
const FORM_INPUT_UPDATE = 'UPDATE'
//build formReducer outside of the main component cause it doesn't use props. so it does not re-render every cycle.
//it's not related to react-redux
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            //copying all the key value pairs of the inputValues
            ...state.inputValues,
            //getting the inputIdentifier and dynamic set the value which defined on the dispatch is one of the inputs
            [action.input]: action.value

        };
        const updatedValidities = {
            ...state.inputValidities,
            //replace one validity for the input it get in the action, like title, imageUrl, etc...
            [action.input]: action.isValid
        };
        //manage the form validity
        let updatedFormIsValid = true;
        //loop through all the updatedValidities
        for (const key in updatedValidities) {
            //if every of them is true then the form is valid. if one of them is false then the hole form isn't valid
            //false overwrite trues
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        //return a new state
        return {
            formIsValid: updatedFormIsValid,
            //overwrite the input values with the updated ones do the same for validities
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    //if it doesn't make to the if block
    return state;
}

const EditProductScreen = props => {

    //when in edit mode
    const prodId = props.navigation.getParam('productId');
    /**first we get to the slice and then the userProducts array there
     * then we run the method find to match the userProduct with the
     * prodId we're getting through getParam('productId').
    */
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();
    //setting the form state
    //destructuring the useReducer with an array
    //formState updates whenever the text change
    const [formState, dispatchFormState] = useReducer(formReducer,
        /**initial state*/{
            inputValues: {
                //checking if there are previous values of the states
                title: editedProduct ? editedProduct.title : '',
                imageUrl: editedProduct ? editedProduct.imageUrl : '',
                description: editedProduct ? editedProduct.description : '',
                price: ''
            },
            inputValidities: {
                //checking if there are previous values of the states
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                description: editedProduct ? true : false,
                price: editedProduct ? true : false,
            },
            formIsValid: editedProduct ? true : false,
        });
    //submitting and communicate with the header buttons
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            //add validate.js third-part library later!
            Alert.alert('Wrong Input', 'Please check the errors in the form.', [{ text: 'Ok' }])
            return;
        }
        //validate wether the user is editing or creating
        if (editedProduct) {
            dispatch(productActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                //the plus convert the price to number
                +formState.inputValues.price
            ));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);


    //submitting and communicate with the header buttons. submit is a key that points at the submitHandler function
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])


    //inputIdentifier will check the input. wrap it with useCallback so it isn't re-build unnecessary
    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        //here we are forwarding three keys, value, isValid, input
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={10}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image URL'
                        errorText='Please enter a valid image URL!'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    { /**if in edit mode the price is unavailable */
                        editedProduct
                            ? null
                            : <Input
                                id='price'
                                label='Price'
                                errorText='Please enter a valid price!'
                                keyboardType='decimal-pad'
                                returnKeyType='next'
                                onInputChange={inputChangeHandler}
                                required
                                min={0.1}
                            />
                    }
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    //depending on where the user press
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Save" iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFn} />
            </HeaderButtons>
        )
    }
}
const styles = StyleSheet.create({
    form: {
        margin: 20
    },
});
export default EditProductScreen;