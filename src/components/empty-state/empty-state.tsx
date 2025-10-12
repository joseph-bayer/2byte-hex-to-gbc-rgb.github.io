import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PaletteIcon } from "lucide-react";

export function EmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PaletteIcon />
        </EmptyMedia>
        <EmptyTitle>Awaiting Input...</EmptyTitle>
        <EmptyDescription>
          Please provide a binary value to convert.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
