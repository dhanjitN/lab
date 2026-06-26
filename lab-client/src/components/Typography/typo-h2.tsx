export function TypoH2({ text }: { text: string }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2  text-3xl hidden md:block font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  );
}
