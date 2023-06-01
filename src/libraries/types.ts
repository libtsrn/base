// 投稿について。


export interface PageMetadata {
  title: string, description?: string
}

export interface Frontmatter extends PageMetadata {
  draft?: boolean, layout?: string
}