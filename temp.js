const associaBisInCat = async () => {
    const isCategorySelected = selectedCategories.includes(category);
    try {
        // Rimuovi l'associazione precedente per questa categoria
        const { data, error } = await supabase
            .from('bisincat')
            .delete()
            .eq('bisognoid', bisogno.id)
            .eq('categoriaid', category.id);

        // Se la categoria non era gi� associata, aggiungi la nuova associazione
        if (!isCategorySelected) {
            await supabase
                .from('bisincat')
                .insert([{ bisognoid: selectedNeed.id, categoriaid: category.id }]);
        }

        // Aggiorna lo stato delle categorie selezionate
    } catch (error) {
        console.error('Errore nell\'aggiornamento delle associazioni', error);
        Alert.alert('Errore nell\'aggiornamento delle associazioni');
    }

}

const handleAssociate = async () => {
    alert('bisogno', selectedNeed.nome)
    try {
        const { data, error } = await supabase
            .from('bisincat')
            .insert(selectedCategories.map(cat => ({
                bisognoid: selectedNeed.id,
                categoriaid: cat.id
            })));

        if (error) {
            throw error;
        }

        Alert.alert(
            'Association Successful',
            `Need: ${selectedNeed.nome}\nCategories: ${selectedCategories.map(cat => cat.nome).join(', ')}`,
            [{ text: 'OK', onPress: () => resetSelections() }]
        );
    } catch (error) {
        console.error('Errore nell\'associazione dei bisogni alle categorie', error);
        Alert.alert('Errore nell\'associazione dei bisogni alle categorie');
    }
};
