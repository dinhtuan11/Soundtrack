import Login from "./Login";
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ADMIN_URL, API_URL, ROLE } from "src/config/constants";
import { postRequest } from "src/utils/CommonRequest";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminInfo } from "src/redux/slices/auth";
import { useNavigate } from "react-router-dom";
const LoginAdminContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const {adminToken, adminInfo} = useSelector((state) => state.auth)
  const navigate = useNavigate()
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
    });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const res = await postRequest(API_URL.ADMIN_LOGIN_API, {
        email: data.email,
        password: data.password,
      }, true);
      const role = +res.data?.type
      if (role === ROLE.ADMIN) {
        dispatch(setAdminInfo(res.data))
      }
      reset()
    } catch (error) {
      setError(error.response.data.msg)
    }finally {
      setIsLoading(false)
    }
  };
  useEffect(()=> {
    if (adminToken && adminInfo?.name) {
      navigate(ADMIN_URL.ADMIN_HOME)
    }
  },[adminToken, navigate, adminInfo, dispatch])
      return (
        <>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="form mt-8 mb-2 mx-auto w-[90%]"
              >
                <Login isLoading={isLoading} error={error}/>
              </form>
            </FormProvider>
        </>
      );
};

export default LoginAdminContainer;