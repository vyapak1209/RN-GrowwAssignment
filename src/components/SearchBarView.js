import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, StatusBar, Image } from 'react-native'


export default class SearchBarView extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            query: ''
        }

    }

    render() {
        return (

            <View style={{ width: '100%', height: 65, elevation: 2, backgroundColor: '#D46A6A', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar
                    backgroundColor="#aa3939"
                    barStyle="light-content"
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput
                        style={styles.textInput}
                        onSubmitEditing = {() => this.props.searchImages(this.state.query)}
                        onChangeText = {(text) => {
                            this.setState({
                                query: text
                            })
                        }}
                        value = {(this.props.spellChecked) ? this.props.spellCheckedQuery : this.state.query}
                        placeholder = 'Search...'
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        // borderColor:'#aa3939',
        borderRadius: 7,
        padding: 10,
        color: '#D46A6A'
    }
})