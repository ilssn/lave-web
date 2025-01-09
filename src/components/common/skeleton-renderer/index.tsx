import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  element: "APP_CLIENT" | "EXAMPLE";
};

const SkeletonRenderer = ({ element }: Props) => {
  if (element === "APP_CLIENT") {
    return (
      <div className="flex size-full flex-col items-center">
        {/* Header skeletons */}
        <div className="flex w-full justify-end gap-x-4 p-4 shadow-sm">
          <Skeleton className="size-6" />
          <Skeleton className="size-6" />
          <Skeleton className="size-6" />
        </div>

        {/* Body skeletons */}
        <div className="flex w-full grow justify-center">
          <div className="w-full">
            <div className="mt-8 flex w-full items-center justify-center space-x-2">
              <Skeleton className="size-[40px] rounded-full md:size-[50px]" />
              <Skeleton className="h-8 w-[260px] md:h-10" />
            </div>
          </div>
        </div>

        {/* Footer skeletons */}
        <div className="flex flex-col items-center gap-y-2 p-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    );
  }
  // Render nothing for unhandled elements or "EXAMPLE"
  return null;
};

export default SkeletonRenderer;
