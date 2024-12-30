'use client';

import Image from 'next/image';
import { Box } from '@mantine/core';
import classes from './FullScreenImage.module.scss'

type FullscreenImageProps = {
    src: string;
    alt: string;
    priority?: boolean; // Optional prop for Next.js image priority
};

const FullscreenImage = ({ src, alt, priority = false }: FullscreenImageProps) => {
    return (
        <Box className={classes.box}>
            <Image
                src={src}
                alt={alt}
                layout='fill'
                objectFit='cover'
                className={classes.background}
            />
        </Box>
    );
};

export default FullscreenImage;
