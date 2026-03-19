import { supabase } from './lib/supabase.js';

export async function signUp(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin
        }
    });
    if (error) throw error;
    if (data?.user && !data.session) {
         // Verification required
         return { verifyRequired: true, user: data.user };
    }
    return data;
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}



export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
}

export function onAuthStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

export async function upsertProfile(user) {
    if (!user) return;
    try {
        const { error } = await supabase
            .from('profiles')
            .upsert({ 
                id: user.id, 
                email: user.email,
                full_name: user.user_metadata?.full_name || user.email.split('@')[0],
                created_at: new Date().toISOString()
            }, { onConflict: 'id' });
        if (error) console.error("Error upserting profile:", error);
    } catch (err) {
        console.error("Profile upsert exception:", err);
    }
}
