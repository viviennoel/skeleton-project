import { WebsiteData } from "@/src/types/dictionaries";
import { getDictionary } from "./dictionaries";
import { SliceMachine } from "@/src/components/SliceMachine/SliceMachine";

export default async function HomePage({
  params }: {
    params: Promise<{ lang: 'en' | 'fr' }>;
  }) {
  const { lang } = await params;
  const dictionary: WebsiteData = await getDictionary(lang);

  return <div>
    <SliceMachine data={dictionary.pages.home.slices!} />
  </div>
}
