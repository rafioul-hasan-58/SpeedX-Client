import { Skeleton } from "@/components/ui/skeleton";

const BikeCardSkeleton = () => {
  return (
    <article className="border bg-white border-gray-200 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 h-full lg:max-h-[390px] max-w-[400px]">

      {/* Image placeholder */}
      <Skeleton className="h-96 w-full rounded-t-lg border-b border-gray-200 bg-sky-100 animate-pulse" />

      <div className="flex flex-col justify-between p-4 h-full">

        {/* Title and tag (e.g., NEW / SOLD) */}
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-5 w-[80%] bg-sky-100 animate-pulse" />
          <Skeleton className="h-[22px] w-[50px] rounded-full bg-sky-200 animate-pulse" />
        </div>

        {/* Price */}
        <Skeleton className="h-6 w-[100px] mb-1 bg-sky-100 animate-pulse" />

        {/* Colors */}
        <div className="mb-3 space-y-1">
          <Skeleton className="h-4 w-[120px] bg-sky-100 animate-pulse" />
          <Skeleton className="h-4 w-[80%] bg-sky-50 animate-pulse" />
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-col lg:flex-row gap-2">
          <Skeleton className="h-10 w-full rounded-full bg-sky-100 animate-pulse" />
          <Skeleton className="h-10 w-full rounded-full bg-sky-100 animate-pulse" />
        </div>
      </div>
    </article>
  );
};

export default BikeCardSkeleton;
