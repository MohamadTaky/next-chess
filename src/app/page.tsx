import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Link from "next/link";

export default function Home() {
  return (
    <Card asChild className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4">
      <section>
        <Button className="w-full" asChild>
          <Link href="/local">play locally</Link>
        </Button>
        <div className="relative isolate">
          <span className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-black/80" />
          <div className="relative mx-auto grid aspect-square w-10 place-items-center bg-fill-2">or</div>
        </div>
        <Button className="w-full" asChild>
          <Link href="/room">play online</Link>
        </Button>
      </section>
    </Card>
  );
}
