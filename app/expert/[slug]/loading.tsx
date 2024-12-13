import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-6xl mx-auto pt-24 px-4 pb-16">
      {/* Hero Section Skeleton */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl" />
        <div className="relative flex flex-col md:flex-row items-start gap-8 p-8">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex-grow space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-40" />
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <Card key={i} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-6 w-20 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          {[1, 2].map((i) => (
            <Card key={i} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}