import {useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import iconGg from "src/assets/images/icon_google.png";
import iconGitlab from "src/assets/images/icon_gitlab.png";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { postRequest } from "src/utils/CommonRequest";
import { APP_API } from "src/config/constants";
import { t } from "i18next";
import { DialogAlert } from "src/components/dialog/DialogAlert";
import Register from "./Register";
import { IoMdArrowBack } from "react-icons/io";
const RegisterContainer = () => {
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null);
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const schema = yup.object({
    name: yup.string().required(t("validate.input_required", {field: t("auth.user_name")})).min(5, t("validate.input_min_value", {field: t("auth.user_name"), min_value: 5}))
    .max(20, t("validate.input_max_value", {field: t("auth.user_name"), max_value: 20})),
    email: yup.string().email(t("validate.input_regex", {field: t("auth.email")})).required(t("validate.input_required", {field: t("auth.email")})),
    password: yup
        .string()
        .required(t("validate.input_required", {field: t("auth.password")}))
        .min(6, t("validate.input_min_value", {field: t("auth.password"), min_value: 6}))
        .max(16, t("validate.input_max_value", {field: t("auth.password"), max_value: 16}))
        .matches(regexPassword, t("validate.regex_password", {field: t("auth.password")})),
    confirm_password: yup.string().oneOf([yup.ref("password"), null], t("validate.input_same", {field: t("auth.confirm_password"), same: t("auth.password")})).required(t("validate.input_required", {field: t("auth.confirm_password")})),
    gender: yup.string().required(t("auth.gender_error")).oneOf(["1", "2", "3"])
  }).required()
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const {handleSubmit, register, reset} = methods;
  const handleRegister = async(values)=>{
    try {
      setLoading(true);
      const res = await postRequest(APP_API.API_REGISTER, {
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender
      })
      if(res){
        const userId = res.data.id;
        setUserId(userId)
        setDialog(true)
      }
      reset()
    } catch (error) {
      setError(error.response.data.msg)
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <DialogAlert
        isOpen={dialog}
        close={setDialog}
        userId={userId}
      ></DialogAlert>
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
          {t("auth.register")}
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="form mt-8 mb-2 mx-auto w-[90%]"
          >
            {error ? <p className="text-red-600 text-sm mb-1">{error}</p> : ""}
            <Register isLoading={loading} register={register} />
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
            <img src={iconGg} width={20} height={20} alt="Google icon" />
            <div className="lg:block hidden">Google</div>
          </Button>
          <Button
            variant="outlined"
            className="border-primary lg:w-28 justify-center md:p-3 rounded-full lg:py-1 lg:text-xs font-thin text-sm py-2 flex gap-1 items-center text-primary"
          >
            <img src={iconGitlab} width={20} height={20} alt="Gitlab icon" />
            <p className="hidden lg:block">Gitlab</p>
          </Button>
        </div>
        <Typography
          color="gray"
          className="mt-4 text-center lg:text-sm font-normal mb-4 already-account"
        >
          {t("auth.do_you_already_have_an_account")}{" "}
          <Link
            to="/login"
            className="text-primary hover:text-black transition-colors"
          >
            {t("auth.login_now")}
          </Link>
        </Typography>
      </Card>
    </>
  );
};

export default RegisterContainer;
