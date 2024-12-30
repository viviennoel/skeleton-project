import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { Dispatch, SetStateAction, useState } from "react";

export const DropzoneCloudinary = ({ setImageUrl, imageUrl }: { setImageUrl: Dispatch<SetStateAction<string | null>>, imageUrl: string | null }) => {
    const [image, setImage] = useState<string | null>(null);
    // Handle image upload for the main image
    const handleDrop = async (acceptedFiles: FileWithPath[]) => {
        const file = acceptedFiles[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const { url } = await response.json();
                setImageUrl(url); // Set Cloudinary URL for database
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <Dropzone
            onDrop={handleDrop}
            accept={['image/*']}
            multiple={false}
            style={{
                border: '2px dashed #0070f3',
                borderRadius: '5px',
                padding: '20px',
                marginBottom: '20px',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                {!imageUrl ? (
                    <p>Drag & drop your main image here, or click to select</p>
                ) : (
                    <img
                        src={imageUrl}
                        alt="Main Image"
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                    />
                )}
            </div>
        </Dropzone>
    )
}