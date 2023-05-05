import { spawn } from 'child_process'

export const execCmdSync = (command: string) => {
  return new Promise((resolve: (value: { code: number }) => void) => {
    const proc = spawn(command, { shell: true })
    proc.on('close', (code: number) => {
      resolve({ code: code })
    })
  })
}
