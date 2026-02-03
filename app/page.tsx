import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full bg-forest">
      <div className="leaflet-container">
        {/* Leaflet 1 */}
        <div className="leaflet-card">
          <Image
            src="/leaflet-1.png"
            alt="Ray Park Café Location"
            width={1200}
            height={1600}
            className="leaflet-image"
            priority
          />
        </div>

        {/* Leaflet 2 */}
        <div className="leaflet-card">
          <Image
            src="/leaflet-2.png"
            alt="Ray Park Café"
            width={1200}
            height={1600}
            className="leaflet-image"
          />
        </div>
      </div>
    </main>
  );
}
