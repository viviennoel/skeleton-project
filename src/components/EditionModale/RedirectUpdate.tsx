'use client'

import { Button } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link"

export const RedirectUpdate = ({ slug }: { slug: string }) => {
    const mobile = useMediaQuery(`(max-width: 48em)`);

    return !mobile ?
        <Button component={Link} href={`/admin/articles/${slug.replace(/-/g, ' ')}`}>Modifier sur l'espace administrateur</Button>
        : <p>Vous ne pourrez pas modifier les articles sur mobile. Veuillez utiliser un ordinateur</p>
}