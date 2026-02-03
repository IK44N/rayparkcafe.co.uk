import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-full bg-forest overflow-hidden">
      {/* Both leaflets side by side on all screen sizes */}
      <div className="h-full w-full flex flex-row gap-1 p-2 md:gap-4 md:p-4">
        {/* Leaflet 1 */}
        <div className="leaflet-card flex-1 h-full">
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
        <div className="leaflet-card flex-1 h-full">
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
