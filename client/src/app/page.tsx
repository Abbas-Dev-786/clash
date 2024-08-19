import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <h1 className="text-red-500 text-2xl uppercase">This is a home page</h1>
      <Button variant={"destructive"}>Test Button</Button>
    </main>
  );
}
