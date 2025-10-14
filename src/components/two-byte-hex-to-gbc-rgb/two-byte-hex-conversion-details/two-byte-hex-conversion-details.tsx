import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  TwoByteHexToBinary,
  TwoByteHexToBinaryShifted,
} from "@/lib/conversion";

interface ConversionDetailsProps {
  twoByteHexValue: string;
}

export function TwoByteHexConversionDetails({
  twoByteHexValue,
}: ConversionDetailsProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="details">
        <AccordionTrigger className="cursor-pointer text-base">
          Conversion Details
        </AccordionTrigger>
        <AccordionContent className="bg-background p-4 rounded-b-sm">
          <div className="flex flex-col gap-8 pt-2">
            {/* Binary Value */}
            <div className="flex flex-col gap-3">
              <Label>
                First, convert <strong>{twoByteHexValue}</strong> to binary
              </Label>
              <div className="text-muted-foreground font-mono">
                {TwoByteHexToBinary(twoByteHexValue)}
              </div>
            </div>

            {/* Binary Value << 1*/}
            <div className="flex flex-col gap-3">
              <Label>
                Next, bit shift to the left by 1{" "}
                <span className="text-muted-foreground">( &lt;&lt; 1 )</span>
              </Label>
              <div className="text-muted-foreground font-mono">
                {TwoByteHexToBinaryShifted(twoByteHexValue)}
              </div>
            </div>

            {/* Separate Sections */}
            <div className="flex flex-col gap-3">
              <Label>
                Then, separate into sections of 5 bits, ignoring the first bit
              </Label>
              <div className="flex flex-row gap-3">
                {/* Blue */}
                <span className="text-blue-500">
                  {TwoByteHexToBinaryShifted(twoByteHexValue).slice(0, 5)}
                </span>

                {/* Green */}
                <span className="text-green-500">
                  {TwoByteHexToBinaryShifted(twoByteHexValue).slice(5, 10)}
                </span>

                {/* Red */}
                <span className="text-red-500">
                  {TwoByteHexToBinaryShifted(twoByteHexValue).slice(10, 15)}
                </span>

                {/* Gray */}
                <span className="text-gray-500">
                  {TwoByteHexToBinaryShifted(twoByteHexValue).slice(15, 16)}
                </span>
              </div>
            </div>

            {/* RGB Values */}
            <div className="flex flex-col gap-3">
              <Label>Finally, convert each section to decimal</Label>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">
                  R:{" "}
                  <span className="text-red-500">
                    {parseInt(
                      TwoByteHexToBinaryShifted(twoByteHexValue).slice(10, 15),
                      2
                    )}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  G:{" "}
                  <span className="text-green-500">
                    {parseInt(
                      TwoByteHexToBinaryShifted(twoByteHexValue).slice(5, 10),
                      2
                    )}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  B:{" "}
                  <span className="text-blue-500">
                    {parseInt(
                      TwoByteHexToBinaryShifted(twoByteHexValue).slice(0, 5),
                      2
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
