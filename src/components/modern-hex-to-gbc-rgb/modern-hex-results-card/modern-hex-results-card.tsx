import { EmptyState } from "@/components/empty-state/empty-state";
import ModernColorDisplay from "@/components/modern-color-display/modern-color-display";
import { CopyableText } from "@/components/copyable-text/copyable-text";
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
            <CopyableText textToCopy={ModernHexToRGB555(modernHexValue)} />

            <hr />

            {/* Modern Color Formats */}
            <ModernColorDisplay modernHex={modernHexValue} />
          </div>
        </CardContent>
      ) : (
        <EmptyState description="Please provide a hex value to convert." />
      )}
    </Card>
  );
}
