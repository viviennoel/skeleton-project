'use client'

import { Menu } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import Image from 'next/image';
import classes from './LanguageSelector.module.scss'


import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n-config";
import { Locale } from "@/src/types/Header";

export const LanguageSelector = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const pathname = usePathname();
    const Router = useRouter();
    const locale = pathname.split("/")[1] as Locale;

    const redirectToPathname = (locale: 'en' | 'fr') => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        Router.push(segments.join("/"));
    };

    const supportedLanguage = {
        fr: { label: 'français', img: 'https://res.cloudinary.com/djlwtz7qw/image/upload/v1735546680/placeholder-image_ixippm.webp' },
        en: { label: 'english', img: 'https://res.cloudinary.com/djlwtz7qw/image/upload/v1735546680/placeholder-image_ixippm.webp' }
    }

    return (
        <Menu>
            <Menu.Target>
                <Image onClick={toggle} src={supportedLanguage[locale].img} alt={`${locale}`} height={40} width={40} className={classes.langToogle} />
            </Menu.Target>
            <Menu.Dropdown>
                {i18n.locales.map((locale) => {
                    return (
                        <Menu.Item key={locale} onClick={() => redirectToPathname(locale)}>
                            <span className={classes.link}>
                                <Image src={supportedLanguage[locale].img} alt={`${locale}`} height={15} width={20} className={classes.flag} />
                                {supportedLanguage[locale].label}</span>
                        </Menu.Item>
                    )
                })}
            </Menu.Dropdown>
        </Menu>
    )
}