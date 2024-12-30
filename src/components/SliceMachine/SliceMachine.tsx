import { Slice } from "@/src/types/dictionaries";
import FullscreenImage from "./FullScreenImage/FullScreenImage";
import VerticalCardList from "./VerticalCardList/VerticalCardList";

export const SliceMachine = ({ data }: { data: Slice[] }) => {
    return data.map(slice => {
        switch (slice.type) {
            case 'homepage-banner':
                return <FullscreenImage src={slice.src ?? ''} alt={slice.alt ?? ''} />
            case 'vertical-card-list':
                return <VerticalCardList />

            default:
                console.log('pas banner')
                return
        }
    }
    )
}