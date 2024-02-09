import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface DialogConfirmationProps {
  triger: ReactNode;
  title: string;
  description: string;
  dialogConfirmation: boolean;
  setDialogConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmation: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

function DialogConfirmation(props: DialogConfirmationProps) {
  const {
    triger,
    title,
    description,
    dialogConfirmation,
    setDialogConfirmation,
    handleConfirmation,
  } = props;

  return (
    <Dialog open={dialogConfirmation} onOpenChange={setDialogConfirmation}>
      <DialogTrigger asChild>{triger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleConfirmation} type="submit">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogConfirmation;
