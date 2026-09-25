import type { Meta, StoryObj } from '@storybook/react-vite'
import { archivosAnalizados, hexEnCodigo } from './audit'
import { Codigo, Page, Seccion } from './Page'

const meta = {
  title: 'Foundations/Color audit',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Auditoria: Story = {
  name: 'Color audit',
  render: () => {
    const total = hexEnCodigo.reduce((n, h) => n + h.usos, 0)
    const conToken = hexEnCodigo.filter((h) => h.token)
    const usosConToken = conToken.reduce((n, h) => n + h.usos, 0)
    return (
      <Page
        titulo="Color audit"
        bajada={`Colores escritos a mano en el código (#rrggbb), leídos de ${archivosAnalizados} archivos de src/. Un color que no pasa por un token no cambia cuando cambia el token.`}
      >
        <Seccion titulo="Resumen">
          <div className="flex flex-wrap gap-8 text-[13px]">
            <div><p className="text-[26px] font-bold">{total}</p><p className="text-[#71717a]">usos de hex escritos a mano</p></div>
            <div><p className="text-[26px] font-bold">{hexEnCodigo.length}</p><p className="text-[#71717a]">valores distintos</p></div>
            <div><p className="text-[26px] font-bold">{usosConToken}</p><p className="text-[#71717a]">ya tienen un token ({conToken.length} valores)</p></div>
          </div>
        </Seccion>

        <Seccion titulo="Todos los valores" nota="Ordenados por cantidad de usos. La columna Token dice si ya existe uno con ese mismo valor.">
          <div className="overflow-hidden rounded-lg border border-[#e4e4e7]">
            <table className="w-full text-left text-[12.5px]">
              <thead className="bg-[#fafafa] text-[11px] tracking-wide text-[#71717a] uppercase">
                <tr><th className="px-3 py-2 font-medium">Color</th><th className="px-3 py-2 font-medium">Valor</th><th className="px-3 py-2 font-medium">Usos</th><th className="px-3 py-2 font-medium">Archivos</th><th className="px-3 py-2 font-medium">Token</th></tr>
              </thead>
              <tbody>
                {hexEnCodigo.map((h) => (
                  <tr key={h.valor} className="border-t border-[#f1f1f4]">
                    <td className="px-3 py-1.5"><span className="inline-block size-5 rounded border border-black/10 align-middle" style={{ background: h.valor }} /></td>
                    <td className="px-3 py-1.5 font-mono">{h.valor}</td>
                    <td className="px-3 py-1.5">{h.usos}</td>
                    <td className="px-3 py-1.5">{h.archivos}</td>
                    <td className="px-3 py-1.5">{h.token ? <Codigo>{h.token}</Codigo> : <span className="text-[#a1a1aa]">-</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Seccion>
      </Page>
    )
  },
}
