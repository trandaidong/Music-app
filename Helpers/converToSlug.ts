import unidecode from "unidecode"

export const convertToSlug = (text: string): string => {
    // trim  bỏ dấu cách đầu và cuối 
    // replace thay thế dấu cách thành '-' nếu nhièu dấu cách thì cộng dồn lên
    return unidecode(text.trim()).replace(/\s+/g,"-");
}