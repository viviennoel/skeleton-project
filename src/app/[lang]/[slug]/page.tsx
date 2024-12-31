import { Locale } from "@/src/types/Header";
import { getDictionary } from "../dictionaries";
import { SliceMachine } from "@/src/components/SliceMachine/SliceMachine";
import Error404 from "@/src/components/Error/Error404";

export default async function Page({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
    const { lang, slug } = await params;
    const dictionary: Record<string, any> = await getDictionary(lang);

    if (!dictionary.pages[slug]) {
        return <Error404 />
    }

    return <div>
        <SliceMachine data={dictionary.pages[slug].slices} />
    </div>
}