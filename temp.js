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


                        <View style={theme.article}>
                            <Text style={styles.lightText}>Questo è il testo con Inter-Light</Text>
                            <Text style={styles.blackText}>Questo è il testo con Inter-Black</Text>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 10 }}>Inter Light size 10</Text>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 12 }}>Inter Light size 12</Text>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 14 }}>Inter Light size 14</Text>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>Inter Light size 16</Text>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 18 }}>Inter Light size 18</Text>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 20 }}>Inter Light size 20</Text>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 22 }}>Inter Light size 22</Text>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 24 }}>Inter Light size 24</Text>
                            <Text style={{ fontFamily: 'Manrope-Light', fontSize: 10 }}>Manrope Light size 10</Text>
                            <Text style={{ fontFamily: 'Manrope-Light', fontSize: 12 }}>Manrope Light size 12</Text>
                            <Text style={{ fontFamily: 'Manrope-Light', fontSize: 14 }}>Manrope Light size 14</Text>
                            <Text style={{ fontFamily: 'Manrope-Light', fontSize: 16 }}>Manrope Light size 16</Text>
                            <Text style={{ fontFamily: 'Manrope-Light', fontSize: 18 }}>Manrope Light size 18</Text>
                            <Text style={{ fontFamily: 'Manrope-Light', fontSize: 20 }}>Manrope Light size 20</Text>
                            <Text style={{ fontFamily: 'Manrope-Light', fontSize: 22 }}>Manrope Light size 22</Text>
                            <Text style={{ fontFamily: 'Manrope-Light', fontSize: 24 }}>Manrope Light size 24</Text>
                            <Text style={{ fontFamily: 'Inter-Black', fontSize: 10 }}>Inter Black size 10</Text>
                            <Text style={{ fontFamily: 'Inter-Black', fontSize: 12 }}>Inter Black size 12</Text>
                            <Text style={{ fontFamily: 'Inter-Black', fontSize: 14 }}>Inter Black size 14</Text>
                            <Text style={{ fontFamily: 'Inter-Black', fontSize: 16 }}>Inter Black size 16</Text>
                            <Text style={{ fontFamily: 'Inter-Black', fontSize: 18 }}>Inter Black size 18</Text>
                            <Text style={{ fontFamily: 'Inter-Black', fontSize: 20 }}>Inter Black size 20</Text>
                            <Text style={{ fontFamily: 'Inter-Black', fontSize: 22 }}>Inter Black size 22</Text>
                            <Text style={{ fontFamily: 'Inter-Black', fontSize: 24 }}>Inter Black size 24</Text>
                            <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 10 }}>Manrope Bold size 10</Text>
                            <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 12 }}>Manrope Bold size 12</Text>
                            <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 14 }}>Manrope Bold size 14</Text>
                            <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 16 }}>Manrope Bold size 16</Text>
                            <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 18 }}>Manrope Bold size 18</Text>
                            <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 20 }}>Manrope Bold size 20</Text>
                            <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 22 }}>Manrope Bold size 22</Text>
                            <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 24 }}>Manrope Bold size 24</Text>
                            <Text style={{ fontSize: 10 }}>Platform Default size 10</Text>
                            <Text style={{ fontSize: 12 }}>Platform Default size 12</Text>
                            <Text style={{ fontSize: 14 }}>Platform Default size 14</Text>
                            <Text style={{ fontSize: 16 }}>Platform Default size 16</Text>
                            <Text style={{ fontSize: 18 }}>Platform Default size 18</Text>
                            <Text style={{ fontSize: 20 }}>Platform Default size 20</Text>
                            <Text style={{ fontSize: 22 }}>Platform Default size 22</Text>
                            <Text style={{ fontSize: 24 }}>Platform Default size 24</Text>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 10 }}>Manrope Light size 10</Text>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12 }}>Manrope Light size 12</Text>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 14 }}>Manrope Light size 14</Text>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 16 }}>Manrope Light size 16</Text>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 18 }}>Manrope Light size 18</Text>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 20 }}>Manrope Light size 20</Text>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 22 }}>Manrope Light size 22</Text>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 24 }}>Manrope Light size 24</Text>
                            <Text style={{ fontFamily: 'Poppins-Black', fontSize: 10 }}>Inter Black size 10</Text>
                            <Text style={{ fontFamily: 'Poppins-Black', fontSize: 12 }}>Inter Black size 12</Text>
                            <Text style={{ fontFamily: 'Poppins-Black', fontSize: 14 }}>Inter Black size 14</Text>
                            <Text style={{ fontFamily: 'Poppins-Black', fontSize: 16 }}>Inter Black size 16</Text>
                            <Text style={{ fontFamily: 'Poppins-Black', fontSize: 18 }}>Inter Black size 18</Text>
                            <Text style={{ fontFamily: 'Poppins-Black', fontSize: 20 }}>Inter Black size 20</Text>
                            <Text style={{ fontFamily: 'Poppins-Black', fontSize: 22 }}>Inter Black size 22</Text>
                            <Text style={{ fontFamily: 'Poppins-Black', fontSize: 24 }}>Inter Black size 24</Text>

                        </View>
