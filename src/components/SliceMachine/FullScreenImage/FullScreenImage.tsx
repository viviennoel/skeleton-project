'use client';

import Image from 'next/image';
import { Box, Button, useMantineTheme } from '@mantine/core';
import classes from './FullScreenImage.module.scss'
import Link from 'next/link';

type FullscreenImageProps = {
    src: string;
    alt: string;
    title: string, subtitle: string
};

const FullscreenImage = ({ data }: { data: FullscreenImageProps }) => {
    const { src, alt, title, subtitle } = data;
    return (
        <Box className={classes.box}>
            <Image
                src={src}
                alt={alt}
                layout='fill'
                objectFit='cover'
                className={classes.background}
            />
            <div className={classes.content}>
                <h1 className={classes.title}>{title}</h1>
                <h2 className={classes.subtitle}>{subtitle}</h2>
            </div>
        </Box>

    );
};

export default FullscreenImage;
