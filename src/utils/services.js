export const createLinkDownload = (res, file) => {
  const { file_name, format } = file;
  const url = window.URL.createObjectURL(new Blob([res]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${file_name}.${format.toLowerCase()}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};