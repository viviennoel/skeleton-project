import { Locale } from "@/src/types/Header";
import { getDictionary } from "../dictionaries";
import { SliceMachine } from "@/src/components/SliceMachine/SliceMachine";

export default async function Page({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
    const { lang, slug } = await params;
    const dictionary = await getDictionary(lang);

    // @ts-ignore: Unreachable code error
    return <div>My Post: {dictionary.pages[slug]?.title}
        {/* <SliceMachine data={dictionary.pages[slug].slices} /> */}
    </div>
}