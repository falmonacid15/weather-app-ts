interface WeatherIconProps {
  iconCode: string;
  className?: string;
  variant?: "fill" | "line";
}

export default function WeatherIcon({
  iconCode,
  className = "",
  variant = "fill",
}: WeatherIconProps) {
  const getIconPath = () => {
    const iconUrl = `/icons/openweathermap/${variant}/${iconCode}.svg`;
    return iconUrl;
  };

  return (
    <img
      src={getIconPath() || "/placeholder.svg"}
      alt={`Weather icon ${iconCode}`}
      className={`${className}`}
      width={32}
      height={32}
    />
  );
}
