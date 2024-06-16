import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { RefreshControl, View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as CatController from '../controllers/categorieController';
import Color from 'color';
import Spinner from 'react-native-loading-spinner-overlay';

const CategoryItem = ({ categoria, isSelected, onSelect, colore }) => {
    const backgroundColorWithOpacity = Color(colore).alpha(0.5).rgb().string();
    return (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                { backgroundColor: backgroundColorWithOpacity },
                isSelected ? styles.selected : null,
            ]}
            onPress={() => onSelect(categoria)}
        >
            <Text style={styles.categoryText}>{categoria.nome}</Text>
        </TouchableOpacity>
    );
};

const BisInCat = ({ bisogno }) => {
    const [categorie, setCategorie] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const initializeData = async () => {
            await getCategorie();
            await getAssociazioni();
        };
        initializeData();
    }, []);

    const getCategorie = async () => {
        setIsLoading(true); // Inizia il caricamento
        try {
            const data = await CatController.getCategorie();
            setCategorie(data);
        } catch (error) {
            console.error('bisincat - Error fetching categories:', error);
        } finally {
            setIsLoading(false); // Termina il caricamento
        }
    };

    const handleSelectCategory = (category) => {
        const isCategorySelected = selectedCategories.includes(category);

        setSelectedCategories((prevSelected) =>
            isCategorySelected
                ? prevSelected.filter((cat) => cat.id !== category.id)
                : [...prevSelected, category]
        );
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getCategorie().then(() => {
            setRefreshing(false);
        });
    }, []);

    const getAssociazioni = async () => {
        try {
            const data = await CatController.getAssociazioni(bisogno);
            console.log('get associazioni per:', bisogno.nome, data);
            if (data) {
                const associatedCategoryIds = [...new Set(data.map((item) => item.categoriaid))];
                const associatedCategories = categorie.filter((cat) => associatedCategoryIds.includes(cat.id));
                setSelectedCategories(associatedCategories);
            }
        } catch (error) {
            console.error('Errore in GetAssociazioni:', error);
        }
    };

    const UpdateAssociazioni = async (bisogno) => {
        try {
            const { data } = await CatController.aggiornaAssociazioni(bisogno.id, selectedCategories);
        } catch (error) {
            console.error('Errore in UpdateAssociazioni:', error);
        }
    };

    const handleAssociate = async () => {
        try {
            const { data, error } = await supabase
                .from('bisincat')
                .insert(selectedCategories.map(cat => ({
                    bisognoid: bisogno.id,
                    categoriaid: cat.id
                })));

            if (error) {
                throw error;
            }

            Alert.alert(
                'Association Successful',
                `Need: ${bisogno.nome}\nCategories: ${selectedCategories.map(cat => cat.nome).join(', ')}`,
                [{ text: 'OK', onPress: () => resetSelections() }]
            );
        } catch (error) {
            console.error('Errore nell\'associazione del bisogno con le categorie', error);
            Alert.alert('Errore nell\'associazione del bisogno con le categorie');
        }
    };

    return (
        <>
            <Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 30 }}>Seleziona a quale tipo di bisogno appartiene</Text>

            <FlatList
                data={categorie}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CategoryItem
                        categoria={item}
                        isSelected={selectedCategories.includes(item)}
                        onSelect={handleSelectCategory}
                        colore={item.colore}
                    />
                )}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.grid}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            <TouchableOpacity style={styles.button} onPress={handleAssociate}>
                <Text style={styles.buttonText}>Associa</Text>
            </TouchableOpacity>
            <Spinner
                visible={isLoading}
                textContent={'Caricamento dati in corso...'}
                textStyle={styles.spinnerTextStyle}
            />
        </>
    );
};

const styles = StyleSheet.create({
    grid: {
        justifyContent: 'space-between',
    },
    row: {
        justifyContent: 'space-between',
    },
    categoryItem: {
        flex: 1,
        margin: 4,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    selected: {
        borderWidth: 2,
        borderColor: 'purple',
    },
    categoryText: {
        color: '#333',
    },
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#3ca9d7',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});

export default BisInCat;
