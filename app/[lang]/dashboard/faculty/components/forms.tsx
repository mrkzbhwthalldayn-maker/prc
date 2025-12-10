"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { FacultyMember } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  createFacultyMemberAction,
  deleteFacultyMemberAction,
  updateFacultyMemberAction,
} from "../actions";
import {
  CustomDropzoneUploadImage,
  CustomDropzoneUploadPdf,
} from "@/components/custom-dropzone";

export const CreateFacultyMemberForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="إنشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إضافة مستخدم جديد</Button>}
      action={createFacultyMemberAction}
      title="إضافة مستخدم جديد"
      wide={true}
      className="w-full"
    >
      <div className="flex gap-4 phone-only:flex-col justify-between">
        <div className="w-full flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="fullName">الاسم الكامل</Label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="أدخل الاسم الكامل"
            />
          </div>
          <div>
            <Label htmlFor="enName">الاسم الأجنبي</Label>
            <Input
              type="text"
              name="enName"
              id="enName"
              placeholder="أدخل الاسم الأجنبي"
            />
          </div>

          <div>
            <Label htmlFor="email">التخصص</Label>
            <Input
              type="text"
              name="specialization"
              id="specialization"
              placeholder="أدخل التخصص"
            />
          </div>
          <div>
            <Label htmlFor="enSpecialization">التخصص بالانجليزي</Label>
            <Input
              type="text"
              name="enSpecialization"
              id="enSpecialization"
              placeholder="أدخل التخصص بالانجليزي"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="my-2">
            <CustomDropzoneUploadImage
              name="picture"
              title="صورة العضو"
              dropClassName="border-forground/50"
              responsive
            />
          </div>
          <div className="my-2">
            <CustomDropzoneUploadPdf
              name="cv"
              title="cv العضو"
              dropClassName="border-forground/50"
              responsive
            />
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const UpdateFacultyMemberForm = ({ user }: { user: FacultyMember }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="تحديث"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>تحديث مستخدم</button>}
      action={updateFacultyMemberAction}
      title="تحديث معلومات المستخدم"
    >
      <Input type="hidden" name="id" id="id" defaultValue={user.id} readOnly />
      <div className="flex gap-4 phone-only:flex-col justify-between">
        <div className="w-full flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="fullName">الاسم الكامل</Label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              defaultValue={user?.fullName ?? ""}
              placeholder="أدخل الاسم الكامل"
            />
          </div>
          <div>
            <Label htmlFor="enName">الاسم الأجنبي</Label>
            <Input
              type="text"
              name="enName"
              id="enName"
              defaultValue={user?.enName ?? ""}
              placeholder="أدخل الاسم الأجنبي"
            />
          </div>

          <div>
            <Label htmlFor="specialization">التخصص</Label>
            <Input
              type="text"
              name="specialization"
              id="specialization"
              defaultValue={user.specialization ?? ""}
              placeholder="أدخل التخصص"
            />
          </div>
          <div>
            <Label htmlFor="enSpecialization">التخصص بالانجليزي</Label>
            <Input
              type="text"
              name="enSpecialization"
              id="enSpecialization"
              defaultValue={user.enSpecialization ?? ""}
              placeholder="أدخل التخصص بالانجليزي"
            />
          </div>
        </div>
        <div></div>
        <div className="flex flex-col gap-2">
          <div className="my-2">
            <CustomDropzoneUploadImage
              defaultImage={user?.picture}
              name="picture"
              title="صورة العضو"
              dropClassName="border-forground/50"
              responsive
            />
          </div>
          <div className="my-2">
            <CustomDropzoneUploadPdf
              defaultPdf={user?.cv}
              name="cv"
              title="cv العضو"
              dropClassName="border-forground/50"
              responsive
            />
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const DeleteFacultyMemberForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>حذف مستخدم</button>}
      action={deleteFacultyMemberAction}
      title="حذف مستخدم"
      discardVariant={"default"}
      submitVariant={"outline"}
      description="من خلال هذا النموذج، يمكنك حذف المستخدم بسهولة. بمجرد الإرسال، سيتم حذف المستخدم بشكل نهائي."
    >
      <Input type="hidden" name="id" id="id" readOnly value={id} required />
    </AccessibleDialogForm>
  );
};
