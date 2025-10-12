import { Card, CardContent } from "@/components/ui/card";
import { RgbDisplay } from "../rgb-display/rgb-display";
import { ConversionDetails } from "../conversion-details/conversion-details";
import { EmptyState } from "../empty-state/empty-state";
import ModernColorDisplay from "../modern-color-display/modern-color-display";

interface ResultsCardProps {
  hexValue: string;
}

export function ResultsCard({ hexValue }: ResultsCardProps) {
  return (
    <Card className="col-span-1 h-fit">
      {!!hexValue?.length ? (
        <CardContent>
          <div className="flex flex-col gap-6">
            <RgbDisplay hexValue={hexValue} />
            <ConversionDetails hexValue={hexValue} />

            <hr />

            <ModernColorDisplay hexValue={hexValue} />
          </div>
        </CardContent>
      ) : (
        <EmptyState />
      )}
    </Card>
  );
}
