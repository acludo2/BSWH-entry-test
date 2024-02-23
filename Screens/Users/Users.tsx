import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsersAsync, selectUsers, fetchAlbumsAsync, selectUserAlbums } from './usersReducer'; // Import your slice
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from './ styles';


const UserList: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const albums = useSelector(selectUserAlbums);
    const hasSetUsers = useAppSelector((state) => state.users.hasSetUsers);
    const status = useAppSelector((state) => state.users.status);
    const navigation = useNavigation();


    const [expandedUsers, setExpandedUsers] = useState<number[]>([]);
    const animatedHeights = useRef<{ [key: number]: Animated.Value }>({});

    useEffect(() => {
        if (hasSetUsers) {
            dispatch(fetchAlbumsAsync());
        }
        dispatch(fetchUsersAsync());
    }, [hasSetUsers]);

    const toggleUser = (userId: number) => {
        if (expandedUsers.includes(userId)) {
            setExpandedUsers(expandedUsers.filter(id => id !== userId));
        } else {
            setExpandedUsers([...expandedUsers, userId]);
        }
    };

    const isUserExpanded = (userId: number) => expandedUsers.includes(userId);

    const renderUserItem = ({ item }: { item: any }) => {

        let itemAlbums = albums.find(el => el.albums[0].userId === item.id);
        if (!animatedHeights.current[item.id]) {
            animatedHeights.current[item.id] = new Animated.Value(0);
        }

        const expandHeight = animatedHeights.current[item.id].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500], // Adjust the height as per your requirement
            extrapolate: 'clamp',
        });

        const handlePress = async () => {
            const nextExpandedUsers = [...expandedUsers]; // Create a new array to avoid mutating state directly
            const userId = item.id;
            
            if (expandedUsers.includes(userId)) {
                nextExpandedUsers.splice(nextExpandedUsers.indexOf(userId), 1); // Remove userId if already expanded
            } else {
                nextExpandedUsers.push(userId); // Add userId if not expanded
            }
        
            setExpandedUsers(nextExpandedUsers); // Update the state
        
            await Animated.timing(animatedHeights.current[userId], {
                toValue: nextExpandedUsers.includes(userId) ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        };
        

        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                <Animated.View style={{ height: expandHeight, overflow: 'hidden' }}>
                    {itemAlbums && itemAlbums.albums.length > 0 ? (
                        <FlatList
                            style={{ overflow: "visible" }}

                            data={itemAlbums.albums}
                            renderItem={({ item }) => (
                                //@ts-ignore
                                <TouchableOpacity onPress={() => { navigation.navigate('Album', { userId: item.id }) }} style={styles.albumContainer}>
                                    <View style={styles.divider} />
                                    <Text style={styles.albumTitle}>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    ) : null}
                </Animated.View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }} >
            {status === 'loading' ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    style={{ overflow: "visible" }}
                    data={users}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item.id.toString()}

                />
            )}
        </View>
    );
};



export default UserList;
