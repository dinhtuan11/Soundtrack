import { useTranslation} from "react-i18next";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Typography,
    Spinner,
  } from "@material-tailwind/react";
  import PropTypes from "prop-types"
  import {MdOutlineEmail} from "react-icons/md"
import { AiOutlineLock } from "react-icons/ai";
import Input from "src/components/input/Input";

const Login = ({isLoading, error}) => {
    const {t} = useTranslation()
    return (
        <div>
            <img
        src="/hinh-nen-4k-windows-10_100821069.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
       <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
       <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="orange"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white" >
            {t("auth.login")}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {error? <p className="text-red-600 text-sm mb-1 text-center">{error}</p>:""}
            <Input type="email" name="email" label={t("auth.email")} size="lg"><MdOutlineEmail size={20}/></Input>
            <Input type="password" name="password" placeholder="Password" label={t("auth.password")} size="lg"><AiOutlineLock size={20}/></Input>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth color="orange">
            {isLoading? <Spinner className="m-auto"/>:t("auth.login")}
            </Button>
          </CardFooter>
        </Card>
      </div>
        </div>
    );
};

export default Login;

Login.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string
}