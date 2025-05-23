import { SVGProps } from "react";
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" {...props}>
    <path
      fill="#FCFCFC"
      d="M13.999 15.633 8.282 21.35c-.214.214-.486.32-.816.32-.33 0-.603-.106-.817-.32a1.106 1.106 0 0 1-.32-.817c0-.33.106-.603.32-.816L12.366 14 6.649 8.283a1.106 1.106 0 0 1-.32-.816c0-.33.106-.603.32-.817.214-.214.486-.32.817-.32.33 0 .602.106.816.32L14 12.367l5.717-5.717c.213-.214.486-.32.816-.32.33 0 .603.106.817.32.214.214.32.486.32.817 0 .33-.106.602-.32.816L15.632 14l5.717 5.717c.214.213.32.486.32.816 0 .33-.106.603-.32.817-.214.214-.486.32-.817.32-.33 0-.602-.106-.816-.32l-5.717-5.717Z"
    />
  </svg>
);
export default CloseIcon;
