import { Skeleton } from "@mantine/core";

const SkeletonContent = ({ load }: { load?: boolean }) => {
  return (
    <div className="grid grid-cols-2 gap-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3">
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" visible={load} />
    </div>
  );
};

export default SkeletonContent;
