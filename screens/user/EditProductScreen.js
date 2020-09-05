import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
//import components
import HeaderButton from '../../components/UI/HeaderButton';
//import actions
import * as productActions from '../../store/actions/products'

const EditProductScreen = props => {
    //when in edit mode
    const prodId = props.navigation.getParam('productId');
    /**first we get to the slice and then the userProducts array there
     * then we run the method find to match the userProduct with the
     * prodId we're getting through getParam('productId').
    */
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    //checking if there are previous values of the states
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();
    //submitting and communicate with the header buttons
    const submitHandler = useCallback(() => {
        //validate wether the user is editing or creating
        if (editedProduct) {
            dispatch(productActions.updateProduct(prodId, title, description, imageUrl));
        } else {
            //the plus convert the price to number
            dispatch(productActions.createProduct(title, description, imageUrl, +price))
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price])
    //submitting and communicate with the header buttons. submit is a key that points at the submitHandler function
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={image => setImageUrl(image)}
                    />
                </View>
                { /**if in edit mode the price is unavailable */
                    editedProduct ? null : <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={price => setPrice(price)}
                        />
                    </View>
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={desc => setDescription(desc)}
                    />
                </View>
            </View>
        </ScrollView>
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
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
});
export default EditProductScreen;