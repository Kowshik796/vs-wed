interface CloudProps {
  src: string
  className?: string
  speed?: number
  style?: React.CSSProperties
}

export default function Cloud({ src, className = "", style = {} }: CloudProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`hero-cloud ${className}`}
      style={style}
    />
  )
}
