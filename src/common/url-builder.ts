import { URLSearchParams } from 'url'

export type UrlParts = {
  path: string
  searchParams?: URLSearchParams
}

export class UrlBuilder {
  constructor (private readonly urlParts: UrlParts) {
  }

  build (): string {
    let url = this.urlParts.path
    if (Array.from(this.urlParts.searchParams?.keys() ?? []).length > 0) {
      url += '?' + this.urlParts.searchParams?.toString()
    }
    return url
  }

  toString (): string {
    return this.build()
  }
}
