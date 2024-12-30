import { Locale } from "@/src/types/Header";
import { getDictionary } from "../dictionaries";
import { SliceMachine } from "@/src/components/SliceMachine/SliceMachine";

export default async function Page({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
    const { lang, slug } = await params;
    const dictionary: Record<string, any> = await getDictionary(lang);

    return <div>
        <SliceMachine data={dictionary.pages[slug].slices} />
    </div>
}