import { supabase } from '../lib/supabase';

// Create a new category
export const createCategoria = async (category) => {
    try {
        const { data, error } = await supabase
            .from('categorie')
            .insert( category )
            .select();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Errore in createCategoria:', error);
        throw error;
    }
};

// Fetch all categories
export const getCategorie = async () => {
    try {
        const { data, error } = await supabase
            .from('categorie')
            .select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(' Errore in getCategorie:', error);
        throw error;
    }
};
export const getCategoria = async (id) => {
    try {
        const { data, error } = await supabase
            .from('categorie')
            .select('*')
            .eq('id', id);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Errore in getCategoria:', error);
        throw error;
    }
};

// Update a specific category
export const updateCategoria = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from('categorie')
            .update(updates)
            .eq('id', id);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Delete a specific category
export const deleteCategoria = async (id) => {
    try {
        const { data, error } = await supabase
            .from('categorie')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

export const getBisInCat = async () => {
    try {
        const { data, error } = await supabase
            .from('bisincat')
            .select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('contrtoller- Errore nel recupero di bisincat :', error);
        throw error;
    }
};
export const getAssociazioni = async (bisognoid) => {
    try {
        const { data, error } = await supabase
            .from('bisincat')
            .select('categoriaid')
            .eq('bisognoid', bisognoid);
        console.log('getAssociazioni controller:',data)
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Errore in getAssociazioni:', error);
        throw error;
    }
};
export const deleteAssociazioni = async (bisognoid) => {
    try {
        const { data, error } = await supabase
            .from('bisincat')
            .delete()
            .eq('bisognoid', bisognoid);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Errore in deleteAssociazioni:', error);
        throw error; // Rilancia l'errore per gestirlo nel componente chiamante
    }
};

export const createAssociazioni = async (bisognoid, categorie) => {
    try {
        const { data, error } = await supabase
            .from('bisincat')
            .insert(categorie.map(cat => ({
                bisognoid: bisognoid,
                categoriaid: cat.id
            })));
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Errore in createAssociazioni:', error);
        throw error; // Rilancia l'errore per gestirlo nel componente chiamante
    }
};

export const updateAssociazioni = async (bisognoid, categorie) => {
    try {
        await deleteAssociazioni(bisognoid);
        const data = await createAssociazioni(bisognoid, categorie);
        console.log('135 Dati restituiti da createAssociazioni:', data); // Aggiungi questo log per debug
        return data;
    } catch (error) {
        console.error('Errore in updateAssociazioni:', error);
        throw error;
    }
};

export const aggiornaAssociazioni = async (bisognoid, nuoveCategorie) => {
    try {
        const result = await updateAssociazioni(bisognoid, nuoveCategorie);
        console.log('Associazioni aggiornate:', result);
        return result; // Ritorna il risultato se tutto va bene
    } catch (error) {
        console.error('Errore in aggiornaAssociazioni:', error);
        throw error; // Rilancia l'errore per gestirlo nel componente chiamante
    }
};
