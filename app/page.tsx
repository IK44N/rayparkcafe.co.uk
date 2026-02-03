import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center bg-forest p-4">
      <div className="h-full w-full flex gap-4 items-center justify-center">
        {/* Leaflet 1 */}
        <div className="leaflet-card h-full flex-1 max-w-[48%]">
          <Image
            src="/leaflet-1.png"
            alt="Ray Park Café Location"
            width={1200}
            height={1600}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Leaflet 2 */}
        <div className="leaflet-card h-full flex-1 max-w-[48%]">
          <Image
            src="/leaflet-2.png"
            alt="Ray Park Café"
            width={1200}
            height={1600}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </main>
  );
}
