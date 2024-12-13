// app/expert/[slug]/layout.tsx
export default function ExpertProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/50 via-background to-background">
        {children}
      </div>
    )
  }
   