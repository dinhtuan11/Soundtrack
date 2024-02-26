import * as yup from "yup"
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getRequest, postRequest } from "src/utils/CommonRequest";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DialogMultimedia from "../dialog/DialogMultimedia";
import { useState } from "react";
import { useSelector } from "react-redux";
import { t } from "i18next";
import { API_URL, basePath } from "src/config/constants";
import { Button, DialogBody, DialogFooter, Spinner, Typography } from "@material-tailwind/react";
import { BiSolidPlaylist } from "react-icons/bi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Input from "../input/Input";
import { empty } from "src/utils/Helper";
import logo from "src/assets/images/logo.png";

const DialogAddPlaylist = ({ open, setOpen, songId }) => {
    const schema = yup.object({
        title: yup.string()
            .required(t("validate.input_required", { field: t("home.playlist") }))
            .min(6, t("validate.input_min", { field: t("home.playlist"), min: "6" }))
            .max(255, t("validate.input_max", { field: t("home.playlist"), max: "255" }))
    });
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const { userInfo, accessToken } = useSelector(state => state.auth)
    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    })
    const { handleSubmit, reset } = methods
    const getPlaylist = async () => {
        try {
            const res = await getRequest(API_URL.LIST_PLAYLIST, userInfo?.user_id)
           
            return res?.data
        } catch (error) {
            toast.error(error?.response.data.smg)
        }
    }
    const hasUserInfo  = !empty(userInfo) ? Object.keys(userInfo).length > 0 : false;
    const { data: playlistData, refetch } = useQuery(["queryPlaylist"], getPlaylist, {
        keepPreviousData: true,
        enabled: hasUserInfo 
    })
    const onSubmit = async ({ title }) => {
        if (userInfo && accessToken) {
            try {
                setIsLoading(true)
                const res = await postRequest(API_URL.CREATE_PLAYLIST, {
                    title,
                    song_id: songId
                })
                if (res) {
                    reset()
                    setOpen(pre => !pre)
                    refetch()
                    toast.success(t("services.create_success", { field: t("home.playlist") }))
                }
            } catch (error) {
                toast.error(error.response.data.msg)
            } finally {
                setIsLoading(false)
            }
        } else {
            setIsError(<div className="text-center"><p>{t("home.not_login")}</p><Link to="/login" className="text-primary">{t("auth.login_now")}</Link></div>)
        }

    }
    
    const addSongToPlaylist = async (playlistId) => {
        let detailData = {}
        try {
            const {data:detail} = await getRequest(`${API_URL.GET_PLAYLIST_BY_ID}/${playlistId}`)
            detailData = detail;
            const validSong = detailData.some(detailId=>detailId.song_id === songId)
            if(validSong){
                toast.error(t("validate.input_unique",{field: t("home.song")}))
                return setIsError(<p className="text-red-500 text-center">{t("validate.input_unique",{field: t("home.song")})}</p>)
            }else {
                const res = await postRequest(API_URL.ADD_SONG_TO_PLAYLIST, {
                    playlist_id: playlistId,
                    song_id: songId
                })
                if (res) {
                    setOpen(pre => !pre)
                    toast.success(t("services.add_to_success", { field: t("home.playlist") }))
                }
            }
          } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <DialogMultimedia isOpen={open} setOpen={setOpen} titleHeading={t("home.playlist")}>
            <DialogBody className="h-44 overflow-y-scroll none-display-scrollbar">
                {playlistData&&playlistData.length>0? (
                    playlistData?.map((item, index) =>(
                        <button onClick={() => addSongToPlaylist(item.playlist_id)} key={index} className="flex w-full items-center gap-4 mb-4 hover:text-primary rounded-lg transition-all">
                            <img src={item?.original_image?basePath+item?.original_image: logo} alt="" className="h-10 w-10 rounded-lg object-cover" />
                            <span className="w-full truncate text-left">{item.title}</span>
                        </button>
                        )    
                    )):isError?isError: <Typography className="text-center">{t("home.have_no_playlists")}</Typography>}
            </DialogBody>
            <FormProvider {...methods}>
                {userInfo && accessToken?isError:''}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogFooter>
                        <Input name="title" placeholder={t("user.create_new_multimedia", { field: t("home.playlist") })} type="text">
                            <BiSolidPlaylist size={20} />
                        </Input>
                        <Button type="submit" variant="outlined" className="text-[#FF5E00] mt-4 hover:bg-[#FF5E00] hover:text-white transition-all border-primary font-bold mx-auto w-full">
                            <span>{isLoading ? <Spinner color="orange" className="mx-auto" /> : "new"}</span>
                        </Button>
                    </DialogFooter>
                </form>
            </FormProvider>
        </DialogMultimedia>
    )
}

DialogAddPlaylist.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    songId: PropTypes.number
}

export default DialogAddPlaylist