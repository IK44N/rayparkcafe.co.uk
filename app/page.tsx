import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-forest">
      {/* Desktop: side by side, Mobile: stacked */}
      <div className="h-screen w-full flex flex-col lg:flex-row gap-0 lg:gap-4 lg:p-4">
        {/* Leaflet 1 */}
        <div className="leaflet-card flex-1 w-full h-1/2 lg:h-full lg:max-w-[48%]">
          <Image
            src="/leaflet-1.png"
            alt="Ray Park Café Location"
            width={1200}
            height={1600}
            className="w-full h-full object-contain lg:object-contain"
            priority
          />
        </div>

        {/* Leaflet 2 */}
        <div className="leaflet-card flex-1 w-full h-1/2 lg:h-full lg:max-w-[48%]">
          <Image
            src="/leaflet-2.png"
            alt="Ray Park Café"
            width={1200}
            height={1600}
            className="w-full h-full object-contain lg:object-contain"
          />
        </div>
      </div>
    </main>
  );
}
