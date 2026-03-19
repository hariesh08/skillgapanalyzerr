-- schema.sql

-- Create userpaths table
CREATE TABLE IF NOT EXISTS public.userpaths (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    selected_role TEXT NOT NULL,
    skills JSONB NOT NULL DEFAULT '[]',
    completed_skills JSONB NOT NULL DEFAULT '[]',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row-Level Security
ALTER TABLE public.userpaths ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own paths
CREATE POLICY "Users can view their own paths"
    ON public.userpaths
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own paths
CREATE POLICY "Users can insert their own paths"
    ON public.userpaths
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own paths
CREATE POLICY "Users can update their own paths"
    ON public.userpaths
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to delete their own paths
CREATE POLICY "Users can delete their own paths"
    ON public.userpaths
    FOR DELETE
    USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS userpaths_user_id_idx ON public.userpaths(user_id);
CREATE INDEX IF NOT EXISTS userpaths_updated_at_idx ON public.userpaths(updated_at DESC);
