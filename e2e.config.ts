import type { E2EConfig } from 'e2e'
import { web } from '@e2e-dev/web'

/* Tests end-to-end con e2e (TesterArmy): `npm run test:e2e`. Si el dev server ya está en :5182 lo usa; si no, lo
   levanta. Sin modelo todavía: corren sólo los tests con locators (sin `agent.act`). Ver design-reference/e2e.md. */
export default {
  targets: [{
    engine: web({ viewport: { width: 1440, height: 900 } }),
    app: {
      url: process.env.APP_URL ?? 'http://localhost:5182',
      command: {
        executable: 'npm',
        args: ['run', 'dev', '--', '--port', '5182', '--strictPort'],
        reuseExisting: true,
        log: '.e2e/logs/app.log',
      },
    },
  }],
} satisfies E2EConfig
