import { t } from "i18next";
import { MATCH_TYPE_FILE, maxSizeImage } from "src/config/constants";
import * as yup from "yup";
export const createFileValidationSchema = (fieldName, maxSize, validExtensions, rule = "required") => {
  const isRequired = rule === "required";
  return yup.mixed()
      .test(rule, t("validate.input_required", { field: fieldName }), (file) => {
          if(isRequired) return !!file
          return true;
      })
      .test("fileSize", t("validate.upload_max", { field: fieldName, max: maxSize===maxSizeImage?"10MB":"15MB"} ), (value) => {
          if(!value && !isRequired || typeof value === 'string') return true;
          return value && value.size <= maxSize
      })
      .test("fileType", `Only upload ${MATCH_TYPE_FILE[validExtensions].join(', ')}`, (value) =>{
          if(!value && !isRequired || typeof value === 'string') return true;
          return getExtensionFile(value) == validExtensions
      }
      );
};

export const getExtensionFile =(file)=> {
    for (const type in MATCH_TYPE_FILE) {
        if (MATCH_TYPE_FILE[type].includes(file.type)) {
            return type
        }
    }
    return null
}

export const formatDateString =(inputDate)=> {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString();
  
    return `${day}-${month}-${year}`;
}

/**
 * 
 *
 * @param   {[object]}  value  value need check
 *
 * @return  {[boolean]} if object empty return true
 */
export const empty = (value) => {
    if (value === undefined || value === null) {
        return true;
      }
    
      if (typeof value === 'string') {
        return value.trim() === '';
      }
    
      if (Array.isArray(value)) {
        return value.length === 0;
      }
    
      if (typeof value === 'object') {
        for (const key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
    
      return false;
  }

/**
 * 
 *
 * @param   {[object]}  number  number need format xxx,xxx,xxx
 *
 * @return  {[string]} if number format it xxx,xxx,xxx 
 */
export const formatNumber = (number) =>{
  number = Number(number);
  if (isNaN(number)) {
    return 0;
  }
  return number.toLocaleString('en-US');
}