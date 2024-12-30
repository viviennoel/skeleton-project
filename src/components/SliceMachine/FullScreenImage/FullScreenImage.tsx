'use client';

import Image from 'next/image';
import { Box, Container, px, SimpleGrid, Skeleton, Stack, useMantineTheme } from '@mantine/core';
import classes from './FullScreenImage.module.scss'

type FullscreenImageProps = {
    src: string;
    alt: string;
    priority?: boolean; // Optional prop for Next.js image priority
};

const FullscreenImage = ({ src, alt, priority = false }: FullscreenImageProps) => {
    const theme = useMantineTheme();
    const getChild = (height: number) => <Skeleton height={height} radius="md" animate={false} />;
    const BASE_HEIGHT = 360;
    const getSubHeight = (children: number, spacing: number) =>
        BASE_HEIGHT / children - spacing * ((children - 1) / children);

    return (
        <>
            <Box className={classes.box}>
                <Image
                    src={src}
                    alt={alt}
                    layout='fill'
                    objectFit='cover'
                    className={classes.background}
                />
            </Box>
            <Container my="md" className={classes.grid}>
                <SimpleGrid cols={{ base: 1, xs: 2 }}>
                    <Stack>
                        {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
                        {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
                        {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
                    </Stack>
                    {getChild(BASE_HEIGHT)}
                </SimpleGrid>
            </Container>
        </>

    );
};

export default FullscreenImage;
