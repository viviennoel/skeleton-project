'use client'

import { useState } from "react"
import { Editor } from "../EditorText/Editor"
import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import router from "next/navigation"

export const EditionModale = ({ content, id }: { content: any, id: string }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [editorContent, setEditorContent] = useState(null)
    const saveArticle = async (id: string) => {
        const response = await fetch(`/api/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: editorContent }),
        });

        if (!response.ok) {
            console.error("Failed to save article.");
        } else {
            console.log("Article saved successfully.");
        }

        close();
        location.reload();
    };

    return (
        <>
            <Button onClick={open} color="green">
                Modifier l'article
            </Button><Modal opened={opened} onClose={close} title="Edit the article">
                <Editor content={content} setEditorContent={setEditorContent} />
                <Button onClick={() => saveArticle(id)} color="green">Save the changes</Button>
            </Modal>
        </>
    )
}
