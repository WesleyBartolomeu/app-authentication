'use client'

import {useState} from 'react';
import { supabase } from '../utils/supabaseClient'

export default function PhotoUploader() {
    const [uploading, setUploading] = useState(false);

    async function handleFileUpload(event) {
        try {
            setUploading(true);

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`
            const {data: {user}} = await supabase.auth.getUser();
            if (!user) {
                throw new Error('User not authenticated for photo upload');
            }
            const filePath = `user_uploads/${user.id}/${fileName}`
            const {error} = await supabase.storage.from('photos')
            .upload(filePath, file);
            if (error) {
                throw error;
            }
        }catch(err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    }

  return (
    <label
    htmlFor="photo-upload"
    className="cursos-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg m-4"
    >

    {uploading ? 'Uploading...' : 'Upload Photo'}
    <input
    type="file"
    id="photo-upload"
    onChange={handleFileUpload}
    disabled={uploading}
    className="hidden"
    ></input>
    </label>
  )
}   
