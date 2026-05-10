import { MessageSquare, Database, LayoutGrid, Settings } from "lucide-react";

export default function Dashboard() {
    const tools = [
        { name: "Notion", status: "Disconnected", icon: <Database className="w-6 h-6 text-slate-700" />, color: "bg-slate-100" },
        { name: "Slack", status: "Active", icon: <MessageSquare className="w-6 h-6 text-[#E01E5A]" />, color: "bg-rose-50" },
        { name: "Jira", status: "Disconnected", icon: <LayoutGrid className="w-6 h-6 text-[#0052CC]" />, color: "bg-blue-50" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Zyro Control Center</h1>
                        <p className="text-slate-500 mt-1">Manage your conversational integrations and active syncs.</p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-slate-200 transition">
                        <Settings className="w-6 h-6 text-slate-600" />
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <div key={tool.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between min-h-[160px]">
                            <div className="flex items-start justify-between">
                                <div className={`p-3 rounded-xl ${tool.color}`}>
                                    {tool.icon}
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tool.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {tool.status}
                                </span>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg text-slate-900">{tool.name}</h3>
                                <button className={`mt-3 w-full py-2.5 rounded-lg text-sm font-medium transition ${tool.status === 'Active' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                                    {tool.status === "Active" ? "Manage settings" : "Connect workspace"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}