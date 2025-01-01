import { Button, Container } from "@mantine/core";
import classes from './HorizontalTextCard.module.scss';

export const HorizontalTextCard = () => {
    const buttonColor = 'black';
    const textColor = 'black';
    const backgroundGradient = "linear-gradient(to right, white, white)"

    return (
        <div style={{ backgroundImage: backgroundGradient }} className={classes.fullWidthWrapper}>
            <Container>
                <section className={classes.horizontalSection}>
                    <h1 className='mt-1 text-center text-white'>
                        Deux générations de savoir-faire
                    </h1>
                    <img
                        src='https://lesthesdemilie.com/assets/IMAGES/HOME/Separation.png'
                        alt='Separation'
                        className={`${classes.horizontalSectionDivider} mb-5`}
                    />
                    <p>
                        Depuis deux générations, notre maison incarne l’excellence dans
                        l’art du tapis. Chaque pièce de notre collection est minutieusement
                        sélectionnée pour son raffinement, son élégance et sa qualité
                        exceptionnelle. Forts d’un héritage familial et d’un amour profond
                        pour l’artisanat, nous avons su allier tradition et modernité pour
                        offrir à notre clientèle des tapis uniques, véritables œuvres d'art,
                        qui rehaussent la beauté de chaque intérieur. Chez nous, chaque
                        tapis raconte une histoire, tissée à travers le temps et les
                        cultures.
                    </p>
                    <Button color={buttonColor}>
                        En savoir plus
                    </Button>
                </section>
            </Container>
        </div>
    )
}