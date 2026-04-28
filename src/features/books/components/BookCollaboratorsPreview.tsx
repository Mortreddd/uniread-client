import { CollaboratorPreview } from "@/features/users/types/User";
import author from "@/assets/author-0.png";

interface BookCollaboratorsPreviewProps {
  collaborators: CollaboratorPreview[];
}

export default function BookCollaboratorsPreview({
  collaborations = [],
}: BookCollaboratorsPreviewProps) {
  return (
    <div className="inline-flex items-center -space-x-2  md:-space-x-2.5">
      {[1, 2, 3, 4].map((num, key) => (
        <img
          key={key}
          src={author}
          alt={`${num}`}
          className={
            "size-4 md:size-6 lg:size-8 rounded-full border border-solid border-primary dark:border-primary-dark object-center object-cover"
          }
        />
      ))}
    </div>
  );
}
