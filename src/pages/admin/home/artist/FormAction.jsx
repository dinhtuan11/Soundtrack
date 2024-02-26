import PropTypes from "prop-types";
import Input from "src/components/input/Input";
import RadioButon from "src/components/checkbox/RadioButon";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import UploadImage from "src/components/uploadImage/UploadImage";
import { useEffect } from "react";

function FormAction({ setOpen, isLoading, dataArtist, reset }) {
  const {resetForm, resetError} = reset;
  useEffect(()=>{
    if(dataArtist?.name){
      resetForm({
        'name' : dataArtist?.name
      })
    }
  }, [dataArtist])
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="mt-2">
          <Input name="name" placeholder="Artist name" valueUpdate={dataArtist?.name} type="text"/>
        </div>
        <div className="w-6/12 mx-auto">
          <UploadImage name="avatar" label="Avatar" defaultValue={dataArtist?.avatar}/>
        </div>
        <Typography className="" color="gray">Gender: </Typography>
        <div className="flex gap-5">
          <RadioButon name="gender" label="Male" value={1} valueView={dataArtist?.gender}/>
          <RadioButon name="gender" label="Female" value={2} valueView={dataArtist?.gender}/>
        </div>
      </div>
      <div className="flex gap-2 my-3 mt-8 justify-end">
        <Button
          onClick={() => {
            setOpen((pre) => !pre)
            resetForm({
              name:''
            })
            resetError('')
          }
          }
          className="border !text-gray-900"
          size="md"
          variant="outlined"
        >
          Close
        </Button>
        <Button size="md" type="submit">
          {isLoading?<Spinner/>:dataArtist?"Update":"Submit"}
        </Button>
      </div>
    </>
  );
}

FormAction.propTypes = {
  setOpen: PropTypes.func,
  isLoading: PropTypes.bool,
  dataArtist: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  reset: PropTypes.shape({
    resetForm: PropTypes.func,
    resetError: PropTypes.func
  }),
};

export default FormAction;
