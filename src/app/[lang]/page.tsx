import { getDictionary } from "./dictionaries";
import { SliceMachine } from "@/src/components/SliceMachine/SliceMachine";

export default async function HomePage({
  params }: {
    params: Promise<{ lang: 'en' | 'fr' }>;
  }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <div>My Post: {dictionary.pages.home.title}
    <SliceMachine data={dictionary.pages.home.slices} />
  </div>
}
