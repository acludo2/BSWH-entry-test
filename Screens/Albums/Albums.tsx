import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, requireNativeComponent, NativeModules } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotosByAlbumIdAsync, selectCurrentAlbum, selectAllPhotos, toggleDisplayMode, fetchAllPhotosAsync } from './photosReducer';
import { AlbumPhotos } from '../../store/types';
import styles from "./styles"


interface Props {
}


/* 
const { SnapshotModule } = NativeModules;
console.log("snpashot",NativeModules)

//@ts-ignore
const captureSnapshot = (viewTag) => {
    console.log("snpashot",NativeModules)
    //@ts-ignore
    SnapshotModule.snapshot(viewTag, (base64String) => {
        console.log('Base64 string:', base64String);
        // Handle the base64 string
    });
};

 */

const PhotoGrid: React.FC<Props> = ({ navigation, route }: any) => {
    const viewRef = useRef(null);

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
        //@ts-ignore
        <View ref={viewRef} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.startButton}>
                    <Text style={styles.startButtonText}>Back</Text>
                </TouchableOpacity>
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


export default PhotoGrid;
