"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  createFormAction,
  deleteFormAction,
  updateFormAction,
} from "../actions";
import AccessibleDialogForm from "@/components/accible-dialog-form";
import { CustomDropzoneUploadPdf } from "@/components/custom-dropzone";
import { Form } from "@prisma/client";

export const CreateNewForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إنشاء نموذج</Button>}
      success="تم إنشاء النموذج بنجاح"
      replaceLink="/dashboard/forms"
      className="w-full"
      action={createFormAction}
      submit="إنشاء"
    >
      <div className="flex gap-4 phone-only:flex-col justify-between">
        <div className="w-full flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">الاسم</Label>
            <Input type="text" name="name" id="name" placeholder="أدخل الاسم" />
          </div>
          <div>
            <Label htmlFor="enName">الاسم بالإنجليزية</Label>
            <Input
              type="text"
              name="enName"
              id="enName"
              placeholder="أدخل الاسم بالإنجليزية"
            />
          </div>
          <div className="my-2">
            <CustomDropzoneUploadPdf
              name="url"
              title="الملف"
              dropClassName="border-forground/50"
              responsive
            />
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const UpdateForm = ({ form }: { form: Form }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>تحديث النموذج</button>}
      success="تم تحديث النموذج بنجاح"
      replaceLink="/dashboard/forms"
      className="w-full"
      action={updateFormAction}
      submit="تحديث"
    >
      <Input type="hidden" value={form.id} name="id" readOnly required />
      <div className="flex gap-4 phone-only:flex-col justify-between">
        <div className="w-full flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">الاسم</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="أدخل الاسم"
              defaultValue={form?.name ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="enName">الاسم بالإنجليزية</Label>
            <Input
              type="text"
              name="enName"
              id="enName"
              placeholder="أدخل الاسم بالإنجليزية"
              defaultValue={form?.enName ?? ""}
            />
          </div>
          <div className="my-2">
            <CustomDropzoneUploadPdf
              name="url"
              title="الملف"
              dropClassName="border-forground/50"
              responsive
              defaultPdf={form.url}
            />
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const DeleteForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>حذف النموذج</button>}
      action={deleteFormAction}
      title="حذف النموذج"
      discardVariant="default"
      submitVariant="outline"
      description="سيتم حذف النموذج بشكل نهائي."
    >
      <Input type="hidden" name="id" id="id" readOnly value={id} required />
    </AccessibleDialogForm>
  );
};
