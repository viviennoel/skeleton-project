import { Slice } from "@/src/types/dictionaries";
import FullscreenImage from "./FullScreenImage/FullScreenImage";
import VerticalCardList from "./VerticalCardList/VerticalCardList";
import { SquareCardList } from "./SquareCardList/SquareCardList";
import { GridPresentation } from "./GridPresentation/GridPresentation";
import { CardsCarousel } from "./CardsCarousel/CardsCarousel";
import { HorizontalTextCard } from "./HorizontalTextCard/HorizontalTextCard";
import { TextCard } from "./TextCard/TextCard";

export const SliceMachine = ({ data, articles, products }: { data: Slice[], articles?: any, products?: any }) => {
    console.log(articles);
    return data.map(slice => {
        switch (slice.type) {
            case 'homepage-banner':
                // @ts-ignore
                return <FullscreenImage data={slice} />;

            case 'vertical-card-list':
                if (articles) {
                    // @ts-ignore
                    return <VerticalCardList articles={articles} data={slice} />;
                }
                if (products) {
                    // @ts-ignore
                    return <VerticalCardList articles={products} data={slice} />;
                }
                return null; // Fallback if neither articles nor products are provided

            case 'square-card-list':
                // @ts-ignore
                return <SquareCardList services={slice.data} />;

            case 'grid-presentation':
                // @ts-ignore
                return <GridPresentation services={slice.services} contactInfo={slice.contactInfo} />;

            case 'cards-carousel':
                // @ts-ignore
                return <CardsCarousel data={slice} />;

            case 'horizontal-text-card':
                // @ts-ignore
                return <HorizontalTextCard data={slice} />

            case 'text-card':
                // @ts-ignore
                return <TextCard data={slice} />

            default:
                console.log('pas banner')
                return
        }
    }
    )
}