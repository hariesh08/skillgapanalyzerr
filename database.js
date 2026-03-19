// database.js
import { supabase } from './lib/supabase.js';

/**
 * Saves or updates a user's path.
 * We'll use insert. If user decides to analyze the same role again, it'll create a new path.
 */
export async function saveUserPath(role, skills, completedSkills) {
    try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) throw new Error('Not authenticated');

        // First check if user already has a path for this role
        const { data: existingPaths } = await supabase
            .from('userpaths')
            .select('id')
            .eq('user_id', userData.user.id)
            .eq('selected_role', role);

        let data, error;
        
        if (existingPaths && existingPaths.length > 0) {
            // Update the existing
            const res = await supabase
                .from('userpaths')
                .update({
                    skills: skills,
                    completed_skills: completedSkills,
                    updated_at: new Date().toISOString()
                })
                .eq('id', existingPaths[0].id)
                .select()
                .single();
            data = res.data; error = res.error;
        } else {
             // Insert new
             const res = await supabase
                .from('userpaths')
                .insert({
                    user_id: userData.user.id,
                    selected_role: role,
                    skills: skills,
                    completed_skills: completedSkills
                })
                .select()
                .single();
            data = res.data; error = res.error;
        }

        if (error) throw error;
        return data; 
    } catch (err) {
        console.error('saveUserPath error:', err);
        throw err;
    }
}

/**
 * Update an existing user path directly (e.g. tracking progress)
 */
export async function updateUserPathCompleteness(id, completedSkills) {
     try {
        const { data, error } = await supabase
            .from('userpaths')
            .update({ completed_skills: completedSkills, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('updateUserPathCompleteness error:', err);
        throw err;
    }
}

export async function getUserPaths() {
    try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) throw new Error('Not authenticated');

        const { data, error } = await supabase
            .from('userpaths')
            .select('*')
            .eq('user_id', userData.user.id)
            .order('updated_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (err) {
         console.error('getUserPaths error:', err);
         throw err;
    }
}
