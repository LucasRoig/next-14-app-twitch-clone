import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HintProps = {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
};

export function Hint(props: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={props.asChild}>
          {props.children}
        </TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={props.side}
          align={props.align}
        >
          <p className="font-semibold">{props.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
