'use client'

import { useDictionary } from "@/src/dictionaries/dictionary-provider";
import { Burger, Menu, rem, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link";
import classes from "./ResponsiveBurger.module.scss"

export const ResponsiveBurger = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const dictionary = useDictionary();

    return (
        <>
            <Menu.Target>
                <Burger opened={opened} onClick={toggle} size="lg" hiddenFrom="md" />
            </Menu.Target>
            <Menu.Dropdown hiddenFrom="md">
                {dictionary.header.header.map(item => !item.links && item.link ?
                    <Menu.Item key={item.label}>
                        <Link className={classes.link} href={item.link} onClick={toggle}>{item.label}</Link>
                    </Menu.Item>
                    : item.links?.map((subItem, index) =>
                        <div key={item.link}>
                            {index === 0 && <Text px='md' pt='md' c="dimmed" size="sm">{item.label}</Text>}
                            <Menu.Item leftSection={<IconArrowRight style={{ width: rem(14), height: rem(14) }} />}>
                                <Link href={subItem.link} className={classes.link} onClick={toggle}>{subItem.label}</Link>
                            </Menu.Item></div>
                    )
                )}
            </Menu.Dropdown>
        </>
    )
}