import { spawn } from 'child_process'

export const execCmdSync = (command: string) => {
  return new Promise((resolve: (value: { code: number; stdout: string; stderr: string }) => void) => {
    const proc = spawn(command, { shell: true })
    const stdoutChunks: Uint8Array[] = []
    const stderrChunks: Uint8Array[] = []

    proc.stdout.on('data', (chunk) => {
      stdoutChunks.push(chunk)
    })
    proc.stderr.on('data', (chunk) => {
      stderrChunks.push(chunk)
    })
    proc.on('close', (code: number) => {
      resolve({
        code: code,
        stdout: Buffer.concat(stdoutChunks).toString(),
        stderr: Buffer.concat(stderrChunks).toString(),
      })
    })
  })
}
