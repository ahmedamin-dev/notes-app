"use client";

import { IoAddSharp } from "react-icons/io5";
import { Button } from "./ui/button";
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
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { createNoteGroup } from "@/actions/actions";

const AddNewNotebook = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await createNoteGroup(formData);

    if (res.error) {
      console.error(res.error);
    }

    if (res.success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <IoAddSharp /> New Notebook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new Notebook</DialogTitle>
            <DialogDescription>
              You can create a new Notebook which will hold notes for a specific
              subject.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-4">
            <div className="grid gap-3">
              <label htmlFor="title" className="title">
                Title
              </label>
              <Input id="title" name="title" placeholder="React Notes" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewNotebook;
