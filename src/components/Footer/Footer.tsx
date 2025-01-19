'use client'

import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './Footer.module.scss';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';
import Link from 'next/link';

export function Footer() {
    const dictionary: any = useDictionary();

    // @ts-ignore
    const groups = dictionary.footer.links.map((group) => {
        // @ts-ignore
        const links = group.links.map((link, index) => (
            <Link
                key={index}
                className={classes.link}
                href={link.link}
            >
                {link.label}
            </Link>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Group>
                        <Image alt="logo" src={dictionary.logoUrl} width={75} height={75} />
                        <Text>Franck Sabet</Text>
                    </Group>
                    <Text size="sm" c="dimmed" className={classes.description}>
                        {dictionary.footer.description}
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    <Link href='https://hestia-innovation.com' className={classes.link}>Hestia Innovation </Link>{dictionary.footer.copyright}
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle" component={Link} href={dictionary.footer.facebook}>
                        <IconBrandFacebook size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle" component={Link} href={dictionary.footer.instagram}>
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}