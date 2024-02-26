import PropTypes from "prop-types";
import { ButtonRounded } from "../ButtonRounded";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Tooltip } from "@material-tailwind/react";
import DialogDeleteArtist from "../dialog/DialogDeleteArtist";
import { useCallback, useState } from "react";
import { deleteRequest } from "src/utils/CommonRequest";
import { API_URL, TYPE_REMOVE } from "src/config/constants";
import { queryClient } from "src/main";
import { toast } from "react-toastify";

function ListArtist({ data, filePath, openDialog, setArtistDetail }) {
  const [artistId, setDeleteArtistId] = useState(null);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [typeRemove, setTypeRemove] = useState(TYPE_REMOVE.CHANGE_INFO);

  const handleDeleteArtist = useCallback(()=>{
    if(!artistId) return;
    try {
      deleteRequest(API_URL.DELETE_ARTIST, {
        artist_id:artistId,
        type_remove:typeRemove
      }, true);
      queryClient.setQueriesData(['artistQuery'], (oldData)=>{
        const newObject = JSON.parse(JSON.stringify(oldData));
        newObject.data = newObject?.data.filter(artist => {
          if(artist.id !== artistId){
            return artist
          }
        });
        return newObject;
      })
      setOpenDialogDelete(false);
      toast.success('Xóa ca sĩ thành công')
    } catch (error) {
      toast.error('Có lỗi xảy ra vui lòng thử lại')
    }finally{
      setDeleteArtistId(null);
      setTypeRemove(TYPE_REMOVE.CHANGE_INFO);
    }
}, [artistId, typeRemove])
  if(!data || !data.data || data.data.length === 0){
    return (
      <tr>
        <td colSpan={5} className="text-center py-4">
          <span>Không tìm thấy kết quả phù hợp</span>
        </td>
      </tr>
    );
  }
  return (
    <>
      {data?.data.map((item) => (
        <tr
        key={item.id}
        className="border-b text-center dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <p className="w-44 overflow-hidden truncate text-left">
              <Tooltip content={item.name}
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-dark"
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
                
              }}>
                {item.name}
              </Tooltip>
          </p>
        </th>
        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div className="flex items-center">
            <div className="h-10 w-10 mx-auto">
              <img src={filePath + item.avatar} alt="avatar" className="object-cover mx-auto h-full w-full rounded"/>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
            {item.gender === 1?"Male":"Female"}
          </span>
        </td>
        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div className="flex items-center space-x-4 justify-center">
            <ButtonRounded
              onClick={() => {
                openDialog(pre=>!pre)
                setArtistDetail(item)
              }}
              size="sm" bgColor="bg-blue-400"
            >
              <BiEdit size={18} />
            </ButtonRounded>
            <ButtonRounded size="sm" bgColor="bg-red-400"
            onClick={() => {
                setOpenDialogDelete((pre) => !pre);
                setDeleteArtistId(item?.id)
              }}
            >
              <BiTrash size={18} />
            </ButtonRounded>
          </div>
        </td>
      </tr>
      ))}
      <DialogDeleteArtist 
        open={openDialogDelete} 
        handleDelete={handleDeleteArtist} 
        handleOpen={setOpenDialogDelete} 
        setTypeRemove={setTypeRemove}
        />
    </>
  );
}

ListArtist.propTypes = {
  data: PropTypes.object,
  filePath: PropTypes.string,
  openDialog: PropTypes.func,
  setArtistDetail: PropTypes.func,
};

export default ListArtist;
