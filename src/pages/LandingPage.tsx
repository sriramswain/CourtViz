import { Button } from "@/components/ui/button";
import { Moon, Sun, Clock, CheckCircle, Target, Eye, Video, BarChart3, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex-1">
        <a className="flex items-center" href="#">
          <CourtIcon className="h-6 w-6" />
          <span className="ml-2 font-bold text-lg">CourtViz.io</span>
        </a>
      </div>
      <nav className="hidden md:flex gap-6">
        <a className="text-sm font-medium hover:underline underline-offset-4 relative top-[1px]" href="#">
          Features
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4 relative top-[1px]" href="#">
          Testimonials
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4 relative top-[1px]" href="#">
          Pricing
        </a>
      </nav>
      <div className="flex-1 flex items-center justify-end gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4 relative top-[1px]" to="/signup">
          Sign Up
        </Link>
        <Button 
          variant="default" 
          className="bg-orange-500 hover:bg-orange-600 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground"
        >
          Join Pilot
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="w-full pt-22 md:pt-30 lg:pt-36 pb-12 md:pb-24 lg:pb-32 bg-gradient-to-b from-orange-50 to-transparent dark:from-black dark:to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] lg:items-center">
          <div className="flex flex-col justify-center space-y-8 pl-14">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Game Plan Smarter. <br />
                <span className="text-orange-500 pt-2 inline-block">Save Hours.</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground dark:text-foreground md:text-xl">
                CourtViz.io uses AI to automatically break down & categorize film
                <br />
                — so you can focus on coaching.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground"
              >
                Join Our Free Pilot Program
              </Button>
              <Button size="lg" variant="demo">
                <PlayIcon className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-foreground sm:gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Save 5+ hours per opponent</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>99% accuracy on key plays</span>
              </div>
            </div>
          </div>
          <div className="relative transform lg:-translate-x-4">
            <div className="bg-[#151F32] dark:bg-slate-950 backdrop-blur-sm border border-slate-800 px-6 pt-5 pb-6 rounded-2xl shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <p className="text-sm font-medium text-slate-400">CourtViz.io Analysis</p>
              </div>

              {/* Opponent Info */}
              <div className="mb-6">
                <span className="font-semibold text-slate-50">Opponent: Duke Blue Devils</span>
              </div>

              {/* Plays list */}
              <div className="space-y-3 text-sm">
                {/* Spain PnR */}
                <div className="flex justify-between items-center rounded-lg px-4 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-300">
                  <span className="font-medium">Spain PnR - High Percentage Look</span>
                  <span className="text-blue-300/80">2:13</span>
                </div>
                {/* 3PT Miss */}
                <div className="flex justify-between items-center rounded-lg px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400">
                  <span className="font-medium">Transition 3PT Miss - Corner</span>
                  <span className="text-red-400/80">4:07</span>
                </div>
                {/* Horns Set */}
                <div className="flex justify-between items-center rounded-lg px-4 py-3 bg-green-500/10 border border-green-500/30 text-green-400">
                  <span className="font-medium">Horns Set - Open Layup</span>
                  <span className="text-green-400/80">7:42</span>
                </div>
                {/* Turnover */}
                <div className="flex justify-between items-center rounded-lg px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                  <span className="font-medium">Turnover - Live Ball</span>
                  <span className="text-yellow-400/80">11:29</span>
                </div>
              </div>

              {/* Footer caption */}
              <p className="text-center text-xs text-slate-400 mt-8">AI automatically tags & timestamps every possession</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Optimize Your Preparation</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pt-4 mx-auto">
                            CourtViz.io Optimizes Your Time So You Can Focus On What Matters Most
                            <br />
                            <span className="ml-2">-&gt;</span> Developing The Game Plan &amp; Coaching Your Players
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 pt-12">
                    <FeatureCard
                        icon={<Target className="h-7 w-7 text-orange-500" />}
                        title="Auto-Tagged Actions"
                        description="AI instantly identifies and tags every possession with a timestamp and label -- makes, misses, turnovers, rebounds, change of possession, etc..."
                    />
                    <FeatureCard
                        icon={<Eye className="h-7 w-7 text-blue-500" />}
                        title="Set Detection"
                        description="Automatically recognizes common sets on both offense and defense: Zone, Man, Horns, Spain PnR, Motion Offense, etc. with 99% accuracy."
                    />
                    <FeatureCard
                        icon={<Video className="h-7 w-7 text-green-500" />}
                        title="Instant Clip Generation"
                        description="Generate shareable video clips of specific plays in seconds - no more manual scrubbing through footage."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="h-7 w-7 text-purple-500" />}
                        title="Advanced Analytics"
                        description="Get detailed breakdowns of tendencies, efficiency by play type, situational analysis, and more."
                    />
                </div>
            </div>
        </section>
    );
};

const CTASection = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-background dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
              Ready to Revolutionize Your
              <span className="block mt-2">Film Study?</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join coaches who are already saving hours every week with AI-powered analysis.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-2">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-primary-foreground">
              Start Free Pilot Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-slate-500 text-white border-slate-500 hover:bg-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-600">
              Schedule Meeting
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free pilot program</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Setup in minutes</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground pt-4">
            Contact <a href="mailto:arrishsingh23@gmail.com" className="underline text-orange-500 hover:text-orange-400">arrishsingh23@gmail.com</a> for more details.
          </p>
        </div>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-background dark:bg-slate-950 text-slate-400 pt-6 pb-10 px-4 md:px-6 border-t border-slate-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CourtIcon className="h-8 w-8 text-foreground" />
              <span className="text-foreground">© 2025 CourtViz.io</span>
            </div>
            <p className="text-muted-foreground hidden sm:block">Revolutionizing basketball film study with AI</p>
        </div>
      </div>
    </footer>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
    return (
        <div className="grid gap-4 p-6 rounded-lg bg-[hsl(217.2,32.6%,17.5%)] text-[hsl(210,40%,98%)] shadow dark:bg-card dark:text-card-foreground">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-black/20">
                {icon}
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-[hsl(215,20.2%,65.1%)] dark:text-muted-foreground">{description}</p>
        </div>
    );
};

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

// SVG Icons
const CourtIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15l4-4" />
        <path d="M12 21a9 9 0 0 0 9-9" />
        <path d="M20 9l-4 4" />
        <path d="M12 3a9 9 0 0 0-9 9" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

export default LandingPage;
