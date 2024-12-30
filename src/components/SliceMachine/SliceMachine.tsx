import FullscreenImage from "./FullScreenImage/FullScreenImage";

export const SliceMachine = ({ data }: { data: { type: string, src: string, alt: string }[] }) => {
    console.log(data)

    return data.map(slice => {
        console.log(slice)

        switch (slice.type) {
            case 'homepage-banner':
                return (
                    <FullscreenImage src={slice.src} alt={slice.alt} />
                );

            default:
                console.log('pas banner')
                return
        }
    }
    )
}