import { Button, Container } from "@mantine/core";
import classes from './TextCard.module.scss';
import Link from "next/link";

type TextCardProps = {
    title: string,
    description: string,
    button?: string,
    buttonColor?: string,
    buttonHref?: string
}

export const TextCard = ({ data }: { data: TextCardProps }) => {
    const { title, description, button, buttonColor, buttonHref } = data;

    return (
        <div>
            <Container>
                <section className={classes.horizontalSection}>
                    <h1>
                        {title}
                    </h1>
                    <img
                        src='https://ik.imagekit.io/lindahestia/articles/gold_separator_premium%20copy.tiff?updatedAt=1767540175744'
                        alt='Separation'
                        className={`${classes.horizontalSectionDivider} mb-5`}
                    />
                    <p>
                        {description}
                    </p>
                    {button && <Button color={buttonColor} component={Link} href={buttonHref ?? ''}>
                        {button}
                    </Button>}
                </section>
            </Container>
        </div>
    )
}