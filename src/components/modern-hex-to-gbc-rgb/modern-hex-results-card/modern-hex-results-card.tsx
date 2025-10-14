import { EmptyState } from "@/components/empty-state/empty-state";
import { RgbDisplay } from "@/components/rgb-display/rgb-display";
import { Card, CardContent } from "@/components/ui/card";
import { ModernHexToRGB555 } from "@/lib/conversion";

interface ModernResultsCardProps {
  modernHexValue: string;
}

export function ModernHexResultsCard({
  modernHexValue,
}: ModernResultsCardProps) {
  return (
    <Card className="col-span-1 h-fit">
      {!!modernHexValue?.length ? (
        <CardContent>
          <div className="flex flex-col gap-6">
            <RgbDisplay RGBValue={ModernHexToRGB555(modernHexValue)} />
            {/* TODO: Conversion Details */}
            {/* <hr /> */}
            {/* TODO: Modern Color Display */}
          </div>
        </CardContent>
      ) : (
        <EmptyState description="Please provide a hex value to convert." />
      )}
    </Card>
  );
}
