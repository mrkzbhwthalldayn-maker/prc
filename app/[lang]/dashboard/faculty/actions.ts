import { z } from "zod";
import {
  createFacultyMember,
  deleteFacultyMember,
  updateFacultyMember,
} from "@/database/faculty";

export async function createFacultyMemberAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      fullName: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      picture: z.string().optional().nullable(),
      cv: z.string().optional().nullable(),
      enName: z.string().optional().nullable(),
      enSpecialization: z.string().optional().nullable(),
    });

    const data = schema.safeParse({
      fullName: formData.get("fullName") || "",
      specialization: formData.get("specialization") || "",
      picture: formData.get("picture") || "",
      cv: formData.get("cv") || "",
      enSpecialization: formData.get("enSpecialization") || "",
      enName: formData.get("enName") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { fullName, specialization, picture, cv, enName, enSpecialization } =
      data.data;

    const res = await createFacultyMember({
      fullName,
      picture,
      cv: cv ?? null,
      specialization: specialization ?? null,
      enSpecialization: enSpecialization ?? null,
      enName,
    });

    console.log("User created successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in createUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

// Action to update a user
export async function updateFacultyMemberAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المستخدم مطلوب"), // "User ID is required"
      fullName: z.string().optional().nullable(),
      enName: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      enSpecialization: z.string().optional().nullable(),
      picture: z.string().optional().nullable(),
      cv: z.string().optional().nullable(),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      fullName: formData.get("fullName") || "",
      specialization: formData.get("specialization") || "",
      enSpecialization: formData.get("enSpecialization") || "",
      enName: formData.get("enName") || "",
      picture: formData.get("picture") || "",
      cv: formData.get("cv") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const {
      id,
      fullName,
      specialization,
      picture,
      cv,
      enName,
      enSpecialization,
    } = data.data;

    const res = await updateFacultyMember({
      id,
      fullName,
      enName,
      picture,
      cv: cv ?? null,
      specialization: specialization ?? null,
      enSpecialization: enSpecialization ?? null,
    });

    console.log("User updated successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in updateUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}

// Action to delete a user
export async function deleteFacultyMemberAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المستخدم مطلوب"), // "User ID is required"
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

    const res = await deleteFacultyMember({ id });

    console.log("User deleted successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}
