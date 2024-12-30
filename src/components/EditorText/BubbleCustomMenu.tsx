import { Button } from "@mantine/core"
import { BubbleMenu } from "@tiptap/react"

export const BubbleCustomMenu = ({ editor }: { editor: any }) => {
    return (
        <BubbleMenu editor={editor}>
            <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <strong>B</strong>
            </Button>
            <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <em>I</em>
            </Button>
            <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <u>U</u>
            </Button>
        </BubbleMenu>
    )
}