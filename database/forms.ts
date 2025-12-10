"use server";

import prisma from "@/prisma/db";
import { revalidateTag, unstable_cache } from "next/cache";

const createForm = async ({
  name,
  enName,
  url,
}: {
  name?: string | null;
  enName?: string | null;
  url: string;
}) => {
  try {
    const form = await prisma.form.create({
      data: {
        name,
        enName,
        url,
      },
    });
    if (!form) {
      return { message: "Failed to create form" };
    }
    revalidateTag("forms");
    return { message: "Form created successfully" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "Failed to create form" };
  }
};

const deleteForm = async ({ id }: { id: string }) => {
  try {
    const form = await prisma.form.delete({
      where: { id },
    });
    if (!form) {
      return { message: "Failed to delete form" };
    }
    revalidateTag("forms");
    return { message: "Form deleted successfully" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "Failed to delete form" };
  }
};

const updateForm = async ({
  id,
  name,
  enName,
  url,
}: {
  id: string;
  name?: string | null;
  enName?: string | null;
  url: string;
}) => {
  try {
    const updatedForm = await prisma.form.update({
      where: { id },
      data: {
        name,
        enName,
        url,
      },
    });

    if (!updatedForm) {
      return { message: "Failed to update form" };
    }

    revalidateTag("forms");
    return { message: "Form updated successfully" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "Failed to update form" };
  }
};

const getForms = unstable_cache(
  async ({ take, page }: { take?: number; page?: number }) => {
    let skip = 0;
    if (take && page) {
      skip = (page - 1) * take;
    }

    try {
      const forms = await prisma.form.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take,
        skip,
      });
      if (!forms || forms.length === 0) {
        return [];
      }
      return forms;
    } catch (error) {
      console.dir(error, { depth: null });
      return [];
    }
  },
  ["forms"],
  { tags: ["forms"] }
);

const getFormById = async (id: string) => {
  try {
    const form = await prisma.form.findUnique({
      where: { id },
    });
    if (!form) {
      return undefined;
    }
    return form;
  } catch (error) {
    return undefined;
  }
};

export { createForm, getForms, deleteForm, getFormById, updateForm };
