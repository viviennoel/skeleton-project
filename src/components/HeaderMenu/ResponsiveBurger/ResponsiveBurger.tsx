'use client'

import { Burger, Menu, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconSettings, IconMessageCircle, IconPhoto, IconSearch, IconArrowsLeftRight, IconTrash } from "@tabler/icons-react"

export const ResponsiveBurger = () => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <Menu.Target>
                <Burger opened={opened} onClick={toggle} size="lg" hiddenFrom="sm" />
            </Menu.Target>
            <Menu.Dropdown hiddenFrom="sm">
                <Menu.Label>Application</Menu.Label>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Settings
                </Menu.Item>
                <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                    Messages
                </Menu.Item>
                <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
                    Gallery
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
                    rightSection='⌘K'
                >
                    Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
                >
                    Transfer my data
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                >
                    Delete my account
                </Menu.Item>
            </Menu.Dropdown>
        </>
    )
}