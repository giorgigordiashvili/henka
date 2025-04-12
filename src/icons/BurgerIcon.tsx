import { SVGProps } from 'react'
const BurgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      stroke="#FCFCFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M3.5 14h21M3.5 7h21M3.5 21h21"
    />
  </svg>
)
export default BurgerIcon
