import { Skeleton } from "@/components/ui/skeleton";

const BikeCardSkeleton = () => {
  return (
    <article className="border bg-white border-gray-200 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 h-full lg:max-h-[390px] max-w-[400px]">

      {/* Image placeholder */}
      <Skeleton className="h-48 w-full rounded-t-lg border-b border-gray-200" />

      <div className="flex flex-col justify-between p-4 h-full">

        {/* Title and tag (e.g., NEW / SOLD) */}
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-5 w-[80%]" />
          <Skeleton className="h-[22px] w-[50px] rounded-full" />
        </div>

        {/* Price */}
        <Skeleton className="h-6 w-[100px] mb-1" />

        {/* Colors */}
        <div className="mb-3 space-y-1">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-col lg:flex-row gap-2">
          <Skeleton className="h-10 w-full rounded-full" />
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    </article>
  );
};

export default BikeCardSkeleton;
