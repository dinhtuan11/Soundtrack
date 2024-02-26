import { Button, Spinner } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import RadioButon from "src/components/checkbox/RadioButon";
import Input from "src/components/input/Input";
import PropTypes from "prop-types";
import useTitle from "src/hooks/useTitle";

const Register = ({isLoading}) => {
  const {t} = useTranslation()
  useTitle(t("auth.register"));

  return (
    <>
      <div className="mb-2 sm:ml-0 flex flex-col gap-6">
        <Input placeholder={t("auth.user_name")} name="name">{<AiOutlineUser size={20}/>}</Input>
        <Input placeholder={t("auth.email")} name="email">{<MdOutlineEmail size={20}/>}</Input>
        <div className="mb-2">
        <Input placeholder={t("auth.password")} type="password" name="password">{<AiOutlineLock size={20}/>}</Input>
        </div>
        <Input placeholder={t("auth.confirm_password")} type="password" name="confirm_password">{<AiOutlineLock size={20}/>}</Input>
        <div className="checkbox-control xl:flex grid grid-cols-2 gap-3">
          <RadioButon value={1} label={t("auth.male")} name="gender"></RadioButon>
          <RadioButon value={2} label={t("auth.female")} name="gender"></RadioButon>
          <RadioButon value={3} label={t("auth.other")} name="gender"></RadioButon>
        </div>
      </div>
      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-primary md:text-xs text-sm "
        >
          {t("auth.forgot_password")}
        </Link>
      </div> 
      <Button  type="submit" disabled={isLoading} className="mt-6 bg-primary rounded-full flex justify-center" fullWidth>
      {isLoading ? <Spinner/> : t("auth.register")}
      </Button>
    </>
  );
};
Register.propTypes = {
  isLoading: PropTypes.bool
}
export default Register;
