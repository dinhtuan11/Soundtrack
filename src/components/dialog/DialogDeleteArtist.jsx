import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { TYPE_REMOVE } from "src/config/constants";
const DialogDeleteArtist = ({
  open,
  handleOpen,
  handleDelete,
  setTypeRemove,
}) => {
  return (
    <>
      <Dialog open={open} handler={() => handleOpen(false)}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Xóa ca sĩ
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            Xóa ca sĩ
          </Typography>
        </DialogBody>
        <div className="flex gap-2 flex-col">
          <Radio
            color="red"
            name="type"
            label="Xóa tất cả bài hát, album của ca sĩ khỏi hệ thống"
            onClick={() => setTypeRemove(TYPE_REMOVE.DELETE_HARD)}
          />
          <Radio
            color="red"
            name="type"
            label="Cập nhật album và bài hát của ca sĩ sang không xác định"
            defaultChecked
            onClick={() => setTypeRemove(TYPE_REMOVE.CHANGE_INFO)}
          />
        </div>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => handleOpen(false)}
          >
            Thoát
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            Xóa
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DialogDeleteArtist;
