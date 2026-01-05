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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteInput, noteSchema } from "@/lib/validators/noteSchema";
import { Textarea } from "./ui/textarea";
import { createNote } from "@/actions/actions";
import { toast } from "sonner";

type Props = {
  noteGroupId: string;
};

const AddNote = ({ noteGroupId }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = async (data: NoteInput) => {
    const res = await createNote(noteGroupId, data);
    if (res.error) {
      console.error("Error creating note", res.error);
      toast.error("Failed to create note");
    } else {
      toast.success("Note created successfully");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <IoAddSharp /> New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add new Note</DialogTitle>
            <DialogDescription>create a new Note.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-4">
            <div className="grid gap-3">
              <label htmlFor="title">Title</label>
              <Input
                disabled={isSubmitting}
                id="title"
                {...register("title")}
              />
              {errors.title && (
                <div className="text-red-500">{errors.title.message}</div>
              )}
            </div>
            <div className="grid gap-3">
              <label htmlFor="description">Description</label>
              <Textarea
                disabled={isSubmitting}
                id="description"
                {...register("description")}
                placeholder="Content..."
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isSubmitting} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;
