import * as React from "react"
const HomeIcon = ({isActive}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    fill="none"
  >
    <path
      stroke={isActive ? "#000" : "#939393"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 6.903 9 1 1 6.903M15.256 7.13v7.814H10.78v-4.153c0-.483-.2-.92-.522-1.237a1.796 1.796 0 0 0-1.26-.513c-.983 0-1.781.784-1.781 1.75v4.153H2.74V7.13"
    />
  </svg>
)
export default HomeIcon
