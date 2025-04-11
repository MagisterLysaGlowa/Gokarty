import { errorToast } from "../Utils/ToastNotifications";

export const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
export const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

export const validateImageFile = (file: File | undefined): boolean => {
    if(!file)
        return false;

    const fileTypeValid = allowedTypes.includes(file.type);
    if (!fileTypeValid) {
        errorToast("Wybrany plik nie jest obrazem");
        return false;
    } 

    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    const extensionValid = allowedExtensions.includes(extension);
    if (!extensionValid) {
        errorToast("Niedozwolony format. Wybierz jeden z tych: " + allowedExtensions.join(' ')) 
        return false;
    }
  
    if (file.size > 10 * 1024 * 1024) {
        errorToast("Przekroczono maksymalny rozmiar pliku (5MB)");
        return false;
    }

    return true;
};