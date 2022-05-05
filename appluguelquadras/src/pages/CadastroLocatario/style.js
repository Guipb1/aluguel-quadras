import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },

    title: {
            fontSize:22,
            color:"#00FF7F",
            marginBottom:10,
            fontWeight:"bold",
    },

    input: {
        width:300,
        marginTop:10,
        padding:10,
        height:50,
        borderBottomWidth:1,
        borderBottomColor:"#00FF7F",
        marginLeft:"auto",
        marginRight:"auto",
        color:"#4d5156",
    },

    buttonRegister:{
        width:200,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF7F',
        borderRadius:50,
        marginTop:30,
    },

    textButtonRegister: {
        color:"black"
    },

    contentAlert:{
        marginTop:20,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
    },

    warningAlert: {
        paddingLeft:10,
        color:"#bdbdbd",
        fontSize:16,
    },

    login: {
        marginTop:20,
        color:"#4d5156",
    },

    linkLogin: {
        color:"#1877f2",
        fontSize:16,
    }



});

export default styles