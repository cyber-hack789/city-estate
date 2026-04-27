"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";

const conversations = [
  { id: "1", name: "Rahul Sharma", lastMsg: "Is the apartment still available?", time: "2 min ago", unread: 2 },
  { id: "2", name: "Priya Patel", lastMsg: "Thanks for the info, I will visit tomorrow", time: "1 hour ago", unread: 0 },
  { id: "3", name: "Amit Kumar", lastMsg: "Can you share more photos?", time: "3 hours ago", unread: 1 },
];

export default function ProviderMessagesPage() {
  return (
    <DashboardShell role="provider">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500 mt-1">Chat with potential buyers</p>
        </div>
        <Card>
          <div className="divide-y divide-slate-50">
            {conversations.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">{c.name}</span>
                    <span className="text-xs text-slate-400">{c.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate mt-0.5">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{c.unread}</div>
                )}
              </div>
            ))}
          </div>
        </Card>
        <p className="text-center text-sm text-slate-400">Select a conversation to start chatting</p>
      </div>
    </DashboardShell>
  );
}
