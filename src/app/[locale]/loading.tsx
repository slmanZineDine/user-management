import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
   return (
      <div className="space-y-6 container section-padding">
         {/* Page Title Skeleton */}
         <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
         </div>

         {/* Filter and Add Button Section Skeleton */}
         <div className="container flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
         </div>

         {/* Table Skeleton */}
         <div className="rounded-md border">
            <div className="p-4">
               <Skeleton className="h-8 w-full" />
            </div>
            <div className="space-y-4 p-4">
               {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                     <Skeleton className="h-12 w-12 rounded-full" />
                     <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                     </div>
                     <Skeleton className="h-8 w-24" />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
