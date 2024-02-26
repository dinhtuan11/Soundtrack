import { Button, Dialog, DialogFooter, Spinner } from "@material-tailwind/react";
import { t } from "i18next";
import PropTypes from "prop-types";
import Input from "../input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import RadioButon from "../checkbox/RadioButon";
import { API_URL, TYPE_FILE, maxSizeImage } from "src/config/constants";
import { postRequest } from "src/utils/CommonRequest";
import { createFileValidationSchema, empty } from "src/utils/Helper";
import UploadImage from "../uploadImage/UploadImage";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DateInput from "../input/DateInput";
import { setUserInfo } from "src/redux/slices/auth";
import { useDispatch } from "react-redux";

const DialogEditProfile = ({ isOpen, setOpen, data }) => {
  const regexPhoneNumber =/^(0|84|\+84|\+\(84\)|\(\+84\)|\(84\))\d{3}([ .-]?)(\d{3})\2(\d{3})$/;
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const schema = yup
    .object({
      name: yup
        .string()
        .required(t("validate.input_required", { field: t("auth.user_name") }))
        .min(
          5,
          t("validate.input_min_value", {
            field: t("auth.user_name"),
            min_value: 5,
          })
        )
        .max(
          20,
          t("validate.input_max_value", {
            field: t("auth.user_name"),
            max_value: 20,
          })
        ),
        phone: yup
        .string()
        .nullable()
        .test(
          'is-valid-phone',
          t("validate.input_regex", { field: t("auth.phone") }),
          value => !value || regexPhoneNumber.test(value)
      ),
      gender: yup
        .string()
        .required(t("auth.gender_error"))
        .oneOf(["1", "2", "3"]),
      avatar: createFileValidationSchema("Avatar", maxSizeImage, TYPE_FILE.IMG, "nullable"),
      cover_img: createFileValidationSchema(
        "Cover Image",
        maxSizeImage,
        TYPE_FILE.IMG,
        "nullable"
      ),
    })

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
  const formatDateString = (inputDate) => {
    if(!inputDate) return null;
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
  };
  const handleEditProfile = async (newData) => {
    const { name, phone, birthday, gender, avatar, cover_img } = newData;
    const dateFormat = formatDateString(birthday);
    try {
      setIsLoading(true)
      const res = await postRequest(
        API_URL.USER_INFO,
        {
          name,
          avatar: avatar ? avatar : data.avatar,
          cover_image: cover_img ? cover_img : data.cover_image,
          phone,
          gender,
          birthday:dateFormat,
        },
        false,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        setOpen(false);
        dispatch(setUserInfo(res.data))
        toast.success(res.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      setOpen(false);
      toast.success(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }finally{
      setIsLoading(false)
    }
  };
  useEffect(()=>{
    if(!empty(data)){
      reset({
        ...data,
        birthday: data?.birthday ? new Date(data.birthday) : null,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <>
      <Dialog open={isOpen} className="rounded-2xl">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleEditProfile)} className="mobile-lg:h-[80vh] overflow-y-scroll none-display-scrollbar">
            <div>
              <div className="mobile-lg:h-[150px]">
                <UploadImage
                  name="cover_img"
                  defaultValue={data?.cover_image}
                />
              </div>
            </div>
            <div className="flex justify-center gap-10 pt-3 px-5 mobile-lg:flex-col mobile-lg:-mt-20">
              <div className="flex flex-col gap-y-5 pt-3 mobile-lg:mx-auto">
                <div className="w-[225px] h-[253px] flex justify-center items-center mobile-lg:w-40 mobile-lg:h-36">
                  <UploadImage
                    label="Avatar Image"
                    name="avatar"
                    defaultValue={data?.avatar}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-8 py-10">
                <div className="flex items-center w-full">
                  <label htmlFor="" className="min-w-[110px]">
                    {t("auth.user_name")}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder={data?.name}
                  />
                </div>
                <div className="flex items-center w-full">
                  <label htmlFor="" className="min-w-[110px]">
                    {t("auth.phone")}
                  </label>
                  <Input
                    type="text"
                    name="phone"
                    placeholder={data?.phone ? data?.phone : t("auth.phone")}
                  />
                </div>
                <div>
                  <div className="flex items-start">
                    <label htmlFor="" className="min-w-[110px]">
                      {t("auth.date")}
                    </label>
                    <div className="flex flex-col w-full">
                      <DateInput name="birthday"/>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <RadioButon
                    value={1}
                    valueView={data?.gender}
                    label={t("auth.male")}
                    name="gender"
                  ></RadioButon>
                  <RadioButon
                    value={2}
                    valueView={data?.gender}
                    label={t("auth.female")}
                    name="gender"
                  ></RadioButon>
                  <RadioButon
                    value={3}
                    valueView={data?.gender}
                    label={t("auth.other")}
                    name="gender"
                  ></RadioButon>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  setOpen((pre) => !pre);
                  reset();
                }}
                className="border border-[#FF5E00] bg-white text-[[#FF5E00] text-sm font-bold"
              >
                <span>Cancel</span>
              </Button>
              <Button type="submit" className="bg-[#FF5E00] text-sm font-bold" >
                {isLoading ? <Spinner/> : <span>Confirm</span>}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};
DialogEditProfile.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  data: PropTypes.object,
};
export default DialogEditProfile;
