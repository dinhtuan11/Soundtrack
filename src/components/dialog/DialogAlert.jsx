import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {t} from 'i18next' 
import { postRequest } from "src/utils/CommonRequest";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_URL } from "src/config/constants";
import Input from "../input/Input";
import { useDispatch } from "react-redux";
import { setUserInfo } from "src/redux/slices/auth";
import { useState } from "react";
import { BiShieldQuarter } from "react-icons/bi";
import {IoWarningOutline} from "react-icons/io5"

export const DialogAlert = ({userId, isOpen, close}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const schema = yup
    .object({
      vetifyCode: yup.string().required(t("validate.input_required", {field: "Code"})).min(6,t("validate.input_min", {field: "vetify code", min:6})).max(6,t("validate.input_max", {field: "vetify code", max:6})).matches(/^\d{6}$/, t("validate.input_numeric", {field: "code number"}))
    });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;
  const onSubmit = async (code) => {
    setIsLoading(true)
    try {
      const res = await postRequest( API_URL.CONFIRM_ACCOUNT, {
        code: code.vetifyCode,
        user_id: userId
      })
      if (res) {
        dispatch(setUserInfo(res.data))
        close((pre)=> !pre)
      }
    } catch (error) {
      setError(error.response.data.msg)
    }finally {
      setIsLoading(false)
    }
  };
  return (
    <>
      <Dialog open={isOpen} animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray" className="flex gap-2 items-center">
            <IoWarningOutline size={30} className="text-primary"/> {t("auth.notifycation_account")}
          </Typography>
        </DialogHeader>
          <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody divider className="grid place-items-center gap-4">
          <Typography variant="h6" className="text-center pb-3" color="gray">
            {t("auth.text_vetify_account")}
          </Typography>
          {error? <p className="text-red-600 text-sm mb-1">{error}</p>:""}
          <div className="w-2/4 pb-5">
            <Input type="text" placeholder="Vetify code (only number)" name="vetifyCode" ><BiShieldQuarter className="text-2xl mobile-md:text-lg"/></Input>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined"  onClick={() => close(false)}>
            close
          </Button>
          <Button variant="outlined" type="submit" className="bg-primary text-white">
            {isLoading? <Spinner className="m-auto"/>:"Submit"}
          </Button>
        </DialogFooter>
        </form>
        </FormProvider>
      </Dialog>
    </>
  );
}

DialogAlert.propTypes = {
  userId: PropTypes.number,
  close: PropTypes.func,
  isOpen: PropTypes.bool
}