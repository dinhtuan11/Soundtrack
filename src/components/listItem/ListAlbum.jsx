import PropTypes from "prop-types";
import { ButtonRounded } from "../ButtonRounded";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Tooltip } from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { API_URL, TYPE_REMOVE } from "src/config/constants";
import { deleteRequest } from "src/utils/CommonRequest";
import { queryClient } from "src/main";
import DialogDeleteAlbum from "../dialog/DialogDeleteAlbum";
import { toast } from "react-toastify";

function ListAlbum({ data, openDialog, setAlbumDetail }) {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [typeRemove, setTypeRemove] = useState(TYPE_REMOVE.CHANGE_INFO);
  const [albumId, setDeleteArtistId] = useState(null);

  const handleDeleteArtist = useCallback(()=>{
    if(!albumId) return;
    try {
      deleteRequest(API_URL.DELETE_ALBUM, {
        album_id:albumId,
        type_remove:typeRemove
      }, true);
      queryClient.setQueriesData(['queryAlbum'], (oldData)=>{
        const newObject = JSON.parse(JSON.stringify(oldData));
        newObject.data = newObject?.data.filter(album => {
          if(album.id !== albumId){
            return album
          }
        });
        return newObject;
      })
      setOpenDialogDelete(false);
      toast.success('Xóa album thành công')
    } catch (error) {
      toast.error('Có lỗi xảy ra vui lòng thử lại')
    }finally{
      setDeleteArtistId(null);
      setTypeRemove(TYPE_REMOVE.CHANGE_INFO);
    }
}, [albumId, typeRemove])
  const handlerDialog = (data) => {
    openDialog((pre) => !pre);
    setAlbumDetail(data);
  };
  return (
    <>
      {data?.data.map((item, key) => (
        <tr
          key={key}
          className="border-b text-center dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <th
            scope="row"
            className="px-4 py-3 font-medium text-gray-900 dark:text-white"
          >
            <p className="w-32 overflow-hidden text-left truncate">
            <Tooltip content={item?.title}
              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-dark"
              animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}>
              {item?.title}
            </Tooltip>
            </p>
          </th>
          <td className="px-4 py-3">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
              {item?.release_date}
            </span>
          </td>
          <td className="px-4 py-3">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
              {item?.artists_name}
            </span>
          </td>
          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div className="flex items-center justify-center space-x-4">
               <ButtonRounded size="sm" bgColor="bg-blue-400" onClick={()=>handlerDialog(item)}>
                 <BiEdit size={18} />
               </ButtonRounded>
               <ButtonRounded size="sm" bgColor="bg-red-400" onClick={() => {
                setOpenDialogDelete((pre) => !pre);
                setDeleteArtistId(item?.id)
              }}>
                 <BiTrash size={18} />
               </ButtonRounded>
             </div>
          </td>
        </tr>
      ))}
      <DialogDeleteAlbum
        open={openDialogDelete} 
        handleDelete={handleDeleteArtist} 
        handleOpen={setOpenDialogDelete} 
        setTypeRemove={setTypeRemove}
        />
    </>
  );
}

ListAlbum.propTypes = {
  data: PropTypes.object,
  openDialog: PropTypes.func,
  setAlbumDetail: PropTypes.func,
};

export default ListAlbum;
