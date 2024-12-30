import { Button, Group } from "@mantine/core";

export const CustomMenu = ({ editor, open }: { editor: any, open: any }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            <Group p="xs">
                {/* Titles Button (H1, H2, H3, etc.) */}
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    H1
                </Button>
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    H2
                </Button>
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    H3
                </Button>

                {/* Bullet List Button */}
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    Bullet List
                </Button>

                {/* Ordered List Button */}
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    Ordered List
                </Button>

                {/* Blockquote Button */}
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    Blockquote
                </Button>

                {/* Mention Button */}
                <Button
                    variant="outline"
                    onClick={() => {
                        const mention = prompt('Enter a mention (e.g. @JohnDoe)');
                        if (mention) {
                            editor.chain().focus().insertContent(`@${mention}`).run();
                        }
                    }}
                >
                    Mention
                </Button>

                {/* Image Button */}
                <Button
                    variant="outline"
                    onClick={open}
                >
                    Add Image
                </Button>
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </Button>

                {/* Italic Button */}
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </Button>

                {/* Underline Button */}
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().setUnderline().run()}
                >
                    Underline
                </Button>
            </Group>
        </div>
    );
};