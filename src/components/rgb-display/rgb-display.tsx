import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TwoByteHexToRGB555 } from "@/lib/conversion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RgbDisplayProps {
  hexValue: string;
}

export function RgbDisplay({ hexValue }: RgbDisplayProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(TwoByteHexToRGB555(hexValue));
      setIsCopied(true);
      toast.success("RGB values copied to clipboard!");

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy RGB values");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-lg">Results</Label>
      <div className="flex flex-row gap-3 items-center bg-background px-4 py-2 rounded-md w-fit">
        <div className="text-muted-foreground">
          {TwoByteHexToRGB555(hexValue)}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-1 cursor-pointer"
          title={isCopied ? "Copied!" : "Copy RGB values"}
        >
          {isCopied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}
