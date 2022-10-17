import { URLSearchParams } from "url"

export type UrlParts = {
  path: string
  searchParams?: URLSearchParams
}

export class UrlBuilder {
  constructor(private urlParts: UrlParts) {
  }

  build(): string {
    let url = this.urlParts.path
    if (this.urlParts.searchParams) {
      url += '?' + this.urlParts.searchParams.toString()
    }
    return url
  }

  toString(): string {
    return this.build()
  }
}
