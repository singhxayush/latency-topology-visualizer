/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {useEffect, useRef} from "react";
import Globe from "react-globe.gl";
import {countries} from "@/components/dashboard/globe/countries";
import {useIsMobile} from "@/hooks/use-mobile";

// MAIN APP COMPONENT
const HeroGlobe = () => {
  const globeRef = useRef<any>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    globeRef.current.controls().autoRotate = true;
    globeRef.current.pointOfView({altitude: 1.5}, 1000);
  }, [isMobile]);

  return (
    <Globe
      ref={globeRef}
      backgroundColor="rgba(19, 19, 19, 0)"
      globeImageUrl={"/globe.png"}
      // Poligon Spread
      hexPolygonsData={countries.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.7}
      hexPolygonColor={() => "rgba(255,255,255, 1)"}
      showAtmosphere={false}
    />
  );
};

export default HeroGlobe;
