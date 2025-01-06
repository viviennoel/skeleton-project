'use client'

import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Blockquote } from '@tiptap/extension-blockquote';
import { Underline } from '@tiptap/extension-underline';
import { ListItem } from '@tiptap/extension-list-item';
import { HardBreak } from '@tiptap/extension-hard-break';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Mention } from '@tiptap/extension-mention';
import { Table } from '@tiptap/extension-table';
import { BubbleCustomMenu } from './BubbleCustomMenu';
import { CustomMenu } from './CustomMenu';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { DropzoneCloudinary } from './Dropzone';
import { useEffect, useState } from 'react';
import CustomImage from './CustomImage';

export const Editor = ({ setEditorContent, content }: { setEditorContent?: (content: string) => void, content?: any }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [editorImageUrl, setEditorImageUrl] = useState<string | null>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Image.configure({ inline: false }),
            CustomImage,
            Blockquote,
            Underline,
            HardBreak,
            BulletList,
            OrderedList,
            ListItem,
            Mention,
        ],
        content: content ?? '',
        // onUpdate: ({ editor }) => {
        //     try {
        //         setEditorContent && setEditorContent(editor.getHTML());
        //     } catch (error) {
        //         console.error('Error updating editor content:', error);
        //     }
        // },
    });

    // useEffect(() => {
    //     try {
    //         if (editorImageUrl && editor) {
    //             editor.chain().focus().setImage({ src: editorImageUrl }).run();
    //         }
    //     } catch (error) {
    //         console.error('Error setting image:', error);
    //     }
    // }, [editorImageUrl])

    return (
        <div style={{ marginBottom: '20px' }}>
            <CustomMenu editor={editor} open={open} />
            <BubbleCustomMenu editor={editor} />
            <EditorContent editor={editor} />
            <Modal opened={opened} onClose={close} title="Upload image">
                <DropzoneCloudinary setImageUrl={setEditorImageUrl} imageUrl={editorImageUrl} />
            </Modal>
        </div>
    );
};
