import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { MODULES, TOPICS, type ModuleId, type Topic } from '@/components/help/topics'
import { useHelp } from '@/components/help/HelpProvider'

function TopicCard({ topic, onOpen }: { topic: Topic; onOpen: () => void }) {
  return (
    <button
      type="button" onClick={onOpen}
      className="group flex w-full items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white px-3 py-2.5 text-left hover:border-[#1d56bc]"
    >
      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#09090b]">{topic.title}</span>
      <ChevronRight className="group-hover:text-dash-blue size-3.5 shrink-0 text-[#a1a1aa]" />
    </button>
  )
}

export default function Help() {
  const { showOnScreen } = useHelp()
  const [abiertos, setAbiertos] = useState<ModuleId[]>(['dashboard'])
  const alternar = (id: ModuleId) => setAbiertos((p) => (p.includes(id) ? p.filter((m) => m !== id) : [...p, id]))

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-[#09090b]">What can we help you with?</h1>
      <p className="mt-1 text-sm text-[#71717a]">Pick a topic and we'll take you to the screen it lives on, and explain it there.</p>

      <div className="mt-5 flex flex-col gap-3">
        {MODULES.map((m) => {
          const temas = TOPICS.filter((t) => t.module === m.id)
          if (!temas.length) return null
          const Icon = m.icon
          const abierto = abiertos.includes(m.id)
          return (
            <div key={m.id} className="overflow-hidden rounded-xl border border-[#e4e4e7] bg-white">
              <button
                type="button" onClick={() => alternar(m.id)} aria-expanded={abierto}
                className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-[#fafafa]"
              >
                <span className="bg-dash-count-bg text-dash-blue flex size-7 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-[#09090b]">{m.label}</span>
                  <span className="block truncate text-[11px] text-[#a1a1aa]">{m.blurb}</span>
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-2">
                  <span className="text-[11px] text-[#a1a1aa]">{temas.length} {temas.length === 1 ? 'topic' : 'topics'}</span>
                  <ChevronDown className={`size-3.5 text-[#a1a1aa] transition-transform ${abierto ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {abierto && (
                <div className="grid grid-cols-1 gap-2 border-t border-[#e4e4e7] p-3 sm:grid-cols-2 xl:grid-cols-3">
                  {temas.map((t) => (
                    <TopicCard key={t.id} topic={t} onOpen={() => showOnScreen(t.id)} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
