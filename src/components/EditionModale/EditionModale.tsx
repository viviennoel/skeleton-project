'use client'

import { useState } from "react"
import { Editor } from "../EditorText/Editor"
import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/navigation"

export const EditionModale = ({ content, id }: { content: any, id: string }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [editorContent, setEditorContent] = useState(null)
    const router = useRouter();

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
        router.refresh();
    };

    const deleteArticle = async (id: string) => {
        const response = await fetch(`/api/articles/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error("Failed to save article.");
        } else {
            console.log("Article saved successfully.");
            router.push('/articles');
        }
    };

    return (
        <>
            <Button onClick={open} color="green">
                Modifier l'article
            </Button>
            <Button onClick={() => deleteArticle(id)} color='red'>Supprimer l'article</Button>
            <Modal opened={opened} onClose={close} title="Edit the article">
                {/* @ts-ignore */}
                <Editor content={content} setEditorContent={setEditorContent} />
                <Button onClick={() => saveArticle(id)} color="green">Save the changes</Button>
            </Modal>
        </>
    )
}
