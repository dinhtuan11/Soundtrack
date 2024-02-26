import PropTypes from "prop-types";
import { ButtonRounded } from "../ButtonRounded";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Tooltip } from "@material-tailwind/react";
import { useCallback, useState } from "react";
import DialogDelete from "../dialog/DialogDelete";
import { deleteRequest } from "src/utils/CommonRequest";
import { API_URL } from "src/config/constants";
import { queryClient } from "src/main";
import { toast } from "react-toastify";
function ListSong({ data, filePath, openDialog, setSongDetail }) {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [songId, setDeleteSongId] = useState(null);
  const handlerDialog = (data) => {
    openDialog((pre)=>!pre);
    setSongDetail(data)
  }
  const handleDeleteSong = useCallback(()=>{
    if(!songId) return;
      try {
        deleteRequest(API_URL.DELETE_SONG, {
          song_id:songId
        }, true);
        queryClient.setQueriesData(['songQuery'], (oldData)=>{
          const newObject = JSON.parse(JSON.stringify(oldData));
          newObject.data = newObject?.data.filter(song => {
            if(song.song_id !== songId){
              return song
            }
          });
          return newObject;
        })
        setOpenDialogDelete(false);
        toast.success('Xóa bài hát thành công')
      } catch (error) {
        toast.error('Có lỗi xảy ra vui lòng thử lại')
      }finally{
        setDeleteSongId(null)
      }
  }, [songId])
  if (!data || !data.data || data.data.length === 0) {
    return (
      <tr>
        <td colSpan={8} className="text-center py-4">
          <span>Không tìm thấy kết quả phù hợp</span>
        </td>
      </tr>
    );
  }
  return (
    <>
      {data?.data.map((item, key) => (
        <tr
          key={key}
          className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <th
            scope="row"
            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <p className="w-44 overflow-hidden truncate mr-3">
              <Tooltip
                content={item.song_name}
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-dark"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                {item.song_name}
              </Tooltip>
            </p>
          </th>
          <td className="">
            <p className="w-32 overflow-hidden text-center truncate">
              <Tooltip
                content={item.albums_name ? item.albums_name : "Không có"}
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-dark"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                {item.albums_name ? item.albums_name : "Không có"} 
              </Tooltip>
            </p>
          </td>
          <td className="px-1 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <p className="w-48 overflow-hidden text-center truncate ">
              <Tooltip
                content={item.artists_name}
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-dark"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                {item.artists_name}
              </Tooltip>
            </p>
          </td>
          <td className="px-1 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <p className="w-48 overflow-hidden text-center truncate ">
              <Tooltip
                content={item.category_title}
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-dark"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                {item.category_title}
              </Tooltip>
            </p>
          </td>
          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <div className="flex items-center">
              <div className="h-14 w-14 mx-auto">
                <img
                  src={`${filePath}${
                    item.thumbnail_image
                      ? item.thumbnail_image
                      : item.original_image
                  }`}
                  alt="origin image"
                  className="rounded object-cover mx-auto h-full w-full"
                />
              </div>
            </div>
          </td>
          <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.song_duration}
          </td>
          <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.date_create}
          </td>
          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <div className="flex items-center space-x-4 justify-center">
              <ButtonRounded
                size="sm"
                bgColor="bg-blue-400"
                onClick={() => handlerDialog(item)}
              >
                <BiEdit size={18} />
              </ButtonRounded>
              <ButtonRounded size="sm" bgColor="bg-red-400" onClick={() => {
                setOpenDialogDelete((pre) => !pre);
                setDeleteSongId(item?.song_id)
              }}>
                <BiTrash size={18} />
              </ButtonRounded>
            </div>
          </td>
        </tr>
      ))}
      <DialogDelete songDeleteId ={songId} handleDelete={handleDeleteSong} open={openDialogDelete} handleOpen={setOpenDialogDelete}/>
    </>
  );
}

ListSong.propTypes = {
  data: PropTypes.object,
  filePath: PropTypes.string,
  openDialog: PropTypes.func,
  setIdToEdit: PropTypes.func,
  idSong: PropTypes.number,
  setSongDetail: PropTypes.func
};

export default ListSong;
