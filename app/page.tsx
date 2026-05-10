import Link from "next/link";
import { CheckCircle2, MessageSquare, Database } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-800">zyro</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-slate-900 transition">Features</Link>
          <Link href="#integrations" className="hover:text-slate-900 transition">Integrations</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium bg-[#714B67] hover:bg-[#5a3b52] text-white px-5 py-2.5 rounded-md transition shadow-sm">
            Try it free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-20 pb-16 sm:pt-28 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl mx-auto text-center w-full">
          <span className="text-[#00A4F3] font-serif italic tracking-normal block md:inline md:mr-4 mb-2 md:mb-0">Conversational</span>
          <span className="text-slate-900">teamwork</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
          The AI-native operations hub to plan, track, and deliver faster across all your tools using just text messages.
        </p>

        {/* Floating App Mockup */}
        <div className="w-full max-w-5xl mx-auto relative z-10 mt-12">
          <div className="bg-white rounded-t-xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="border-b border-slate-100 p-4 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#00A4F3]" />
                  <span className="font-semibold text-sm text-slate-800">Notion Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#714B67]" />
                  <span className="font-semibold text-sm text-slate-800">Slack Alerts</span>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 min-h-[250px]">
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-sm">Update Q3 Marketing Budget</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Added via WhatsApp • 2 mins ago</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span className="font-semibold text-sm">Review Client Onboarding</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Added via iMessage • 1 hr ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}