/** HTTPメソッド定義 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const DEFAULT_WAIT = 200

export const fetchJson = <T>(
  url: string,
  param: {
    method?: HttpMethod
    body?: Record<string, unknown>
    response?: (res: T) => void
    error?: (err: Error) => void
    wait?: number
  },
) => {
  const method = param.method || 'GET'
  const body = param.body ? JSON.stringify(param.body) : undefined
  const error =
    param.error ||
    ((err) => {
      console.error(err)
    })
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(async (data) => {
      if (!data.ok) {
        throw new Error(data.statusText)
      }
      const res = await data.json()

      if (param.wait) {
        setTimeout(() => {
          if (param.response) {
            param.response(res)
          }
        }, param.wait)
      } else {
        if (param.response) {
          param.response(res)
        }
      }
    })
    .catch((err) => {
      error(err)
    })
}
