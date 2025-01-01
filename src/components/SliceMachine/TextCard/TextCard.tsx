import { Button, Container } from "@mantine/core";
import classes from './TextCard.module.scss';

export const TextCard = () => {
    const buttonColor = 'black';

    return (
        <div>
            <Container>
                <section className={classes.horizontalSection}>
                    <h1>
                        Trois générations de savoir-faire et d'excellence
                    </h1>
                    <img
                        src='https://lesthesdemilie.com/assets/IMAGES/HOME/Separation.png'
                        alt='Separation'
                        className={`${classes.horizontalSectionDivider} mb-5`}
                    />
                    <p>
                        Depuis trois générations, notre maison incarne l’excellence dans
                        l’art du tapis. Du conseil à l'entretien, nous vous accompagnons
                        pour sublimer vos intérieurs
                    </p>
                    <Button color={buttonColor}>
                        En savoir plus
                    </Button>
                </section>
            </Container>
        </div>
    )
}