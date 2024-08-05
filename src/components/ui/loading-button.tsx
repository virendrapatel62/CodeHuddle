import { PropsWithChildren } from "react";
import { Button, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";

interface Props extends PropsWithChildren, ButtonProps {}
export default function LoadingButton(props: Props) {
  return (
    <Button type="button">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {props.children}
    </Button>
  );
}
