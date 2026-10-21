"use server";

import { createProduct, updateProduct } from "./service";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// productForm sayfasını client yapmadan formu gönderme işlemini server tarafında yapabilmek için bu fonksiyonu oluşturduk. Bu fonksiyon formu submit ettiğimizde çalışacak ve form verilerini alıp işleme koyacak.
export const handleProductForm = async (formData: FormData) => {
  // formdaki verilere eriş
  const id = formData.get("id") as string | null; // düzenleme modunda id inputu olacak, yoksa null dönecek
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const rating = Number(formData.get("rating"));
  const reviews_count = Number(formData.get("reviews_count"));
  const category = formData.get("category") as string;
  const image_url = formData.get("image_url") as string;
  const description = formData.get("description") as string;

  // ürün bilgilerini nesne formatına getir
  const productData = {
    name,
    brand,
    price,
    stock,
    rating,
    reviews_count,
    category,
    image_url,
    description,
  };

  // ürünü oluşturmak için api isteği at
  try {
    if (id) {
      await updateProduct(id, productData);
    } else {
      await createProduct(productData);
    }
    redirect("/products"); // ürün oluşturulduktan sonra products sayfasına yönlendir.
  } catch (error) {
    //fırlatılan hata redirect metodundan kaynaklı mı kontrol et
    if (isRedirectError(error)) {
      throw error; // redirect hatasını tekrar fırlat
    }
    throw new Error("ürünü kaydetme başarısız oldu");
  }
};
