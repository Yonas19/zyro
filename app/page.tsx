import Link from "next/link";
import { CheckCircle2, MessageSquare, Database, Menu } from "lucide-react";
import { Caveat, Inter } from "next/font/google";

// Initialize Google Fonts
const caveat = Caveat({ subsets: ["latin"], weight: "700" });
const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  return (
    <div className={`min-h-screen bg-white text-slate-900 ${inter.className} overflow-x-hidden`}>

      {/* Navigation - Responsive */}
      <nav className="flex items-center justify-between px-6 py-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00A4F3] flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-2xl font-extrabold tracking-tighter text-slate-800">zyro</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="#features" className="hover:text-slate-900 transition">Features</Link>
          <Link href="#integrations" className="hover:text-slate-900 transition">Integrations</Link>
          <Link href="#pricing" className="hover:text-slate-900 transition">Pricing</Link>
        </div>

        {/* Desktop CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-semibold bg-[#714B67] hover:bg-[#5a3b52] text-white px-5 py-2.5 rounded-lg transition shadow-sm"
            >
              Try it free
            </Link>
          </div>
          {/* Mobile Hamburger Icon */}
          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section - Fixed Scaling */}
      <main className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 flex flex-col items-center text-center px-4 sm:px-6 w-full">

        {/* Headline - Scaled down so 14 letters fit perfectly */}
        <h1 className="font-extrabold tracking-tight mb-8 w-full flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-5">
          <span className={`${caveat.className} text-[#00A4F3] text-[11vw] sm:text-7xl md:text-8xl lg:text-[90px] leading-none`}>
            Conversational
          </span>
          <span className="text-slate-900 text-5xl sm:text-6xl md:text-7xl lg:text-[80px]">teamwork</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          The AI-native operations hub to plan, track, and deliver faster across all your tools using just text messages.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto text-base font-semibold bg-[#714B67] hover:bg-[#5a3b52] text-white px-8 py-4 rounded-xl transition shadow-md"
          >
            Start now - It's free
          </Link>
          <Link
            href="/demo"
            className="w-full sm:w-auto text-base font-semibold bg-white hover:bg-slate-50 text-[#714B67] px-8 py-4 rounded-xl transition shadow-sm border border-slate-200"
          >
            Meet an advisor
          </Link>
        </div>
        <p className="text-sm text-slate-400 mb-16 font-medium">Free, forever, with unlimited users.</p>

        {/* Floating App Mockup */}
        <div className="w-full max-w-5xl mx-auto relative z-10">
          <div className="bg-white rounded-xl sm:rounded-t-2xl sm:rounded-b-none border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">

            {/* Mockup Header */}
            <div className="border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A4F3]" />
                  <span className="font-semibold text-xs sm:text-sm text-slate-800 hidden sm:inline-block">Notion Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#714B67]" />
                  <span className="font-semibold text-xs sm:text-sm text-slate-800 hidden sm:inline-block">Slack Alerts</span>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>

            {/* Mockup Body */}
            <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-slate-50/50 min-h-[250px] sm:min-h-[350px] text-left">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-sm sm:text-base text-slate-800">Update Q3 Marketing Budget</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 ml-8">Added via WhatsApp • 2 mins ago</p>
                <div className="flex justify-between items-center text-xs font-semibold ml-8">
                  <span className="text-slate-400">1/3 Tasks</span>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-md border border-amber-100">Pending</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold text-sm sm:text-base text-slate-800">Deploy Webhook Router</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 ml-8">Added via iMessage • 1 hr ago</p>
                <div className="flex justify-between items-center text-xs font-semibold ml-8">
                  <span className="text-slate-400">5/5 Tasks</span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100">Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full -z-10 blur-3xl"></div>
        </div>
      </main>
    </div>
  );
}