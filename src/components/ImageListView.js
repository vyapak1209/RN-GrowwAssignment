import React, { Component } from 'react'
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { fetchImages } from '../actions'
import SearchBarView from './SearchBarView'
import { QUERY_CHANGED, NEXT_URL } from '../actions/ActionsTypes'

export class ImageListView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            query: '',
            loading: false,
            spellCheckedQuery: null
        }
    }

    searchImages(query) {
        console.log("Query ", query)

        this.setState({
            loading: true,
        })

        if (query != this.state.query) {
            this.setState({
                query
            })
            this.refs.flatlist.scrollToOffset({ x: 0, y: 0, animated: true })
            this.props.fetchImages(query, null, QUERY_CHANGED)
        } else {
            this.setState({
                query
            })
            this.props.fetchImages(query, null, null)
        }

    }



    componentDidUpdate() {
        if (this.props.spellCheck != null) {

            if(this.state.spellCheckedQuery != this.props.spellCheck.spellchecked_query)
            this.setState({
                spellCheckedQuery: this.props.spellCheck.spellchecked_query
            })
        }
    }


    render() {
        console.log("Data: ", this.props.images)

        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <SearchBarView
                    searchImages={this.searchImages.bind(this)}
                />

                <View>
                    {(this.props.spellCheck != null && this.state.spellCheckedQuery != null) ? <View>
                        <Text style={{ margin: 20 }}>
                            Did you mean? <Text onPress={() => {
                                this.props.fetchImages(this.props.spellCheck.spellchecked_query, null, QUERY_CHANGED)
                            }} style={{ color: '#0000EE', textDecorationLine: 'underline' }}>{this.props.spellCheck.spellchecked_query}</Text>
                        </Text>
                    </View> : <View />}
                </View>

                <View>
                    {(!this.state.loading) ? <View style={{ marginTop: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/images/search.png')}
                            style={{ height: 100, width: 100, marginBottom: 10 }}
                            resizeMode='contain'
                        />
                        <Text style={{ margin: 5 }}>Powered by ShutterStock</Text>
                        <Text style={{ margin: 5 }}>Search for images</Text>
                    </View> : <View />}
                </View>

                <View>
                    {(this.state.loading && this.props.images === null && this.props.error === null) ? <ActivityIndicator style={{ marginTop: 200 }} size="large" color="#aa3939" /> : <View />}
                </View>

                <View>
                    {(this.props.error) ? <View style={{ marginTop: 200 }}><Text style={{ fontSize: 20 }}>{this.props.error}</Text></View> : <View />}
                </View>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    data={this.props.images}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ height: 150, width: '50%', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                <Image
                                    style={{ height: 125, width: 125 }}
                                    resizeMode='contain'
                                    source={{ uri: item.assets.huge_thumb.url }}
                                />
                            </View>
                        );
                    }}
                    onEndReachedThreshold={0.8}
                    onEndReached={() => this.props.fetchImages(this.state.query, NEXT_URL, null)}
                    ref='flatlist'
                />


            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        images: state.images.data,
        nextUrl: state.images.next,
        html: state.images.html,
        error: state.images.error,
        spellCheck: state.images.spellCheck
    }
}

export default connect(mapStateToProps, { fetchImages })(ImageListView)

