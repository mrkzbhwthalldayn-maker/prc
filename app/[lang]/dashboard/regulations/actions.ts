import { z } from "zod";
import { createForm, deleteForm, updateForm } from "@/database/forms";

export async function createFormAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      name: z.string().optional().nullable(),
      enName: z.string().optional().nullable(),
      url: z.string().min(1, "URL is required"),
    });

    const data = schema.safeParse({
      name: formData.get("name") || "",
      enName: formData.get("enName") || "",
      url: formData.get("url") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { name, enName, url } = data.data;

    const res = await createForm({
      name,
      enName,
      url,
    });

    return { message: res.message };
  } catch (error) {
    console.error("Error in createFormAction:", error);
    return { message: "Failed to create form" };
  }
}

export async function updateFormAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "Form ID is required"),
      name: z.string().optional().nullable(),
      enName: z.string().optional().nullable(),
      url: z.string().min(1, "URL is required"),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      name: formData.get("name") || "",
      enName: formData.get("enName") || "",
      url: formData.get("url") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id, name, enName, url } = data.data;

    const res = await updateForm({
      id,
      name,
      enName,
      url,
    });

    return { message: res.message };
  } catch (error) {
    console.error("Error in updateFormAction:", error);
    return { message: "Failed to update form" };
  }
}

export async function deleteFormAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "Form ID is required"),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id } = data.data;

    const res = await deleteForm({ id });

    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteFormAction:", error);
    return { message: "Failed to delete form" };
  }
}
