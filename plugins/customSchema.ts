import { RefreshScheme } from '@nuxtjs/auth-next/dist/runtime'
import type {
  HTTPRequest,
  HTTPResponse,
} from '@nuxtjs/auth-next'

export default class CustomScheme extends RefreshScheme {
  /* 
    Custom Refresh
   */
  async refreshTokens(): Promise<void> {
    // Refresh endpoint is disabled
    if (!this.options.endpoints.refresh) {
      return
    }

    // Token and refresh token are required but not available
    if (!this.check().valid) {
      return
    }

    // Get refresh token status
    const refreshTokenStatus = this.refreshToken.status()

    // Refresh token is expired. There is no way to refresh. Force reset.
    if (refreshTokenStatus.expired()) {
      this.$auth.reset()
      return Promise.reject(new Error('Token expired'))
    }

    // Delete current token from the request header before refreshing, if `tokenRequired` is disabled
    if (!this.options.refreshToken.tokenRequired) {
      this.requestHandler.clearHeader()
    }

    // Set authorization header
    this.requestHandler.axios.defaults.headers.common[this.options.token.name] = `${this.options.token.type} ${this.refreshToken.get()}`

    // Make refresh request
    try {
      const response = await this.$auth
        .request({}, this.options.endpoints.refresh)
      // Update tokens
      this.updateTokens(response, { isRefreshing: true })
    } catch (error: any) {
      this.$auth.callOnError(error, { method: 'refreshToken' })
      return await Promise.reject(error)
    }
  }

  /*
    Custom Fetch User
  */
  private getProp(
    holder: Record<string, any>,
    propName: string | false
  ): unknown {
    if (!propName || !holder || typeof holder !== 'object') {
      return holder
    }

    if (propName in holder) {
      return holder[propName]
    }

    const propParts = Array.isArray(propName)
      ? propName
      : (propName + '').split('.')

    let result: any = holder
    while (propParts.length && result) {
      result = result[propParts.shift()]
    }

    return result
  }

  async fetchUser(endpoint?: any): Promise<HTTPResponse | void> {
    // Token is required but not available
    if (!this.check().valid) {
      return Promise.resolve()
    }

    // User endpoint is disabled
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return Promise.resolve()
    }

    // Try to fetch user and then set
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {
        const userData = this.getProp(response.data, this.options.user.property)

        if (!userData) {
          const error = new Error(
            `User Data response does not contain field ${this.options.user.property}`
          )
          return Promise.reject(error)
        }

        this.$auth.setUser(userData)
        return response
      })
      .catch((error) => {
        this.$auth.logout() // add this line.
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })
  }
}