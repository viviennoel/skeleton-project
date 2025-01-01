import classes from './SquareCard.module.scss'

export const SquareCard = ({ data }: { data: { image: string; title: string; description: string; link: string } }) => {

    return (
        <a href={data.link} className={classes.link}>
            <div className={`${classes.card} g-col-6 g-col-md-4`}
                style={{ background: "url('https://res.cloudinary.com/djlwtz7qw/image/upload/c_thumb,w_200,g_face/v1735653817/blog-media/vhmy1rwwb03l3prj0mck.webp') top center/cover no-repeat" }}
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