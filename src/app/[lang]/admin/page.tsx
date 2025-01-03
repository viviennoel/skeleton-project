'use client'

import { TextCard } from "@/src/components/SliceMachine/TextCard/TextCard";
import { useDictionary } from "@/src/dictionaries/dictionary-provider";
import { Title, Text, Divider, Container, Group, Button, Space } from "@mantine/core"
import Link from "next/link"

const Admin = () => {
    const dictionary = useDictionary();
    return <Container>
        {/* @ts-ignore */}
        <TextCard data={dictionary.pages.admin} />
        <Divider />
        <Space h="xl" />
        <Group justify="center">
            {/* @ts-ignore */}
            <Button component={Link} color='black' href='/admin/products'>{dictionary.pages.admin.addProducts}</Button>
            {/* @ts-ignore */}
            <Button component={Link} color='black' href='/admin/articles'>{dictionary.pages.admin.addArticles}</Button>
        </Group>

    </Container>
}

export default Admin;