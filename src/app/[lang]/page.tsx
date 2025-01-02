import { WebsiteData } from "@/src/types/dictionaries";
import { getDictionary } from "./dictionaries";
import { SliceMachine } from "@/src/components/SliceMachine/SliceMachine";
import { connect, close } from "@/src/lib/providers/mongodb";
import Error404 from "@/src/components/Error/Error404";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>;
}) {
  const { lang } = await params;
  //@ts-ignore
  const dictionary: WebsiteData = await getDictionary(lang);

  async function getLatestArticles() {
    let client;

    try {
      client = await connect(); // Use the custom MongoDB provider
      const db = client.db("blogDB");

      // Fetch the 3 latest articles with only required fields
      const articles = await db
        .collection("articles")
        .find({})
        .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
        .limit(3) // Limit to 3 results
        .toArray();

      return articles.map((article) => ({
        ...article,
        _id: article._id.toString(),
        createdAt: article.createdAt?.toString(),
      }));
    } catch (error) {
      console.error("Error connecting to MongoDB or fetching latest articles:", error);
      return [];
    } finally {
      if (client) {
        await close(client); // Close the connection using the custom provider
      }
    }
  }

  // Await the result of getLatestArticles
  const articles = await getLatestArticles();

  if (!articles) {
    return <Error404 />;
  }

  return (
    <SliceMachine data={dictionary.pages.home.slices!} articles={articles} />
  );
}
