export function TypoH3({ text }: { text: string }) {
  return (
    <h3 className="scroll-m-20 hidden md:block text-2xl font-semibold tracking-tight">
      {text}
    </h3>
  );
}
