import { useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarCheck } from 'lucide-react'
import { Confibot, ConfibotLanzador, buscarRespuesta, type Mensaje } from './Confibot'
import { Bloque, Forzar, Lienzo, Muestra, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { escribir } from '@/design-system/play'

type Vista = 'button' | 'tucked' | 'chat'
type Args = { vista: Vista; overPageFab: boolean }

const conversacion = (pregunta: string): Mensaje[] => [{ de: 'user', texto: pregunta }, buscarRespuesta(pregunta)]
const nada = () => {}

/* Un pedazo de pantalla: el transform hace que los `fixed` de Confibot se ubiquen
   en esta caja y no en la del iframe, así entran varias muestras en una story. */
function Escena({ alto = 220, fab = false, children }: { alto?: number; fab?: boolean; children: ReactNode }) {
  return (
    <div className="bg-page-background relative w-full overflow-hidden rounded-lg border border-line [transform:translateZ(0)]" style={{ height: alto }}>
      {fab && (
        <span aria-hidden className="bg-dash-blue fixed right-8 bottom-8 flex size-[60px] items-center justify-center rounded-full text-white shadow-lg">
          <CalendarCheck className="size-6" />
        </span>
      )}
      {children}
    </div>
  )
}

const meta = {
  title: 'Components/Help/Confibot',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 640 },
      description: {
        component: [
          'El asistente que explica la app. **Flota abajo a la derecha** en todas las pantallas del shell (no en Login ni en Clinical Mode): un botón redondo con el degradé azul que, con el mouse o el foco encima, se estira y dice *Confibot*. Abre una hoja de chat que contesta llevando a la pantalla donde vive lo que se pregunta. También se abre desde *Confibot* en el menú lateral.',
          '',
          '**Convive con otros flotantes:** si la pantalla tiene su propio botón en esa esquina (Appointment requests en Scheduling), Confibot se apila 12px arriba en vez de taparlo. Se puede **recoger** con la flechita: queda una pestaña al pie que lo trae de vuelta, y se recuerda entre visitas.',
          '',
          '**Tipografía de la hoja:** la de los drawers. Título 18px Bold y bajada 12px; mensajes y sugerencias 13px; rótulos 11px en mayúsculas.',
          '',
          '**Probalo:** en *Playground* abrí el chat desde el botón, recogelo con la flechita y traelo con la pestaña; en *Controls* cambiá la vista de arranque y prendé *overPageFab* para verlo sobre el botón de Scheduling.',
        ].join('\n'),
      },
    },
  },
  args: { vista: 'button', overPageFab: false },
  argTypes: {
    vista: { control: 'inline-radio', options: ['button', 'tucked', 'chat'], description: 'Cómo arranca: el botón, recogido en la pestaña o con el chat abierto.' },
    overPageFab: { control: 'boolean', description: 'La pantalla tiene su propio botón flotante (Scheduling): Confibot se apila arriba.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

function Demo({ vista, overPageFab }: Args) {
  const [abierto, setAbierto] = useState(vista === 'chat')
  const [recogido, setRecogido] = useState(vista === 'tucked')
  return (
    <Escena alto={640} fab={overPageFab}>
      {!abierto && (
        <ConfibotLanzador
          recogido={recogido} sobreFab={overPageFab}
          onAbrir={() => setAbierto(true)} onRecoger={() => setRecogido(true)} onTraer={() => setRecogido(false)}
        />
      )}
      <Confibot abierto={abierto} onClose={() => setAbierto(false)} onShowOnScreen={nada} historialInicial={[]} />
    </Escena>
  )
}

export const Playground: Story = {
  render: (a) => <div className="p-4"><Demo key={`${a.vista}-${a.overPageFab}`} {...a} /></div>,
}

export const Parts: Story = {
  parameters: { ...sinControles, docs: { story: { inline: false, iframeHeight: 900 } } },
  render: () => (
    <div className="p-4">
      <Lienzo>
        <Bloque nota="El botón en reposo, con la flechita para recogerlo arriba; recogido, la pestaña al pie.">
          <div className="grid gap-4 md:grid-cols-2">
            <Escena><ConfibotLanzador recogido={false} onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
            <Escena><ConfibotLanzador recogido onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </div>
        </Bloque>
        <TablaPartes partes={[
          ['Floating button', 'Círculo de 48px con el degradé azul y el ícono Bot. Con el mouse o el foco se estira a "Confibot", se prende un halo con el mismo degradé que corre y un anillo blanco de 2px. Abre la hoja de chat.', 'ConfibotLanzador · onAbrir'],
          ['Tuck away', 'Flechita de 24px arriba del botón, con 40px de área de toque. Lo recoge: queda la pestaña al pie.', 'onRecoger'],
          ['Tucked tab', 'Pestaña de 32px pegada al borde de abajo. Trae el botón de vuelta (no abre el chat). Recogido o no se recuerda entre visitas.', 'recogido · onTraer · useConfibotRecogido'],
          ['Chat sheet', 'Saludo, sugerencias, la conversación y el campo para preguntar. Ocupa el lugar del botón mientras está abierta; en el celular sube desde abajo a todo el ancho.', 'Confibot'],
          ['Topic answer', 'Cada respuesta trae hasta tres temas de Help; tocar uno cierra el chat y lo explica sobre la pantalla real (CoachMark).', 'onShowOnScreen'],
          ['Menu item', 'Confibot en el menú lateral abre la misma hoja: es el camino que queda con el botón recogido.', 'Sidebar · useHelp().toggleConfibot'],
          ['Page FAB stacking', 'Una pantalla con su propio botón flotante lo avisa y Confibot se apila arriba; recogido, la pestaña se corre a la izquierda de ese botón.', 'sobreFab · useFabDePagina()'],
        ]} />
      </Lienzo>
    </div>
  ),
}

export const States: Story = {
  parameters: { ...sinControles, docs: { story: { inline: false, iframeHeight: 2300 } } },
  render: () => (
    <div className="p-4">
      <Lienzo>
        <div className="grid gap-6 md:grid-cols-2">
          <Muestra titulo="Resting" nota="El círculo y la flechita para recogerlo.">
            <Escena><ConfibotLanzador recogido={false} onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </Muestra>
          <Muestra titulo="Hover" nota="Se estira a Confibot, se prende el halo y el degradé corre. Con el foco del teclado se ve igual.">
            <Forzar selector=".group" estado="hover">
              <Escena><ConfibotLanzador recogido={false} onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
            </Forzar>
          </Muestra>
          <Muestra titulo="Tucked" nota="La pestaña pegada al borde de abajo; la trae de vuelta.">
            <Escena><ConfibotLanzador recogido onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </Muestra>
          <Muestra titulo="Over a page FAB (Scheduling)" nota="Centrado arriba del botón de Appointment requests, a 12px, en vez de taparlo.">
            <Escena alto={260} fab><ConfibotLanzador recogido={false} sobreFab onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </Muestra>
          <Muestra titulo="Tucked over a page FAB" nota="La pestaña se corre a la izquierda del botón de la pantalla.">
            <Escena fab><ConfibotLanzador recogido sobreFab onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </Muestra>
          <Muestra titulo="Hidden" nota="Con la hoja de chat o un CoachMark abiertos no se dibuja: ocupan su esquina. Un drawer abierto lo tapa (z-50 contra z-40).">
            <Escena><span className="absolute inset-0 flex items-center justify-center text-[12px] text-ink-faint">(nothing drawn)</span></Escena>
          </Muestra>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Muestra titulo="Open, empty" nota="Saludo y sugerencias. Send queda deshabilitado (disabled) mientras el campo está vacío.">
            <Escena alto={600}><Confibot abierto onClose={nada} onShowOnScreen={nada} historialInicial={[]} /></Escena>
          </Muestra>
          <Muestra titulo="Open, answered" nota="La pregunta y hasta tres temas que llevan a la pantalla.">
            <Escena alto={600}><Confibot abierto onClose={nada} onShowOnScreen={nada} historialInicial={conversacion('How do I add a patient?')} /></Escena>
          </Muestra>
          <Muestra titulo="Open, no match" nota="Sin resultados: dice qué temas conoce.">
            <Escena alto={600}><Confibot abierto onClose={nada} onShowOnScreen={nada} historialInicial={conversacion('Wifi password?')} /></Escena>
          </Muestra>
        </div>
      </Lienzo>
    </div>
  ),
}

export const Specs: Story = {
  parameters: { ...sinControles, docs: { story: { inline: true } } },
  render: () => (
    <div className="p-4">
      <Lienzo>
        <Bloque titulo="Floating button" nota="De Confibot.tsx (ConfibotLanzador).">
          <Tabla encabezado={['Part', 'Value']} minimo={520}>
            <tr><td className="font-semibold">Button</td><td>48 × 48, round; Bot 20px; label 14px Semibold, padding-right 20px on hover/focus</td></tr>
            <tr><td className="font-semibold">Halo</td><td>5px around the button, same gradient, sheen 2.4s while hovered; 2px white ring</td></tr>
            <tr><td className="font-semibold">Tuck away</td><td>24px circle (40px touch area), line border, white, ink-muted; 4px above the button</td></tr>
            <tr><td className="font-semibold">Tucked tab</td><td>32px high, 12px top radius, 13px Semibold, chevron up 16px</td></tr>
            <tr><td className="font-semibold">Position</td><td className="tabular-nums">right 16 · bottom 16 on phones; right 24 · bottom 24 from 640px</td></tr>
            <tr><td className="font-semibold">Over a page FAB</td><td className="tabular-nums">centered over it, 12px gap: right 38 · bottom 104; tucked tab at right 108</td></tr>
            <tr><td className="font-semibold">Layer</td><td>z-40: drawers (z-50) cover it; hidden while the chat or a CoachMark is open</td></tr>
            <tr><td className="font-semibold">Page room</td><td className="tabular-nums">AppShell’s main reserves 96px (phone) / 112px at the bottom, so Cancel/Save and pagination scroll above it</td></tr>
            <tr><td className="font-semibold">Reduced motion</td><td>no sheen; the label still stretches</td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Colors" nota="El degradé va a 110° y el doble de ancho, para que corra.">
          <Tabla encabezado={['Use', 'Token']} minimo={480}>
            <tr><td>Gradient start and end</td><td><Token nombre="dash-blue" /></td></tr>
            <tr><td>Gradient light middle</td><td><Token nombre="dash-blue-glow" /></td></tr>
            <tr><td>Gradient deep middle · keyboard focus ring</td><td><Token nombre="dash-ring" /></td></tr>
            <tr><td>Tuck away border · icon</td><td><Token nombre="line" /> · <Token nombre="ink-muted" /></td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Chat sheet">
          <Tabla encabezado={['Part', 'Value']} minimo={480}>
            <tr><td className="font-semibold">Size</td><td>400px wide, min(560px, 82svh) high; full width from the bottom on phones</td></tr>
            <tr><td className="font-semibold">Shadow</td><td>shadow-floating, like every floating pop up</td></tr>
            <tr><td className="font-semibold">Answers</td><td>Keyword search over the Help topics, no AI; up to three topics per answer</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </div>
  ),
}

/* Con un borrador escrito, Send se habilita. Prueba, no va en la página. */
export const WithDraft: Story = {
  tags: ['!autodocs'],
  args: { vista: 'chat' },
  render: (a) => <div className="p-4"><Demo {...a} /></div>,
  play: escribir(/ask me anything/i, 'How do I add a patient?'),
}
