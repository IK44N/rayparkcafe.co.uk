'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      <main className="h-screen w-full bg-forest overflow-hidden">
        {/* Mobile: stacked, Desktop: side by side */}
        <div className="h-full w-full flex flex-col lg:flex-row gap-2 p-2 lg:gap-4 lg:p-4">
          {/* Leaflet 1 */}
          <div
            className="leaflet-card flex-1 h-[48%] lg:h-full cursor-pointer"
            onClick={() => setZoomedImage('/leaflet-1.png')}
          >
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
          <div
            className="leaflet-card flex-1 h-[48%] lg:h-full cursor-pointer"
            onClick={() => setZoomedImage('/leaflet-2.png')}
          >
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

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setZoomedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl font-bold z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={() => setZoomedImage(null)}
          >
            ×
          </button>

          {/* Zoomable image */}
          <div className="w-full h-full overflow-auto p-4">
            <Image
              src={zoomedImage}
              alt="Zoomed leaflet"
              width={1200}
              height={1600}
              className="w-full h-auto"
              style={{ maxWidth: 'none' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
