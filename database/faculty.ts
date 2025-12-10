"use server";

import prisma from "@/prisma/db";
import { FacultyMember } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const createFacultyMember = async ({
  fullName,
  picture,
  cv,
  specialization,
  enName,
  enSpecialization,
}: {
  picture?: string | null;
  specialization?: string | null;
  cv?: string | null;
  fullName?: string | null;
  enName?: string | null;
  enSpecialization?: string | null;
}) => {
  try {
    const facultyMember = await prisma.facultyMember.create({
      data: {
        fullName,
        picture,
        cv,
        specialization,
        enName,
        enSpecialization,
      },
    });
    if (!facultyMember) {
      return { message: "فشل انشاء المستخدم" };
    }
    revalidateTag("FacultyMembers");
    return { message: "تم انشاء المستخدم بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل انشاء الحساب" };
  }
};

const updateFacultyMember = async ({
  id,
  fullName,
  picture,
  cv,
  specialization,
  enName,
  enSpecialization,
}: {
  picture?: string | null;
  specialization?: string | null;
  cv?: string | null;
  fullName?: string | null;
  id: string;
  enName?: string | null;
  enSpecialization?: string | null;
}) => {
  try {
    let facultyMember = await prisma.facultyMember.update({
      where: { id },
      data: {
        fullName,
        picture,
        cv,
        specialization,
        enName,
        enSpecialization,
      },
    });

    if (!facultyMember) {
      return { message: "فشل تحديث المستخدم" }; // "Failed to update FacultyMember"
    }
    revalidateTag("FacultyMembers");
    return { message: "تم تحديث المستخدم بنجاح" }; // "FacultyMember updated successfully"
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل تحديث الحساب" }; // "Failed to update account"
  }
};

const deleteFacultyMember = async ({ id }: { id: string }) => {
  try {
    const facultyMember = await prisma.facultyMember.delete({
      where: { id },
    });
    if (!facultyMember) {
      return { message: "فشل حذف المستخدم" }; // "Failed to delete FacultyMember"
    }
    revalidateTag("FacultyMembers");
    return { message: "تم حذف المستخدم بنجاح" }; // "FacultyMember deleted successfully"
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل حذف الحساب" }; // "Failed to delete account"
  }
};

const getFacultyMembers = unstable_cache(
  async ({ fullName }: { fullName?: string }) => {
    try {
      const facultyMembers = await prisma.facultyMember.findMany({
        where: {
          fullName: {
            contains: fullName,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!facultyMembers) {
        return [];
      }
      return facultyMembers;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["FacultyMembers"],
  { tags: ["FacultyMembers"] }
);

export {
  createFacultyMember,
  updateFacultyMember,
  deleteFacultyMember,
  getFacultyMembers,
};
