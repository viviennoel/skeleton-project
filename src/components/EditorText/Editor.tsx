import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react';
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

export const Editor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
            }),
            Blockquote,
            Underline,
            HardBreak,
            BulletList,
            OrderedList,
            ListItem,
            Mention
        ],
        content: '',
    });

    return <div style={{ marginBottom: '20px' }}>
        <CustomMenu editor={editor} />
        <BubbleCustomMenu editor={editor} />
        <EditorContent editor={editor} />
    </div>
}