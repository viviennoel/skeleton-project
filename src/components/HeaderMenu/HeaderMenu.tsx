'use client'

import { IconChevronDown } from '@tabler/icons-react';
import { Button, Center, Container, Group, Menu } from '@mantine/core';
import classes from './HeaderMenu.module.scss';
import Link from 'next/link';
import { HeaderLinks, Locale } from '@/src/types/Header';
import Image from 'next/image';
import { ResponsiveBurger } from './ResponsiveBurger/ResponsiveBurger';
import { LanguageSelector } from './LanguageSelector/LanguageSelector';
import { usePathname } from 'next/navigation';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';

export function HeaderMenu() {
    const pathname = usePathname();
    const dictionary = useDictionary()

    const metaHeader = getHeaderItems(dictionary.header.metaHeader, 'sm');
    const mainHeader = getHeaderItems(dictionary.header.header);

    return (
        <div className={classes.header}>
            <Menu>
                <Container size="md">
                    {metaHeader && <Group justify="flex-end" className={classes.surHeader} visibleFrom="sm">{metaHeader}</Group>}
                    {mainHeader && <div className={classes.inner}>
                        <Link className={classes.logoContainer} href='/'>
                            <Image src={dictionary.logoUrl} alt={`logo ${dictionary.compagnyName}`} height={45} width={45} className={classes.logo} />
                        </Link>
                        <Group gap={5} visibleFrom="sm">
                            {mainHeader}
                        </Group>
                        <Group>
                            <Button color='black' visibleFrom="sm" component={Link} href={dictionary.pages.contact.link}>{dictionary.pages.contact.label}</Button>
                            <LanguageSelector />
                            <ResponsiveBurger />
                        </Group>
                    </div>}
                </Container>
            </Menu >
        </div>
    );
}

const getHeaderItems = (links: HeaderLinks, size?: 'sm') => links.map((link) => {
    const menuItems = link.links?.map((item) => (
        <Menu.Item key={item.link}><Link href={item.link} className={classes.link}>{item.label}</Link></Menu.Item>
    ));

    if (menuItems) {
        return (
            <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                <Menu.Target>
                    <Link
                        href={link.link}
                        className={classes.link}
                        onClick={(event) => event.preventDefault()}
                    >
                        <Center>
                            <span className={classes.linkLabel}>{link.label}</span>
                            <IconChevronDown size={14} stroke={1.5} />
                        </Center>
                    </Link>
                </Menu.Target>
                <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
        );
    }

    return (
        <Link
            key={link.label}
            href={link.link}
            className={`${classes.link} ${size ? classes.smallLink : ''}`}
        >
            {link.label}
        </Link>
    );
});
