import { Slice } from "@/src/types/dictionaries";
import FullscreenImage from "./FullScreenImage/FullScreenImage";
import VerticalCardList from "./VerticalCardList/VerticalCardList";

export const SliceMachine = ({ data, articles, products }: { data: Slice[], articles?: any, products?: any }) => {
    return data.map(slice => {
        switch (slice.type) {
            case 'homepage-banner':
                return <FullscreenImage src={slice.src ?? ''} alt={slice.alt ?? ''} />;

            case 'vertical-card-list':
                if (articles) {
                    return <VerticalCardList articles={articles} type="article" />;
                }
                if (products) {
                    return <VerticalCardList articles={products} type="product" />;
                }
                return null; // Fallback if neither articles nor products are provided


            default:
                console.log('pas banner')
                return
        }
    }
    )
}