import classes from './SquareCard.module.scss'

export const SquareCard = ({ data }: { data: { image: string; title: string; description: string; link: string } }) => {

    return (
        <a href={data.link} className={classes.link}>
            <div className={`${classes.card} g-col-6 g-col-md-4`}
                style={{ background: `url(${data.image}) top center/cover no-repeat` }}
                key={data.link}
                data-aos='fade-up'
                data-aos-anchor-placement='center-bottom'
                data-aos-easing='ease'
                data-aos-duration='1000'
            >
                <div className={classes.cardContent}>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                </div>
            </div>
        </a>
    );
};