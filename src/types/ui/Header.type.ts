export type NavChild = {
  label: string
  href: string
}

export type NavItem = {
  label: string
  href?: string
  children?: NavChild[]
}

export type SocialLink = {
  label: string
  href: string,
  img: string
}