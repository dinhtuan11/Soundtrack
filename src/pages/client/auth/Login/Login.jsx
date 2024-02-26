import { Button, Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Input from "src/components/input/Input";
import {MdOutlineEmail} from "react-icons/md"
import { AiOutlineLock } from "react-icons/ai";
import {PropTypes} from "prop-types"
import { t } from "i18next";
import useTitle from "src/hooks/useTitle";
const Login = ({isLoading}) => {
  useTitle(t("auth.login"));

  return (
    <>
      <div className="mb-2 sm:ml-0 flex flex-col gap-6">
        <Input placeholder={t("auth.email")} type="email" name="email">{<MdOutlineEmail size={20}/>}</Input>
        <Input placeholder={t("auth.password")} type="password" name="password">{<AiOutlineLock size={20}/>}</Input>
      </div>
      <div className="text-right mt-5">
        <Link to="/forgot-password" className="text-primary md:text-xs text-sm">
          {t("auth.forgot_password")}
        </Link>
      </div>
      <Button type="submit" disabled={isLoading} className="mt-6 bg-primary rounded-full text-center" fullWidth>
        {isLoading? <Spinner className="m-auto"/>: t("auth.login")}
      </Button>
    </>
  );
};

export default Login;

Login.propTypes = {
  isLoading: PropTypes.bool
}