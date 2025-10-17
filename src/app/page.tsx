"use client";

import ConverterSelector from "@/components/converter-selector/converter-selector";
import { DarkModeToggle } from "@/components/mode-toggle/dark-mode-toggle";
import { GitHubLink } from "@/components/github-link/github-link";
import { ModernHexToRgbConverter } from "@/components/modern-hex-to-gbc-rgb/modern-hex-to-gbc-rgb-converter";

import { TwoByteHexToRgbConverter } from "@/components/two-byte-hex-to-gbc-rgb/two-byte-hex-to-rgb-converter";
import { ConverterTypes } from "@/constants/converter-types";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize converter based on URL params or default to twoByteHex
  const getInitialConverter = () => {
    const converterParam = searchParams.get("converter");
    if (converterParam !== null) {
      const converterValue = Number(converterParam);
      // Validate that it's a valid converter type
      if (Object.values(ConverterTypes).includes(converterValue)) {
        return converterValue;
      }
    }
    return ConverterTypes.twoByteHex;
  };

  const [selectedConverter, setSelectedConverter] =
    useState<number>(getInitialConverter);

  // Update URL when converter changes
  const handleConverterChange = (value: string) => {
    const converterValue = Number(value);
    setSelectedConverter(converterValue);

    // Update URL with new converter parameter
    const params = new URLSearchParams(searchParams);
    params.set("converter", converterValue.toString());
    router.replace(`?${params.toString()}`);
  };

  // Update converter when URL changes (e.g., browser back/forward)
  useEffect(() => {
    const converterParam = searchParams.get("converter");
    if (converterParam !== null) {
      const converterValue = Number(converterParam);
      // Validate that it's a valid converter type
      if (Object.values(ConverterTypes).includes(converterValue)) {
        setSelectedConverter(converterValue);

        // Clear hex parameter if switching converter types and the hex format doesn't match
        const hexParam = searchParams.get("hex");
        if (hexParam) {
          const params = new URLSearchParams(searchParams);
          let shouldClear = false;

          // Check if hex format matches the selected converter
          if (
            converterValue === ConverterTypes.twoByteHex &&
            !/^[0-9A-Fa-f]{4}$/.test(hexParam)
          ) {
            shouldClear = true;
          } else if (
            converterValue === ConverterTypes.modernHex &&
            !/^[0-9A-Fa-f]{6}$/.test(hexParam)
          ) {
            shouldClear = true;
          }

          if (shouldClear) {
            params.delete("hex");
            router.replace(`?${params.toString()}`, { scroll: false });
          }
        }
        return;
      }
    }
    setSelectedConverter(ConverterTypes.twoByteHex);
  }, [searchParams, router]);

  return (
    <>
      {/* Title & Converter Selector */}
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl w-full text-center font-bold">
          Pokecrystal RGB Converter
        </h1>

        <div className="w-full flex justify-center">
          <ConverterSelector
            value={selectedConverter.toString()}
            onChange={handleConverterChange}
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[100rem]">
          {/* Converter Forms */}
          {selectedConverter === ConverterTypes.twoByteHex && (
            <TwoByteHexToRgbConverter />
          )}
          {selectedConverter === ConverterTypes.modernHex && (
            <ModernHexToRgbConverter />
          )}
        </div>
      </div>
    </>
  );
}

function HomeContentSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl w-full text-center font-bold">
          Pokecrystal RGB Converter
        </h1>

        {/* Dropdown Skeleton */}
        <div className="w-full flex justify-center">
          <Skeleton className="h-8 w-1/4" />
        </div>
      </div>

      {/* Converter Title Skeleton */}
      <div className="w-full flex justify-center">
        <Skeleton className="h-9 w-1/3" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="font-sans p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-16">
        {/* TODO: should probably be in layout */}
        {/* Top Right Controls */}
        <div className="flex w-full justify-end gap-2">
          <DarkModeToggle />
          <GitHubLink
            username="joseph-bayer"
            repository="2byte-hex-to-gbc-rgb.github.io"
          />
        </div>
        <Suspense fallback={<HomeContentSkeleton />}>
          <HomeContent />
        </Suspense>
      </main>
    </div>
  );
}
