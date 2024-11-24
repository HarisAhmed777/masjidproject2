
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "MosqueName",
    email: "MosqueLocation",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Masjidal",
      logo: GalleryVerticalEnd,
      plan: "Masjid Project",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Timing",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Iqamah Timings",
          url: "/timings/iqama",
        },
        {
          title: "Salah Timings",
          url: "/timings/salah",
        },
        {
          title: "Azan Timings",
          url: "/timings/athan",
        },
      ],
    },
    {
      title: "Slide Show",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Content",
          url: "#",
        },
        {
          title: "New Content",
          url: "#",
        },
        
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Hijri Adjustments",
          url: "#",
        },
        {
          title: "Al Iqamah",
          url: "#",
        },
        {
          title: "Athan+",
          url: "#",
        },
        {
          title: "Donation Portal",
          url: "#",
        },
      ],
    },
    {
      title: "Intergrations",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Web Intergraions",
          url: "#",
        },
      ],
    },
    {
      title: "Account",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Masjid Info",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar(props) {
    return (
      <Sidebar collapsible="icon" {...props} >
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
         
        </SidebarContent>
        <SidebarFooter>
          <NavUser  user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }
  
