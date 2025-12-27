-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "NoteGroup" ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;
