import { Slice } from "@/src/types/dictionaries";
import FullscreenImage from "./FullScreenImage/FullScreenImage";
import VerticalCardList from "./VerticalCardList/VerticalCardList";
import { SquareCardList } from "./SquareCardList/SquareCardList";
import { GridPresentation } from "./GridPresentation/GridPresentation";
import { CardsCarousel } from "./CardsCarousel/CardsCarousel";
import { HorizontalTextCard } from "./HorizontalTextCard/HorizontalTextCard";
import { TextCard } from "./TextCard/TextCard";

export const SliceMachine = ({ data, articles, products }: { data: Slice[], articles?: any, products?: any }) => {
    return data.map(slice => {
        switch (slice.type) {
            case 'homepage-banner':
                return <FullscreenImage src={slice.src ?? ''} alt={slice.alt ?? ''} />;

            case 'vertical-card-list':
                if (articles) {
                    // @ts-ignore
                    return <VerticalCardList articles={articles} type="article" />;
                }
                if (products) {
                    // @ts-ignore
                    return <VerticalCardList articles={products} type="product" />;
                }
                return null; // Fallback if neither articles nor products are provided

            case 'square-card-list':
                // @ts-ignore
                return <SquareCardList services={slice.data} />;

            case 'grid-presentation':
                // @ts-ignore
                return <GridPresentation services={slice.services} contactInfo={slice.contactInfo} />;

            case 'cards-carousel':
                return <CardsCarousel />;

            case 'horizontal-text-card':
                return <HorizontalTextCard />

            case 'text-card':
                return <TextCard />

            default:
                console.log('pas banner')
                return
        }
    }
    )
}