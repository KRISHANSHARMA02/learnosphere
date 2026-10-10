"use client";

export default function AppLoader({
  title = "Loading",
  subtitle = "Please wait a moment...",
  fullScreen = false,
  size = "md",
}) {
  const loaderSize = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        ${fullScreen ? "fixed inset-0 z-[999] bg-white/80 backdrop-blur-md" : "py-20"}
      `}
    >
      {/* Loader */}
      <div className={`relative ${loaderSize[size]}`}>
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-orange-200 animate-pulse opacity-50"></div>

        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[5px] border-orange-100"></div>

        {/* Spinner */}
        <div className="absolute inset-0 rounded-full border-[5px] border-orange-500 border-t-transparent animate-spin"></div>

        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[55%] h-[55%] rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-xl flex items-center justify-center">

            <span className="text-white text-2xl font-black">
              L
            </span>

          </div>
        </div>
      </div>

      {/* Text */}
      <h3 className="mt-8 text-2xl font-black text-gray-900">
        {title}
      </h3>

      <p className="text-gray-500 mt-2 text-center max-w-xs">
        {subtitle}
      </p>

      {/* Dots */}
      <div className="flex gap-2 mt-5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce"
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}