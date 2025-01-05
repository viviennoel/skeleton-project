'use client'

import { Menu } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import Image from 'next/image';
import classes from './LanguageSelector.module.scss'


import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n-config";
import { Locale } from "@/src/types/Header";
import Cookies from "js-cookie";

export const LanguageSelector = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const pathname = usePathname();
    const Router = useRouter();
    const locale = pathname.split("/")[1] as Locale;

    const redirectToPathname = (locale: 'en' | 'fr') => {
        Cookies.set('NEXT_LOCALE', locale);

        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        Router.push(segments.join("/"));
    };

    const supportedLanguage = {
        fr: { label: 'français', img: 'https://res.cloudinary.com/djlwtz7qw/image/upload/v1735777019/DALL_E_2025-01-02_01.15.52_-_A_square_image_of_the_French_flag_designed_with_a_satin-like_draped_texture._The_flag_s_colors_muted_blue_white_and_red_flow_softly_with_elegant_f_kfhi8i.webp' },
        en: { label: 'english', img: 'https://res.cloudinary.com/djlwtz7qw/image/upload/v1735777019/DALL_E_2025-01-02_01.16.40_-_A_square_image_of_the_British_flag_Union_Jack_designed_with_a_satin-like_draped_texture._The_flag_s_colors_muted_red_white_and_blue_flow_softly_lkzcgg.webp' }
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