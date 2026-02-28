import type { PropsWithChildren } from "react"

export default ({ children }: PropsWithChildren) => {
  return (
    <p className='mx-auto text-lg'>{children}</p>
  )
}
