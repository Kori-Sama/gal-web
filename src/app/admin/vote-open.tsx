import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const VoteOpen = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>开启投票</Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default VoteOpen;
