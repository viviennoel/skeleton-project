import { Button, Container } from "@mantine/core";
import classes from './HorizontalTextCard.module.scss';
import Link from "next/link";

type HorizontalTextCardProps = {
    title: string,
    description: string,
    backgroundGradient: string,
    button: string,
    buttonColor: string,
    buttonHref: string
}


export const HorizontalTextCard = ({ data }: { data: HorizontalTextCardProps }) => {
    const { title, description, backgroundGradient, button, buttonColor, buttonHref } = data;

    return (
        <div style={{ backgroundImage: backgroundGradient }} className={classes.fullWidthWrapper}>
            <Container>
                <section className={classes.horizontalSection}>
                    <h1 className={classes.title}>
                        {title}
                    </h1>
                    <img
                        src='https://lesthesdemilie.com/assets/IMAGES/HOME/Separation.png'
                        alt='Separation'
                        className={`${classes.horizontalSectionDivider} mb-5`}
                    />
                    <p>
                        {description}
                    </p>
                    <Button color={buttonColor} component={Link} href={buttonHref} my='lg'>
                        {button}
                    </Button>
                </section>
            </Container>
        </div>
    )
}