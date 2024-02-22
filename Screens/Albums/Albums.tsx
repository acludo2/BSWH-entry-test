import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotosByAlbumIdAsync, selectCurrentAlbum, selectAllPhotos, toggleDisplayMode, fetchAllPhotosAsync } from './photosReducer';
import { RootState } from '../../store/store';
import { AlbumPhotos } from '../../store/types';
import { useNavigation } from '@react-navigation/native';
import { all } from 'axios';


interface Props {
}

const PhotoGrid: React.FC<Props> = ({ navigation, route }: any) => {
    const dispatch = useDispatch();
    const photos = useSelector(selectCurrentAlbum);
    const allPhotos = useSelector(selectAllPhotos);
    const userId = route.params.userId; // You can replace this with the actual userId from props
    const [isAllPhotosView, setIsAllPhotosView] = useState(false);
    useEffect(() => {
        // Fetch photos by album ID when the component mounts
        //@ts-ignore
        dispatch(fetchAllPhotosAsync())
        //@ts-ignore
        dispatch(fetchPhotosByAlbumIdAsync(userId));
    }, [dispatch, userId, isAllPhotosView]);

    const togglePhotosView = () => {
        setIsAllPhotosView(!isAllPhotosView);
        dispatch(toggleDisplayMode());
    }

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={styles.photoItem}>
                <Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Photos</Text>
                <TouchableOpacity onPress={togglePhotosView} style={styles.startButton}>
                    <Text style={styles.startButtonText}>*</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={isAllPhotosView ? allPhotos : photos}
                keyExtractor={(item: AlbumPhotos, index: number) => index.toString()}
                numColumns={3}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    startButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    photoItem: {
        flex: 1,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default PhotoGrid;
