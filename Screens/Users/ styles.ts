import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    userNameContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F0F0F0',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    albumContainer: {
        paddingVertical: 12,
        paddingHorizontal: 26,
        backgroundColor: '#FFFFFF',
        alignContent:"flex-end",
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    albumTitle: {
        fontSize: 14,
        fontWeight: '400',
    },
    divider: {
        height: 1,
        backgroundColor: '#ECECEC',
        marginTop: 8,
    },
});


export default styles;