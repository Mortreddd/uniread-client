export default function BookCover({ coverImage }: { coverImage: string }) {
  return (
    <div className="relative aspect-[2/3] max-h-72 md:max-h-80 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 group">
      <img src={coverImage} className="object-cover size-full" />
    </div>
  );
}
