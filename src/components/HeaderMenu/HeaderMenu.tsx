'use client'

import { IconChevronDown } from '@tabler/icons-react';
import { Button, Center, Container, Group, Menu } from '@mantine/core';
import classes from './HeaderMenu.module.scss';
import Link from 'next/link';
import { HeaderLinks, Locale } from '@/src/types/Header';
import Image from 'next/image';
import { ResponsiveBurger } from './ResponsiveBurger/ResponsiveBurger';
import { LanguageSelector } from './LanguageSelector/LanguageSelector';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';
import LogoutButton from '../EditionModale/LogoutButton/LogoutButton';

export function HeaderMenu() {
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
                            <Button color='#94783b' visibleFrom="sm" component={Link} href={dictionary.pages.contact.link} className={classes.contact}>
                                {dictionary.pages.contact.label}
                            </Button>
                            <LogoutButton />
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
        <Menu.Item key={item.label}><Link href={item.link} className={classes.link}>{item.label}</Link></Menu.Item>
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
            //@ts-ignore
            href={link.query ? { pathname: link.link, query: link.query } : link.link}
            className={`${classes.link} ${size ? classes.smallLink : ''}`}
        >
            {/* @ts-ignore */}
            {link.icon && <Image width="15" height="15" src={link.icon} alt={link.label} className={classes.icon} />}
            {link.label}
        </Link>
    );
});
