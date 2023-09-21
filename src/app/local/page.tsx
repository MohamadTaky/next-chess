import LocalBoard from "@/components/local/LocalBoard";
import LocalEndGameMenu from "@/components/local/LocalEndGameMenu";
import LocalPromotionMenu from "@/components/local/LocalPromotionMenu";

export default function LocalPage() {
  return (
    <section className="space-y-2">
      <LocalBoard />
      <LocalPromotionMenu />
      <LocalEndGameMenu />
    </section>
  );
}
