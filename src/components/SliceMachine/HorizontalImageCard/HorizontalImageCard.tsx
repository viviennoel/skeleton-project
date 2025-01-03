'use client'

import { Button, Container, Grid } from "@mantine/core";
import Link from "next/link";
import classes from './HorizontalImageCard.module.scss';

type HorizontalImageCardProps = {
    title: string;
    description: string;
    backgroundGradient: string;
    button?: string;
    buttonColor?: string;
    buttonHref?: string;
    position: "left" | "right";
    src: string; // URL for the image
};

export const HorizontalImageCard = ({ data }: { data: HorizontalImageCardProps }) => {
    const { title, description, button, buttonColor, buttonHref, position, src } = data;

    return (
        <div className={classes.wrapper}>
            <Container>
                <Grid
                    align="center"
                    gutter="lg"
                    className={classes.grid}
                    style={{
                        flexDirection: position === "left" ? "row-reverse" : "row", // Dynamically reverse layout
                    }}
                >
                    {/* Image Column */}
                    {position === "left" && <Grid.Col span={{ base: 12, sm: 6, }} className={classes.imageCol}>
                        <h2 className={classes.titleMobile}>{title}</h2>
                        <img src={src} alt={title} className={classes.image} />
                    </Grid.Col>}

                    {/* Text Column */}
                    <Grid.Col span={{ base: 12, sm: 6 }} className={classes.textCol}>
                        <h2 className={classes.title}>{title}</h2>
                        <p className={classes.description}>{description}</p>
                        {button && <Button
                            color={buttonColor}
                            component={Link}
                            href={buttonHref ?? ''}
                            size="md"
                            className={classes.button}
                        >
                            {button}
                        </Button>}
                    </Grid.Col>

                    {position !== "left" && <Grid.Col span={{ base: 12, sm: 6, }} className={classes.imageCol}>
                        <h2 className={classes.titleMobile}>{title}</h2>
                        <img src={src} alt={title} className={classes.image} />
                    </Grid.Col>}
                </Grid>
            </Container>
        </div>
    );
};
