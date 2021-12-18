const Http = {
  _get: async function<
    ReqData,
    ResData
  >(
    path: string,
    params?: ReqData
  ): Promise<ResData> {
    let pathWithParams = path
    if (params) {
      pathWithParams += '?' +
        Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
    }
    const res = await fetch(pathWithParams, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
      mode: 'no-cors',
    })
    const resBody = await res.json()
    if (resBody.code !== 0) {
    }
    return resBody.data
  },
  _post: async function<
      ReqData,
      ResData
    >(
      path: string,
      params: ReqData
  ): Promise<ResData> {
    const res = await fetch(
      path,
      {
        body: JSON.stringify(
          params
        ),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'no-cors',
      }
    )
    const resBody = await res.json()
    return resBody
  }
}

export default Http
