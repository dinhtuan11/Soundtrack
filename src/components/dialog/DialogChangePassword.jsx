import {
  Button,
  DialogBody,
  DialogFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import DialogMultimedia from "./DialogMultimedia";
import PropTypes from "prop-types";
import { t } from "i18next";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input/Input";
import { IoMdCheckmark } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { postRequest } from "src/utils/CommonRequest";
import { API_URL } from "src/config/constants";
import { toast } from "react-toastify";
import { useState } from "react";
import logo from "src/assets/images/logo.png";
function DialogChangePassword({ open, setOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const regexPassword =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const schema = yup
    .object({
      old_password: yup
        .string()
        .required(
          t("validate.input_required", { field: t("auth.old_password") })
        )
        .min(
          6,
          t("validate.input_min_value", {
            field: t("auth.old_password"),
            min_value: 6,
          })
        )
        .max(
          16,
          t("validate.input_max_value", {
            field: t("auth.old_password"),
            max_value: 16,
          })
        )
        .matches(
          regexPassword,
          t("validate.regex_password", { field: t("auth.old_password") })
        ),
      new_password: yup
        .string()
        .required(
          t("validate.input_required", { field: t("auth.new_password") })
        )
        .min(
          6,
          t("validate.input_min_value", {
            field: t("auth.new_password"),
            min_value: 6,
          })
        )
        .max(
          16,
          t("validate.input_max_value", {
            field: t("auth.new_password"),
            max_value: 16,
          })
        )
        .matches(
          regexPassword,
          t("validate.regex_password", { field: t("auth.new_password") })
        ),
      confirm_password: yup
        .string()
        .oneOf(
          [yup.ref("new_password"), null],
          t("validate.input_same", {
            field: t("auth.confirm_password"),
            same: t("auth.new_password"),
          })
        )
        .required(
          t("validate.input_required", { field: t("auth.confirm_password") })
        ),
    })
    .required();
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
  const handleChangePassword = async (data) => {
    try {
      setIsLoading(true);
      const res = await postRequest(API_URL.CHANGE_PASSWORD, {
        password_old: data.old_password,
        password: data.new_password,
        password_confirmation: data.confirm_password
      })
      if(res){
        setOpen(false)
        reset();
        toast.success(res.msg,{
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        })
      }
    } catch (error) {
      setIsError(error.response.data.msg);
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <DialogMultimedia size={`md`} isOpen={open} setOpen={setOpen} titleHeading="">
      <div className="mx-auto px-16 text-center mobile-md:px-5">
        <div className="flex items-center gap-3 justify-center">
          <img
            src={logo}
            alt=""
            className="w-[30px] h-[30px]"
          />
          <Typography
            variant="h2"
            className="text-xl text-gray-800 font-semibold font-poppins"
          >
            Soundtrack
          </Typography>
        </div>
        <Typography variant="h4">{t("profile.change_password")}</Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <DialogBody className="flex flex-col gap-5 mobile-md:gap-8">
              <div>
              <Input
                placeholder={t("auth.old_password")}
                type="password"
                name="old_password"
              >
                <FaLock />
              </Input>
              <p className="text-red-500 text-left pt-3">{isError}</p>
              </div>
              <div>
              <Input
                placeholder={t("auth.new_password")}
                type="password"
                name="new_password"
              >
                <FaLock />
              </Input>
              </div>
              <div>
              <Input
                placeholder={t("auth.confirm_password")}
                type="password"
                name="confirm_password"
              >
                <FaLock />
              </Input>
              </div>
              <div className="mx-auto mobile-lg:hidden">
                <div className="text-left flex flex-col gap-2 text-gray-800">
                  <Typography variant="h4" className="text-md text-center ">
                    {t("profile.password_required")}
                  </Typography>
                  <Typography variant="small" className="text-sm flex gap-4 items-center">
                    <IoMdCheckmark className="text-primary"/> {t("profile.uppercase")}
                  </Typography>
                  <Typography variant="small" className="text-sm flex gap-4 items-center">
                    <IoMdCheckmark className="text-primary" /> {t("profile.lowercase")}
                  </Typography>
                  <Typography variant="small" className="text-sm flex gap-4 items-center">
                    <IoMdCheckmark className="text-primary"/> {t("profile.least_number")}
                  </Typography>
                  <Typography variant="small" className="text-sm flex gap-4 items-center">
                    <IoMdCheckmark className="text-primary" /> {t("profile.special_character")}
                  </Typography>
                </div>
              </div>
            </DialogBody>
            <DialogFooter className="flex gap-5 justify-center">
              <Button
                variant="outlined"
                className="text-primary border rounded-full border-orange-500"
                onClick={() => {
                  setOpen((pre) => !pre);
                  reset();
                  setIsError("");
                }}
              >
                {t("profile.cancel")}
              </Button>
              <Button
                variant="filled"
                className="bg-primary rounded-full"
                type="submit"
              >
                {isLoading ? (<Spinner></Spinner>) : t("profile.confirm")}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </div>
    </DialogMultimedia>
  );
}

DialogChangePassword.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default DialogChangePassword;
