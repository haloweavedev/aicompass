import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, Globe, Linkedin, Mail, MapPin } from 'lucide-react'

interface ExpertProfilePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const profile = await prisma.expertProfile.findUnique({
    where: { 
      profileSlug: params.slug,
      isPublished: true 
    }
  })

  if (!profile) return {}

  const profileData = profile.profileData as any

  return {
    title: `${profileData.name} - ${profileData.title} | AI Compass`,
    description: profileData.summary,
    openGraph: {
      title: `${profileData.name} - ${profileData.title}`,
      description: profileData.summary,
      type: 'profile',
    }
  }
}

export default async function ExpertProfilePage({ params }: ExpertProfilePageProps) {
  const profile = await prisma.expertProfile.findUnique({
    where: { 
      profileSlug: params.slug,
      isPublished: true 
    }
  })

  if (!profile) {
    notFound()
  }

  const profileData = profile.profileData as any

  return (
    <div className="container max-w-7xl mx-auto pt-24 px-4 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-16">
        {/* Left Column - Profile Info */}
        <div className="space-y-12">
          {/* Profile Section */}
          <div className="space-y-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profileData.avatar || `/placeholder.svg?height=128&width=128`} />
              <AvatarFallback>{profileData.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">{profileData.name}</h1>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-muted-foreground">Available</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">{profileData.title}</p>
              {profileData.company && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{profileData.company}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button className="w-full text-white" asChild>
                <a href="#schedule">Schedule Consultation</a>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={`mailto:${profile.email}`} aria-label="Email">
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
                {profile.linkedin && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {profile.github && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {profile.website && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
                      <Globe className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground mb-4">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.expertise?.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="rounded-full">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground mb-4">Availability</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Available for consultations and new projects
                </p>
                <Button className="w-full" variant="outline" id="schedule">
                  View Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-12">
          <div>
            <h2 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground mb-4">About</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-base leading-relaxed text-muted-foreground">
                {profileData.summary}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground mb-6">Project Highlights</h2>
            <div className="space-y-8">
              {profileData.projectHighlights?.map((project: any) => (
                <div key={project.name} className="group">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">{project.name}</h3>
                    <p className="text-base text-muted-foreground">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}