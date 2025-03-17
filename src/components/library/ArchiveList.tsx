import withHover from "../withHover";
import ArchiveBook from "./ArchiveBook";

export default function ArchiveList() {
  const bookdIds: number[] = [1, 2, 3];
  const ArchiveBookWithHover = withHover(ArchiveBook);
  return (
    <div className="w-full h-full">
      <div className="w-full h-fit flex items-start gap-3 flex-wrap">
        {bookdIds.map((_: number, key: number) => (
          <ArchiveBookWithHover key={key} />
        ))}
      </div>
    </div>
  );
}
