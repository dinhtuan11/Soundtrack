import {useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import iconGg from "src/assets/images/icon_google.png";
import iconGitlab from "src/assets/images/icon_gitlab.png";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postRequest } from "src/utils/CommonRequest";
import { ACCOUNT_STATUS, API_URL} from "src/config/constants";
import { DialogAlert } from "src/components/dialog/DialogAlert";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { setUserInfo } from "src/redux/slices/auth";
import Login from "./Login";
import { IoMdArrowBack } from "react-icons/io";

const LoginContainer = () => {
  const [dialog, setDialog] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const schema = yup
    .object({
      email: yup
        .string()
        .email(t("validate.input_regex", {field: t("auth.email")}))
        .required(t("validate.input_required", {field: t("auth.email")})),
      password: yup
        .string()
        .required(t("validate.input_required", {field: t("auth.password")}))
        .min(6, t("validate.input_min_value", {field: t("auth.password"), min_value: 6}))
        .max(16, t("validate.input_max_value", {field: t("auth.password"), max_value: 16}))
        .matches(regexPassword, t("validate.regex_password", {field: t("auth.password")}))
    });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const res = await postRequest(API_URL.LOGIN_API, {
        email: data.email,
        password: data.password,
      });
      const vetify = res?.data.flag
      if (vetify === ACCOUNT_STATUS.NOT_VETIFY) {
        setUserId(res.data?.id)
        setDialog(true)
      }else{
        dispatch(setUserInfo(res.data))
      }
      reset()
    } catch (error) {
      setError(error.response.data.msg)
    }finally {
      setIsLoading(false)
    }
  };
  return (
    <>
      <DialogAlert
        userId={userId} isOpen={dialog} close={setDialog}/>
      <Card color="transparent" shadow={false}>
        <span className="flex justify-start md:hidden">
          <Link to="/" className=" pt-1 pb-5 logo-back__home items-center inline-flex cursor-pointer">
              <IoMdArrowBack size={30} className="text-primary title-logo inline" />
              <h2 className="text-lg ml-2 font-semibold text-black title font-poppins">
                {t("auth.back_home")}
              </h2>
          </Link>
        </span>
        <Typography variant="h3" color="blue-gray">
          {t("auth.login")}
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form mt-8 mb-2 mx-auto w-[90%]"
          >
            {error? <p className="text-red-600 text-sm mb-1">{error}</p>:""}
            <Login isLoading={isLoading}/>
          </form>
        </FormProvider>
        <div className="flex gap-2 justify-center items-center p-4">
          <div className="w-[80px] xl:w-32 h-[2px] bg-[rgba(230,233,250,1)]"></div>
          <p>{t("auth.or")}</p>
          <div className="w-[80px] xl:w-32 h-[2px] bg-[rgba(230,233,250,1)]"></div>
        </div>
        <div className="form-other__button mb-4 flex mx-auto lg:gap-5 gap-10">
          <Button
            variant="outlined"
            className="border-primary lg:w-28 justify-center md:p-3 rounded-full lg:py-1 lg:text-xs text-sm font-thin py-2 flex gap-1 items-center text-primary"
          >
            <img src={iconGg} width={20} height={20} alt="icon google" />
            <div className="lg:block hidden">Google</div>
          </Button>
          <Button
            variant="outlined"
            className="border-primary lg:w-28 justify-center md:p-3 rounded-full lg:px-4 lg:py-1 lg:text-xs px-7 font-thin text-sm py-2 flex gap-1 items-center text-primary"
          >
            <img src={iconGitlab} width={20} height={20} alt="icon gitlab" />
            <p className="hidden lg:block">Gitlab</p>
          </Button>
        </div>
        <Typography
          color="gray"
          className="mt-4 text-center lg:text-sm font-normal mb-4"
        >
          {t("auth.have_not_account_yet")}
        </Typography>
        <Link to="/register" className="right-form__register text-gray-900">
          <Button
            className="md:px-8 mt-5 lg:mt-2 lg:py-3 md:text-xs lg:px-10 border-primary px-16 py-3 font-thin text-sm rounded-full text-primary "
            variant="outlined"
          >
            {t("auth.register_now")}
          </Button>
        </Link>
      </Card>
    </>
  );
};

export default LoginContainer;
